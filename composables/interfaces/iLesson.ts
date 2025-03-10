export const useILesson = () => {
  /**
   * Sends a POST request to the '/api/lessons/lessons' endpoint with the provided values.
   *
   * @param {any} values - The data to be sent in the body of the POST request.
   * @returns {Promise<any>} - A promise that resolves with the response from the server.
   */
  async function postMany(values: any) {
    return await $fetch("/api/lessons/lessons", {
      method: "post",
      body: values,
    });
  }

  /**
   * Fetches all lessons, utilizing cached data if available.
   *
   * @returns {Promise<any>} A promise that resolves to the list of lessons.
   *
   * @remarks
   * This function first checks if the lessons data is cached using `useNuxtData`.
   * If cached data is found, it returns the cached data.
   * Otherwise, it fetches the lessons data from the API endpoint `/api/lessons/lessons`
   * and caches the result using `useFetch` with the key 'findAllLessons'.
   * After fetching, it refreshes the Nuxt data cache for 'findAllLessons'.
   */
  async function getAll() {
    const LessonsCached = useNuxtData("findAllLessons").data.value;
    if (LessonsCached) return LessonsCached;

    const { data } = await useFetch("/api/lessons/lessons", {
      key: "findAllLessons",
    });

    refreshNuxtData("findAllLessons");

    return data;
  }

  /**
   * Fetches a lesson based on the provided query parameters.
   *
   * @param {Object} queryLesson - The query parameters to filter the lesson.
   * @returns {Promise<any>} A promise that resolves to the fetched lesson data.
   */
  async function getLesson(queryLesson: Object) {
    return await $fetch("/api/lessons/lesson/", {
      method: "get",
      query: queryLesson,
    });
  }

  /**
   * Fetches a lesson by its ID.
   *
   * @param {string} id - The ID of the lesson to fetch.
   * @returns {Promise<any>} A promise that resolves to the lesson data.
   */
  async function getLessonById(id: string) {
    return await $fetch("/api/lessons/" + id, {
      method: "get",
    });
  }

  /**
   * Deletes all lessons by sending a DELETE request to the '/api/lessons/lessons' endpoint.
   *
   * @returns {Promise<any>} A promise that resolves with the response of the DELETE request.
   */
  async function deleteAll() {
    return await $fetch("/api/lessons/lessons", {
      method: "delete",
    });
  }

  return { postMany, getAll, deleteAll, getLesson, getLessonById };
};
