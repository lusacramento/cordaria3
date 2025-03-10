import type { Instrument } from "~/types/Instrument";

const statisticsUrl = "/api/statistics";

/**
 * Fetches statistics for a given user and instrument.
 *
 * @param {string} userId - The ID of the user for whom to fetch statistics.
 * @param {Instrument} instrument - The instrument for which to fetch statistics.
 * @returns {Promise<any>} A promise that resolves to the fetched statistics.
 */
function getStatistics(userId: string, instrument: Instrument) {
  return $fetch(statisticsUrl, {
    method: "get",
    params: { userId: userId, instrument: instrument },
  });
}

export const useIStatistics = () => {
  return { getStatistics };
};
