import { type User } from "~/types/User.js";
import { useMySettingsStore } from "./settings";
import { defineStore } from "pinia";

/**
 * Store for managing user data and actions.
 */
export const useMyUserStore = defineStore("myUserStore", {
  state: () => ({
    /**
     * User ID.
     * @type {string}
     */
    _id: "" as string,

    /**
     * User's name.
     * @type {string}
     */
    userName: "",

    /**
     * User's email.
     * @type {string}
     */
    email: "",

    /**
     * User's password.
     * @type {string}
     */
    password: "",

    /**
     * User's password confirmation.
     * @type {string}
     */
    confirmPassword: "",

    /**
     * Whether the user has accepted the terms.
     * @type {boolean}
     */
    acceptTerms: false,

    /**
     * Whether the user is newly registered.
     * @type {boolean}
     */
    isNewRegistered: false,

    /**
     * Whether the user is logged in.
     * @type {boolean}
     */
    loggedIn: false,

    /**
     * Token for password rescue.
     * @type {string}
     */
    rescueToken: "",

    /**
     * User's theme preference.
     * @type {string}
     */
    theme: "dark",
  }),

  getters: {
    /**
     * Get the user ID.
     * @param {object} state - The state object.
     * @returns {string} The user ID.
     */
    getId(state) {
      return state._id;
    },

    /**
     * Get the user's name.
     * @param {object} state - The state object.
     * @returns {string} The user's name.
     */
    getUserName(state) {
      return state.userName;
    },

    /**
     * Get the user's email.
     * @param {object} state - The state object.
     * @returns {string} The user's email.
     */
    getEmail(state) {
      return state.email;
    },

    /**
     * Get the user's password.
     * @param {object} state - The state object.
     * @returns {string} The user's password.
     */
    getPassword(state) {
      return state.password;
    },

    /**
     * Get the user's password confirmation.
     * @param {object} state - The state object.
     * @returns {string} The user's password confirmation.
     */
    getConfirmPassword(state) {
      return state.confirmPassword;
    },

    /**
     * Get whether the user has accepted the terms.
     * @param {object} state - The state object.
     * @returns {boolean} Whether the user has accepted the terms.
     */
    getAcceptTerms(state) {
      return state.acceptTerms;
    },

    /**
     * Get whether the user is newly registered.
     * @param {object} state - The state object.
     * @returns {boolean} Whether the user is newly registered.
     */
    getIsNewRegistered(state) {
      return state.isNewRegistered;
    },

    /**
     * Get whether the user is logged in.
     * @param {object} state - The state object.
     * @returns {boolean} Whether the user is logged in.
     */
    getloggedIn(state) {
      return state.loggedIn;
    },

    /**
     * Get the rescue token.
     * @param {object} state - The state object.
     * @returns {string} The rescue token.
     */
    getRescueToken(state) {
      return state.rescueToken;
    },

    /**
     * Get the rescue URL.
     * @param {object} state - The state object.
     * @returns {string} The rescue URL.
     */
    getRescueUrl(state) {
      const baseUrl = useRuntimeConfig().public.origin;
      return `${baseUrl}/recuperar-senha?token=${state.rescueToken}`;
    },
  },
  actions: {
    /**
     * Set the user ID.
     * @param {string} id - The user ID.
     */
    setId(id: string) {
      this._id = id;
    },

    /**
     * Set the user's name.
     * @param {string} userName - The user's name.
     */
    setUserName(userName: string) {
      this.userName = userName;
    },

    /**
     * Set the user's email.
     * @param {string} email - The user's email.
     */
    setEmail(email: string) {
      this.email = email;
    },

    /**
     * Set the user's password.
     * @param {string} password - The user's password.
     */
    setPassword(password: string) {
      this.password = password;
    },

    /**
     * Set whether the user is newly registered.
     * @param {boolean} newRegistered - Whether the user is newly registered.
     */
    setIsNewRegistered(newRegistered: boolean) {
      this.isNewRegistered = newRegistered;
    },

    /**
     * Set the rescue token.
     * @param {string} token - The rescue token.
     */
    setRescueToken(token: string) {
      this.rescueToken = token;
    },

    /**
     * Check if all required fields are filled.
     * @returns {boolean} Whether all required fields are filled.
     */
    isAllFields() {
      return this.email &&
        this.userName &&
        this.password &&
        this.confirmPassword &&
        this.acceptTerms
        ? true
        : false;
    },

    /**
     * Clear the user's password and password confirmation.
     */
    clearPassword() {
      this.password = "";
      this.confirmPassword = "";
    },

    /**
     * Log the user in.
     * @returns {boolean} Whether the user is logged in.
     */
    logIn() {
      this.loggedIn = true;
      return this.loggedIn;
    },

    /**
     * Log the user out.
     */
    logOut() {
      this.loggedIn = false;
    },

    /**
     * Get the user by email.
     * @returns {Promise<User | null>} The user object or null if not found.
     */
    async getUserByEmail() {
      this.setId("");
      const user = (await useIUser().findUserByEmail(this.email)) as User;
      if (user) {
        if (user._id) this.setId(user?._id);
        this.setUserName(user.userName);
        this.setEmail(user.email);
        return user;
      }
      return null;
    },

    /**
     * Register a new user.
     * @returns {Promise<void>}
     */
    async register() {
      const user = {
        userName: this.userName,
        email: this.email,
        password: this.password,
        confirmPassword: this.confirmPassword,
        acceptTerms: this.acceptTerms,
        rescuePassword: "",
      } as User;

      this.clearPassword();
      const response = (await useIUser().createUser(user)) as unknown as User;

      if (response._id) this._id = response._id;

      this.setIsNewRegistered(true);

      this.saveSettings();
    },

    /**
     * Save user settings.
     * @returns {Promise<void>}
     */
    async saveSettings() {
      useMySettingsStore().setUserId(this._id);
      await useMySettingsStore().post();
    },

    /**
     * Update the user with new values.
     * @param {object} values - The new values to update.
     * @returns {Promise<void>}
     */
    async updateUser(values: {}) {
      const user = (await useIUser().setUser(this._id, values)) as User;

      if (user) {
        if (user._id) this._id = user._id;
        this.setUserName(user.userName);
        this.setEmail(user.email);
        if (user.rescuePassword?.token)
          this.rescueToken = user.rescuePassword?.token;
      }
    },

    /**
     * Get the rescue token by token.
     * @param {string} token - The token to get the rescue token.
     * @returns {Promise<string | Error>} The rescue token or an error.
     */
    async getToken(token: string) {
      try {
        const response = (await useIUser().getRescuePassword(token)) as User;
        if (response) {
          if (response._id) this._id = response._id;
          this.email = response.email;
          if (response.rescuePassword?.token)
            return (this.rescueToken = response.rescuePassword?.token);
        }
      } catch (error) {
        return error;
      }
    },
    async loadUserStore() {
      const { getSession } = useAuth();
      const session = await getSession();
      const user = session?.user;
      // @ts-ignore
      this.setId(user._id);
      // @ts-ignore
      this.setUserName(user.userName);
      // @ts-ignore
      this.setId(user._id);
      this.logIn();
    },
  },
});
