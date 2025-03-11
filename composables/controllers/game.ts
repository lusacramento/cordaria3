import { useMySettingsStore } from "../../stores/settings";
import { Card } from "../model/card";
import type { Lesson } from "~/types/Lesson";

// Views variables
const isShowCounter = ref(false);
const counter = ref(3);

//  Model variable
const deck: Ref<Card[]> = ref([]);
const cards = {
  prev: ref(Card.getEmptyCard()),
  current: ref(Card.getEmptyCard()),
  next: ref(Card.getEmptyCard()),
};

const instrumentMap = ref([]) as Ref<any>;

const lesson = ref() as Ref<Lesson> | Ref<null>;

const isCompleted = ref(false);

const isRunning = ref(false);

export const useGameController = () => {
  let deckIndex = 0;
  const progressStore = useMyProgressStore();
  const settingsStore = useMySettingsStore();
  const { instrument } = storeToRefs(useMySettingsStore());
  counter.value = useMySettingsStore().counter;

  /**
   * Initializes the game by setting up the instrument, lesson, counter, and instrument mapping.
   * If a lesson is available, it initializes the deck with the current lesson.
   *
   * @async
   * @function init
   * @returns {Promise<void>} A promise that resolves when the initialization is complete.
   */
  async function init() {
    instrument.value = await instrument.value;
    lesson.value = await progressStore.getCurrentLesson;
    counter.value = await settingsStore.getCounter;
    instrumentMap.value = await useAudio().getInstrumentMapping(
      instrument.value
    );
    if (lesson.value !== null) initDeck(lesson.value);
  }

  /**
   * Initializes the deck for the given lesson.
   *
   * @param {Lesson} lesson - The lesson object containing the necessary information to initialize the deck.
   *
   * The function performs the following steps:
   * 1. Determines the number of strings based on the `instrumentMap` value.
   * 2. Creates a new `Deck` instance using the lesson's first finger, string number, and the determined number of strings.
   * 3. Sets the current and next cards in the `cards` object based on the initialized deck.
   */
  function initDeck(lesson: Lesson) {
    let stringsNumber = 0;
    if (Array.isArray(instrumentMap.value))
      stringsNumber = instrumentMap.value.length;

    deck.value = new Deck(
      lesson.firstFinger.toString(),
      lesson.stringNumber,
      stringsNumber
    ).deck;

    cards.current.value = deck.value[deckIndex];
    cards.next.value = deck.value[deckIndex + 1];
  }

  /**
   * Asynchronously processes the payload for the game.
   *
   * @param {number} [repeatedLesson] - Optional parameter to specify a repeated lesson.
   * @returns {Promise<void>} A promise that resolves when the payload processing is complete.
   */
  async function payload(repeatedLesson?: number) {
    const tempo = getTempo(lesson.value?.bpm as number);

    useAudio().getAudios(
      counter.value,
      instrument.value,
      instrumentMap.value,
      deck.value,
      lesson.value?.bpm as number,
      tempo
    );
  }

  /**
   * Calculates the tempo in milliseconds based on the given beats per minute (BPM).
   *
   * @param bpm - The beats per minute to convert to milliseconds.
   * @returns The tempo in milliseconds.
   */
  function getTempo(bpm: number) {
    return useMath().convertBpmToMs(bpm);
  }

  /**
   * Starts a lesson with a given tempo.
   *
   * @param {number} tempo - The interval time in milliseconds for the practice timer.
   *
   * This function initializes the lesson by setting up the initial fragment and card states,
   * and starts a timer to handle the practice flow. The practice flow includes a counter phase
   * and a play phase, and transitions between fragments and cards as needed.
   *
   * Internal functions:
   * - `startPractice()`: Handles the practice flow based on the current state.
   * - `updateTodo()`: Updates the current task to either 'counter' or 'play'.
   * - `hideCounter()`: Toggles the visibility of the counter.
   * - `isFinishCount()`: Checks if the counter has finished.
   * - `play()`: Handles the play phase, including transitioning between fragments and cards.
   * - `isFinished()`: Checks if the entire lesson is finished.
   * - `isLastCard()`: Checks if the current card is the last one in the deck.
   * - `toAnimate()`: Animates the transition between fragments.
   * - `getNextFragment()`: Moves to the next fragment.
   * - `isLastFragment()`: Checks if the current fragment is the last one in the card.
   * - `getNextCard()`: Moves to the next card in the deck.
   * - `resetIndex()`: Resets the fragment index to zero.
   * - `finishPractice()`: Cleans up and finishes the practice session.
   * - `clearSequence()`: Clears the audio sequence events.
   */
  async function startLesson(tempo: number) {
    isRunning.value = true;
    const fragment = {
      prev: ref(),
      current: ref(),
      next: ref(),
    };

    let fragmentIndex = 0;

    fragment.current.value = cards.current.value.fragments[fragmentIndex];
    fragment.next.value = cards.current.value.fragments[fragmentIndex + 1];

    isShowCounter.value = true;
    let toDo = "counter";

    /**
     * Starts the practice session based on the current task (`toDo`).
     *
     * The function handles two cases:
     * - 'counter': Updates the `toDo` variable and, if it changes to 'play', hides the counter, sets the status of the current card to 'current', and starts playing.
     * - 'play': Directly starts playing.
     *
     * The function relies on the following external functions and variables:
     * - `toDo`: A variable that determines the current task.
     * - `updateTodo()`: A function that updates the `toDo` variable.
     * - `hideCounter()`: A function that hides the counter.
     * - `cards.current.value.setStatus()`: A method that sets the status of the current card.
     * - `play()`: A function that starts the play action.
     */
    function startPractice() {
      switch (toDo) {
        case "counter":
          toDo = updateTodo();
          if (toDo === "play") {
            hideCounter();
            cards.current.value.setStatus("current");

            play();
          }
          break;
        case "play":
          play();
          break;
      }
    }

    const timer = setInterval(startPractice, tempo);

    /**
     * Updates the todo counter by decrementing its value.
     * If the counter reaches the finish count, it returns 'play',
     * otherwise, it returns 'counter'.
     *
     * @returns {string} - Returns 'play' if the counter has finished, otherwise 'counter'.
     */
    function updateTodo() {
      counter.value--;
      return isFinishCount() ? "play" : "counter";
    }

    /**
     * Toggles the visibility of the counter.
     *
     * This function inverts the current value of `isShowCounter.value`,
     * effectively showing the counter if it is currently hidden, and hiding
     * it if it is currently shown.
     */
    function hideCounter() {
      isShowCounter.value = !isShowCounter.value;
    }

    /**
     * Checks if the counter has reached zero.
     *
     * @returns {boolean} - Returns `true` if the counter value is zero, otherwise `false`.
     */
    function isFinishCount() {
      return counter.value === 0;
    }

    /**
     * Controls the flow of the game by determining whether the game is finished or not.
     * If the game is finished, it will stop highlighting the previous fragment and finish the practice.
     * If the game is not finished, it will either get the next card and animate if it's the last fragment,
     * or simply animate and get the next fragment.
     *
     * @function
     */
    function play() {
      if (isFinished()) {
        fragment.prev.value.setIsHighlight(false);

        finishPractice();
      } else {
        if (isLastFragment()) {
          getNextCard();
          toAnimate();
        } else toAnimate();

        getNextFragment();
      }
    }

    /**
     * Checks if the game is finished.
     *
     * This function determines if the game is finished by checking if the current card
     * is the last card and if the current fragment is the last fragment.
     *
     * @returns {boolean} - Returns `true` if the game is finished, otherwise `false`.
     */
    function isFinished() {
      return isLastCard() && isLastFragment();
    }

    /**
     * Checks if the current card is the last card in the deck.
     *
     * @returns {boolean} - Returns `true` if the current card is the last card in the deck, otherwise `false`.
     */
    function isLastCard() {
      return deck.value.length === deckIndex + 1;
    }

    /**
     * Toggles the highlight state of the current and previous fragments.
     *
     * If the previous fragment exists, it will remove its highlight.
     * The current fragment will be highlighted.
     */
    function toAnimate() {
      if (fragment.prev.value != undefined) {
        fragment.prev.value.setIsHighlight(false);
      }
      fragment.current.value.setIsHighlight(true);
    }

    /**
     * Advances to the next fragment in the sequence.
     *
     * This function updates the `prev` fragment to the current fragment,
     * increments the `fragmentIndex`, and sets the `current` fragment to
     * the next fragment in the `cards` array.
     *
     * @throws {Error} If `fragmentIndex` exceeds the bounds of the `fragments` array.
     */
    function getNextFragment() {
      fragment.prev.value = fragment.current.value;
      fragmentIndex++;
      fragment.current.value = cards.current.value.fragments[fragmentIndex];
    }

    /**
     * Checks if the current fragment is the last fragment in the list of fragments.
     *
     * @returns {boolean} - Returns `true` if the current fragment is the last one, otherwise `false`.
     */
    function isLastFragment() {
      return cards.current.value.fragments.length === fragmentIndex;
    }

    /**
     * Advances the game to the next card in the deck.
     *
     * This function updates the `prev`, `current`, and `next` card references,
     * increments the deck index, and resets the fragment index. It also updates
     * the status of the `prev` and `current` cards.
     *
     * - `cards.prev.value` is set to the current card and its status is updated to 'prev'.
     * - `cards.current.value` is set to the next card and its status is updated to 'current'.
     * - `deckIndex` is incremented.
     * - If there are more cards in the deck, `cards.next.value` is set to the next card in the deck.
     * - If there are no more cards in the deck, `cards.next.value` is set to an empty card.
     * - `fragmentIndex` is reset.
     * - `fragment.current.value` is set to the current card's fragment at the new fragment index.
     */
    function getNextCard() {
      cards.prev.value = cards.current.value;
      cards.prev.value.setStatus("prev");

      cards.current.value = cards.next.value;
      cards.current.value.setStatus("current");

      deckIndex++;

      if (deck.value.length > deckIndex + 1)
        cards.next.value = deck.value[deckIndex + 1];
      else cards.next.value = Card.getEmptyCard();

      fragmentIndex = resetIndex();

      fragment.current.value = cards.current.value.fragments[fragmentIndex];
    }

    /**
     * Resets the index to its initial value.
     *
     * @returns {number} The initial index value, which is 0.
     */
    function resetIndex() {
      return 0;
    }

    /**
     * Ends the practice session by performing the following actions:
     * - Clears the interval timer.
     * - Sets the status of the current card to 'prev' and moves it to the previous card slot.
     * - Resets the current card to an empty card.
     * - Stops the audio transport.
     * - Clears the sequence.
     * - Sets the `isCompleted` state to true.
     * - Sets the `isRunning` state to false.
     *
     * @async
     * @function finishPractice
     * @returns {Promise<void>} A promise that resolves when the practice session is finished.
     */
    async function finishPractice() {
      clearInterval(timer);

      cards.current.value.setStatus("prev");
      cards.prev.value = cards.current.value;
      cards.current.value = Card.getEmptyCard();

      useAudio().Tone.getTransport().stop();
      clearSequence();

      isCompleted.value = await true;
      isRunning.value = await false;
    }

    /**
     * Clears the sequence of audio events by disposing of each event and removing it from the sequence.
     * This function will continue to dispose and remove events until the sequence is empty.
     */
    function clearSequence() {
      while (useAudio().sequence.events.length != 0) {
        useAudio().sequence.dispose();
        useAudio().sequence.events.pop();
      }
    }
  }

  return {
    deck,
    cards,
    isShowCounter,
    payload,
    init,
    counter,
    startLesson,
    isCompleted,
    isRunning,
  };
};
