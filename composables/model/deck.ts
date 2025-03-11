import { useData } from "./data";
import { Card } from "./card";

class Deck {
  deck: Card[] = [];

  /**
   * Constructs a new instance of the class.
   *
   * @param firstFinger - The first finger position as a string.
   * @param stringNumber - The string number as a string.
   * @param stringsNumber - The total number of strings as a number.
   *
   * @throws {Error} If the data is empty, null, or undefined.
   */
  constructor(
    firstFinger: string,
    stringNumber: string,
    stringsNumber: number
  ) {
    const data = useData();

    if (data.length <= 0 || data === null || data === undefined)
      new Error("There is not  data");

    this.getCards(data, firstFinger, stringNumber);
    this.suffleDeck();
    this.insertStringsOnCards(stringNumber, stringsNumber);
    this.markLastCard();
  }

  /**
   * Retrieves the current deck.
   *
   * @returns {Deck} The current deck.
   */
  getDeck() {
    return this.deck;
  }

  /**
   * Filters the provided data based on the first character of each item and creates Card instances
   * for each filtered item, then adds them to the deck.
   *
   * @param data - An array of strings to be filtered and processed.
   * @param firstFinger - The character to filter the data by.
   * @param stringNumber - The string number to be passed to the Card constructor.
   */
  getCards(data: string[], firstFinger: string, stringNumber: string) {
    const dataFiltered = data.filter((item) => item[0] === firstFinger);

    dataFiltered.forEach((element) => {
      const card = new Card(element, stringNumber);

      this.deck.push(card);
    });
  }

  /**
   * Inserts strings into the cards in the deck based on the specified pattern.
   *
   * @param str - The pattern to use for inserting strings. It can be 'downToUp', 'upToDown', or a specific string.
   * @param stringsNumber - The number of strings to be used when the pattern is 'downToUp' or 'upToDown'.
   *
   * The function iterates over the deck and assigns a string to each card based on the specified pattern:
   * - 'downToUp': Starts from the given stringsNumber and decrements until it reaches 1, then switches to 'upToDown'.
   * - 'upToDown': Starts from 1 and increments until it reaches the given stringsNumber, then switches to 'downToUp'.
   * - Any other string: Directly assigns the specified string to each card.
   */
  insertStringsOnCards(str: string, stringsNumber: number) {
    let strNumber = 0;

    switch (str) {
      case "downToUp":
        strNumber = stringsNumber;
        break;
      case "upToDown":
        strNumber = 1;
        break;
      default:
        strNumber = parseInt(str);
        break;
    }

    this.deck.forEach((card: Card) => {
      switch (str) {
        case "downToUp":
          card.str = strNumber.toString();
          strNumber--;
          if (strNumber === 1) str = "upToDown";
          break;

        case "upToDown":
          card.str = strNumber.toString();

          strNumber++;
          if (strNumber === stringsNumber) str = "downToUp";
          break;
        default:
          card.str = str;
          break;
      }
    });
  }

  /**
   * Shuffles the deck of cards.
   *
   * This method shuffles the current deck of cards using the Fisher-Yates algorithm.
   * If the deck is empty or undefined, an error is thrown.
   *
   * @throws {Error} If there are no cards in the deck to shuffle.
   */
  suffleDeck() {
    if (!this.deck) new Error("There  are no cards in the deck to suffle");

    let suffledDeck = this.deck.slice();

    for (let i = suffledDeck.length; i > 0; i--) {
      const sortedIndex = useMath().sortIndex(i);
      const card = suffledDeck[sortedIndex];
      suffledDeck.push(card);
      suffledDeck.splice(sortedIndex, 1);
    }

    this.deck = suffledDeck;
  }

  /**
   * Marks the last card in the deck as the last card by setting its `isLast` property to `true`.
   *
   * @throws {Error} Throws an error if the deck is empty.
   */
  markLastCard() {
    this.deck[this.deck.length - 1].isLast = true;
  }
}

export { Deck };
