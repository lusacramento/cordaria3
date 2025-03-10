import type { Settings } from "~/types/Settings";

const urlSettings = "/api/settings";

export const useISettings = () => {
  /**
   * Fetches the settings for a given user.
   *
   * @param {string} userId - The ID of the user whose settings are to be fetched.
   * @returns {Promise<any>} A promise that resolves to the user's settings.
   */
  function getSettings(userId: string) {
    return $fetch(urlSettings, {
      method: "get",
      params: { userId },
    });
  }

  /**
   * Sends a POST request to update settings.
   *
   * @param {Settings} settings - The settings object to be sent in the request body.
   * @returns {Promise<any>} - A promise that resolves with the response of the fetch request.
   */
  function postSettings(settings: Settings) {
    return $fetch(urlSettings, {
      method: "post",
      body: settings,
    });
  }

  /**
   * Updates the settings for a specific user.
   *
   * @param userId - The unique identifier of the user whose settings are to be updated.
   * @param body - The new settings to be applied to the user.
   * @returns A promise that resolves with the response from the settings update request.
   */
  function updateSettings(userId: string, body: any) {
    return $fetch(urlSettings, {
      method: "put",
      body: body,
      params: { userId: userId },
    });
  }

  return { getSettings, postSettings, updateSettings };
};
