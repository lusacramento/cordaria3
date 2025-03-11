import type { Score } from "~/types/Score";

const url = "/api/scores";

/**
 * Fetches the score for a given user and instrument.
 *
 * @param {string} userId - The ID of the user whose score is to be fetched.
 * @param {string} instrument - The instrument for which the score is to be fetched.
 * @returns {Promise<any>} A promise that resolves to the fetched score.
 */
async function getScore(userId: string, instrument: string) {
  return $fetch(url, {
    method: "get",
    query: { userId, instrument },
  });
}

/**
 * Sends a score object to the specified URL using a POST request.
 *
 * @param {Score} score - The score object to be sent.
 * @returns {Promise<any>} A promise that resolves with the response of the fetch request.
 */
async function postScore(score: Score) {
  return $fetch(url, {
    body: score,
    method: "post",
  });
}
export const useIScore = () => {
  return { getScore, postScore };
};
