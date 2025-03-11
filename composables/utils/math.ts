export const useMath = () => {
  /**
   * Converts beats per minute (BPM) to milliseconds per beat.
   *
   * @param bpm - The tempo in beats per minute.
   * @returns The duration of one beat in milliseconds.
   */
  function convertBpmToMs(bpm: number) {
    return 60000 / bpm;
  }

  // adjusting release (audio)
  /**
   * Calculates the release duration for legato notes based on the given tempo.
   *
   * @param tempo - The tempo in milliseconds.
   * @returns The adjusted release duration.
   */
  function calculateRelease(tempo: number) {
    const adjustSync = 1.1; // <-- ajust here the release duration for legattos notes
    return (tempo / 1000) * adjustSync;
  }

  // auxiliary function to suffle cards
  /**
   * Generates a random integer between 0 (inclusive) and the specified maximum value (inclusive).
   *
   * @param {number} max - The maximum value for the random integer.
   * @returns {number} A random integer between 0 and the specified maximum value.
   */
  function sortIndex(max: number) {
    const min = Math.ceil(0);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }
  return {
    convertBpmToMs,
    calculateRelease,
    sortIndex,
  };
};
