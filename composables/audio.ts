import * as Tone from "tone";
import type { Card } from "./model/card";
import { Instrument } from "~/types/Instrument";

/**
 * An object to store URLs.
 *
 * @type {Object.<string, any>}
 */
let urls: any = {};
/**
 * An array of strings representing the playlist.
 */
const playlist: string[] = [];

/**
 * Adjusts the release duration for legato notes.
 *
 * This constant is used to fine-tune the synchronization of legato notes
 * by adjusting their release duration. The value represents a multiplier
 * that is applied to the default release duration.
 *
 * @constant {number} adjustSync - The multiplier for adjusting the release duration.
 */
const adjustSync = 1.1; // <-- ajust here the release duration for legattos notes

/**
 * A global instance of Tone.Sampler used for audio sampling.
 *
 * @type {Tone.Sampler}
 */
let sampler: Tone.Sampler;
/**
 * A Tone.js Sequence object that allows scheduling of events along a timeline.
 * The sequence can be used to create musical patterns or sequences of events.
 *
 * @type {Tone.Sequence}
 */
let sequence: Tone.Sequence;

/**
 * Retrieves the instrument mapping based on the provided instrument type.
 *
 * @param {Instrument} instrument - The type of instrument for which the mapping is needed.
 * @returns {object} The mapping object for the specified instrument.
 *
 * @example
 * const guitarMap = getInstrumentMapping(Instrument.ACOUSTICGUITAR);
 * const bassMap = getInstrumentMapping(Instrument.BASS);
 */
function getInstrumentMapping(instrument: Instrument) {
  let instrumentMap = {};
  switch (true) {
    case instrument === Instrument.ACOUSTICGUITAR ||
      instrument === Instrument.ELECTRICGUITAR:
      instrumentMap = useGuitar().getMap();
      break;
    case instrument === Instrument.CAVACO:
      instrumentMap = useCavaco().getMap();
      break;
    case instrument === Instrument.BASS:
      instrumentMap = useBass().getMap();
      break;
    default:
      break;
  }
  return instrumentMap;
}

/**
 * Asynchronously retrieves and plays audio samples based on the provided parameters.
 *
 * @param {number} counter - The counter value used for metronome and playlist operations.
 * @param {Instrument} instrument - The instrument object containing information about the instrument to be used.
 * @param {Object} instrumentMap - A mapping object that associates instrument names with their corresponding audio URLs.
 * @param {Card[]} deck - An array of Card objects representing the deck of cards to be used in the playlist.
 * @param {number} bpm - The beats per minute (BPM) value for the audio playback.
 * @param {number} tempo - The tempo value for the audio playback.
 * @returns {Promise<void>} A promise that resolves when the audio samples have been successfully retrieved and played.
 */
async function getAudios(
  counter: number,
  instrument: Instrument,
  instrumentMap: {},
  deck: Card[],
  bpm: number,
  tempo: number
) {
  urls = getMetronomeUrls(urls);
  urls = getInstrumentUrls(urls, instrument, instrumentMap);

  addMetronomeToPlaylist(counter, playlist);

  addInstrumentToPlaylist(deck, playlist, instrumentMap);
  if (sampler) {
    await stopAudios();
  }

  sampler = await new Tone.Sampler({
    urls: urls,
    onload: async () => {
      sequence = await generateSequence(sampler, tempo).start(0);

      await playAudios(bpm);
      useGameController().startLesson(tempo);
    },

    onerror: (error) => {
      new Error("Error loading sample: ", error);
    },
  });
  sampler.toDestination();
}

/**
 * Updates the provided `urls` object with metronome sound URLs.
 *
 * @param {any} urls - The object to be updated with metronome sound URLs.
 * @returns {any} The updated `urls` object with `C1` and `C0` properties set to the respective metronome sound URLs.
 */
function getMetronomeUrls(urls: any) {
  const baseUrl = useUrls().getUrl("metronome");

  urls["C1"] = `${baseUrl}high.mp3`;
  urls["C0"] = `${baseUrl}low.mp3`;

  return urls;
}

/**
 * Generates a map of instrument URLs based on the provided instrument and instrument map.
 *
 * @param {any} urls - An object to store the generated URLs.
 * @param {Instrument} instrument - The instrument for which URLs are being generated.
 * @param {Object} instrumentMap - A map containing the instrument data.
 * @returns {any} The updated URLs object with the generated URLs.
 *
 * @throws {Error} If the instrumentMap is not an array.
 */
function getInstrumentUrls(
  urls: any,
  instrument: Instrument,
  instrumentMap: {}
) {
  const baseUrl = useUrls().getUrl(
    useHelpers().convertInstrumentEnumToString(instrument)
  );

  if (!Array.isArray(instrumentMap)) {
    new Error("instrumentMap  is not an array");
  } else
    instrumentMap.forEach((str: any[]) => {
      str.forEach((fret) => {
        urls[fret.note] = `${baseUrl}${fret.tablature}.mp3`;
      });
    });

  return urls;
}

/**
 * Adds a metronome sequence to the given playlist.
 *
 * @param counter - The number of beats to add to the playlist.
 * @param playlist - The playlist array to which the metronome beats will be added.
 *                    The first beat will be 'C1' and the subsequent beats will be 'C0'.
 */
function addMetronomeToPlaylist(counter: number, playlist: any[]) {
  playlist.push(["C1"]);
  for (let index = 2; index <= counter; index++) playlist.push(["C0"]);
}

/**
 * Adds instruments to the playlist based on the given deck of cards and instrument map.
 *
 * @param {Card[]} deck - The deck of cards to process.
 * @param {any[]} playlist - The playlist to which the notes will be added.
 * @param {any} instrumentMap - The map of instruments, where each string index maps to an array of notes.
 * @returns {any[]} The updated playlist with the added notes.
 */
function addInstrumentToPlaylist(
  deck: Card[],
  playlist: any[],
  instrumentMap: any
) {
  deck.forEach((card: Card) => {
    addCardToPlaylist(card, parseInt(card.str));
  });

  /**
   * Adds the notes from a card's fragments to the playlist based on the specified string.
   *
   * @param {Card} card - The card containing fragments to be added to the playlist.
   * @param {number} str - The string number used to determine the note from the instrument map.
   */
  function addCardToPlaylist(card: Card, str: number) {
    card.fragments.forEach((fragment: any) => {
      const fret = fragment.value;
      const strIndex = str - 1;
      const note = instrumentMap[strIndex][parseInt(fret)].note;

      playlist.push([note]);
    });
  }

  return playlist;
}

/**
 * Generates a Tone.js sequence using the provided sampler and tempo.
 *
 * @param {Tone.Sampler} sampler - The Tone.js sampler to use for triggering notes.
 * @param {number} tempo - The tempo in beats per minute (BPM) to use for the sequence.
 * @returns {Tone.Sequence} - A new Tone.js Sequence object.
 */
function generateSequence(sampler: Tone.Sampler, tempo: number) {
  return new Tone.Sequence((time, note) => {
    sampler.triggerAttackRelease(note, calculateRelease(tempo), time);
  }, playlist);
}

/**
 * Plays a sequence of audio tracks at the specified beats per minute (BPM).
 *
 * @param bpm - The beats per minute at which the audio sequence should be played.
 */
function playAudios(bpm: number) {
  sequence.loop = false;
  sequence.now();
  Tone.getTransport().bpm.value = bpm / 2;
  Tone.start();
  Tone.getTransport().start();
}

/**
 * Stops all currently playing audios and disposes of the sampler.
 *
 * This function checks if the Tone.js context is running and if the sampler is defined.
 * If both conditions are met, it disposes of the sampler, stops the sequence, and cancels the transport.
 *
 * @async
 * @function
 * @returns {Promise<void>} A promise that resolves when all actions are completed.
 */
async function stopAudios() {
  if (Tone.getContext().state === "running" && sampler) {
    await sampler.dispose();
    await sequence.stop;
    await Tone.getTransport().cancel();
  }
}

/**
 * Calculates the release time based on the given tempo and an adjustment factor.
 *
 * @param tempo - The tempo value to be used in the calculation.
 * @returns The calculated release time.
 */
function calculateRelease(tempo: number) {
  return (tempo * adjustSync) / 1000;
}

export const useAudio = () => {
  return {
    getInstrumentMapping,
    getAudios,
    sampler,
    sequence,
    Tone,
    stopAudios,
  };
};
