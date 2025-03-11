import { Instrument } from "~/types/Instrument";

export const useHelpers = () => {
  /**
   * Translates a given direction string into a more descriptive phrase.
   *
   * @param direction - The direction to translate. Can be either "downToUp", "upToDown", or a number.
   * @returns The translated direction as a string. If the direction is "downToUp", it returns "Todas (início do grave)".
   * If the direction is "upToDown", it returns "Todas (ínicio do agudo)". Otherwise, it returns the original direction.
   */
  function translate(direction: string | number) {
    switch (direction) {
      case "downToUp":
        return "Todas (início do grave)";
      case "upToDown":
        return "Todas (ínicio do agudo)";

      default:
        return direction;
    }
  }

  /**
   * Returns the quantity of strings for a given instrument.
   *
   * @param instrument - The instrument for which to get the quantity of strings.
   * @returns The number of strings for the specified instrument.
   */
  function getQuantityOfStrings(instrument: Instrument) {
    switch (true) {
      case instrument === Instrument.ACOUSTICGUITAR ||
        instrument === Instrument.ELECTRICGUITAR:
        return 6;
      case instrument === Instrument.BASS || instrument === Instrument.CAVACO:
        return 4;
    }
  }

  /**
   * Extracts the file extension from a given file name.
   *
   * @param name - The name of the file including its extension.
   * @returns The file extension as a string.
   */
  function getFileExtension(name: string) {
    return name.split(".")[1];
  }

  /**
   * Converts an `Instrument` enum value to its corresponding string representation.
   *
   * @param instrument - The `Instrument` enum value to convert.
   * @returns The string representation of the given `Instrument` enum value.
   * @throws Will throw an error if the instrument is `Instrument.NOT_SELECTED`.
   * @throws Will throw an error if the instrument is not found in the enum.
   */
  function convertInstrumentEnumToString(instrument: Instrument) {
    switch (instrument) {
      case Instrument.ACOUSTICGUITAR:
        return "acoustic-guitar";
      case Instrument.ELECTRICGUITAR:
        return "electric-guitar";

      case Instrument.BASS:
        return "bass";
      case Instrument.CAVACO:
        return "cavaco";

      case Instrument.NOT_SELECTED:
        throw createError("Instrumento não selecionado.");

      default:
        throw createError("Instrumento não encontrado.");
    }
  }

  /**
   * Generates a random hash string of a specified length.
   *
   * @returns {string} A randomly generated hash string consisting of uppercase letters, lowercase letters, and digits.
   */
  function generateRandomHash() {
    const lenght = 64;
    const characters =
      "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    let hash = "";

    for (let i = 0; i < lenght; i++) {
      hash += characters.charAt(Math.floor(Math.random() * characters.length));
    }

    return hash;
  }

  /**
   * Calculates the expiration time which is 30 minutes from the current time.
   *
   * @returns {Date} The expiration date and time.
   */
  function expiresAt() {
    const more30min = 30 * 60 * 1000;
    return new Date(Date.now() + more30min);
  }

  /**
   * Checks if a token is expired based on the provided expiration date.
   *
   * @param expiresAt - The expiration date of the token.
   * @returns `true` if the token is expired, `false` otherwise.
   */
  function isExpiredToken(expiresAt: Date) {
    const now = new Date(Date.now());
    const exp = new Date(expiresAt);
    return now > exp;
  }

  return {
    translate,
    getQuantityOfStrings,
    getFileExtension,
    convertInstrumentEnumToString,
    generateRandomHash,
    expiresAt,
    isExpiredToken,
  };
};
