import { Instrument } from "./../../types/Instrument";
import type { Progress } from "~/types/Progress";

export const useIProgress = () => {
  const url = "/api/progress";
  const urlLastProgress = "/api/progress/last";

  /**
   * Fetches the progress of a user for a specific instrument and lesson.
   *
   * @param userId - The ID of the user whose progress is being fetched.
   * @param instrument - The instrument for which the progress is being fetched.
   * @param currentLesson - The current lesson number for which the progress is being fetched.
   * @returns A promise that resolves to the progress data.
   */
  async function getProgress(
    userId: string,
    instrument: string,
    currentLesson: number
  ) {
    return await $fetch(url, {
      method: "get",
      params: {
        userId,
        instrument,
        currentLesson,
      },
    });
  }

  /**
   * Fetches the last progress of a user for a given instrument.
   *
   * @param {string} userId - The ID of the user.
   * @param {Instrument} instrument - The instrument for which to fetch the last progress.
   * @returns {Promise<any>} A promise that resolves to the last progress data.
   */
  async function getLastProgress(userId: string, instrument: Instrument) {
    return await $fetch(urlLastProgress, {
      method: "get",
      params: { userId, instrument },
    });
  }

  /**
   * Sends a POST request to the specified URL with the given progress data.
   *
   * @param {Progress} progress - The progress data to be sent in the request body.
   * @returns {Promise<any>} A promise that resolves with the response of the fetch request.
   */
  async function postProgress(progress: Progress) {
    return await $fetch(url, {
      method: "post",
      body: progress,
    });
  }

  /**
   * Updates the progress by sending a PUT request to the specified URL.
   *
   * @param progress - The progress data to be sent in the request body.
   * @returns A promise that resolves with the response from the server.
   */
  async function setProgress(progress: any) {
    return await $fetch(url, {
      method: "put",
      body: progress,
    });
  }
  return { getProgress, getLastProgress, postProgress, setProgress };
};
