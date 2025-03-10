import { type Instrument } from "~/types/Instrument";

const url = "/api/ranking";

export const useIRanking = () => {
  /**
   * Fetches the ranking for a given instrument.
   *
   * @param {Instrument} instrument - The instrument for which to fetch the ranking.
   * @returns {Promise<any>} A promise that resolves to the ranking data.
   */
  function getRanking(instrument: Instrument) {
    return $fetch(url, {
      method: "GET",
      params: { instrument: instrument },
    });
  }
  return { getRanking };
};
