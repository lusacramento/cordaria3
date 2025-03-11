export const useIUser = () => {
  const registerUrl = "/api/auth/register";
  const userDetailsUrl = "/api/userdetails";
  const userUrl = "/api/user";
  const tokenUrl = "api/user/token";

  /**
   * Finds a user by their email address.
   *
   * @param {string} email - The email address of the user to find.
   * @returns {Promise<any>} A promise that resolves to the user data.
   */
  async function findUserByEmail(email: string) {
    return await $fetch(userUrl, {
      method: "get",
      params: { email: email },
    });
  }

  /**
   * Creates a new user by sending a POST request to the register URL.
   *
   * @param {any} values - The user data to be sent in the request body.
   * @returns {Promise<any>} A promise that resolves to the response of the fetch request.
   */
  async function createUser(values: any) {
    return await $fetch(registerUrl, {
      method: "post",
      body: values,
    });
  }

  /**
   * Updates the user information with the given ID.
   *
   * @param {string} id - The ID of the user to update.
   * @param {object} body - The new data for the user.
   * @returns {Promise<any>} A promise that resolves to the response of the update request.
   */
  async function setUser(id: string, body: {}) {
    return await $fetch(userUrl, {
      method: "put",
      params: { id: id },
      body: body,
    });
  }

  /**
   * Fetches the details of a user by their ID.
   *
   * @param {string | null} id - The ID of the user to fetch details for. If null, no user details will be fetched.
   * @returns {Promise<any>} A promise that resolves to the user details.
   */
  async function getUserDetails(id: string | null) {
    return await $fetch(userDetailsUrl, {
      method: "get",
      params: { id: id },
    });
  }

  /**
   * Sends a POST request to submit user details.
   *
   * @param {any} values - The user details to be sent in the request body.
   * @returns {Promise<any>} - A promise that resolves with the response of the fetch request.
   */
  async function postUserDetails(values: any) {
    return await useFetch(userDetailsUrl, {
      method: "post",
      body: values,
    });
  }

  /**
   * Sends a POST request to set user details.
   *
   * @param {Object} body - The request payload containing user details.
   * @returns {Promise<any>} - A promise that resolves to the response of the fetch request.
   */
  async function setUserDetails(body: {}) {
    return await $fetch(userDetailsUrl, {
      method: "post",
      body: body,
    });
  }

  /**
   * Fetches the rescue password using the provided token.
   *
   * @param {string} token - The token used to fetch the rescue password.
   * @returns {Promise<any>} A promise that resolves to the response of the fetch request.
   */
  async function getRescuePassword(token: string) {
    return $fetch(tokenUrl, {
      method: "get",
      params: { token: token },
    });
  }

  /**
   * Deletes a user by their ID.
   *
   * @param {string} id - The ID of the user to delete.
   * @param {{}} anonymousUser - An object representing the anonymous user.
   * @returns {Promise<any>} A promise that resolves with the response from the delete operation.
   */
  async function deleteUser(id: string, anonymousUser: {}) {
    return await $fetch(`${userUrl}/delete`, {
      method: "delete",
      body: anonymousUser,
      params: { id: id },
    });
  }

  return {
    findUserByEmail,
    createUser,
    setUser,
    getUserDetails,
    postUserDetails,
    setUserDetails,
    getRescuePassword,
    deleteUser,
  };
};
