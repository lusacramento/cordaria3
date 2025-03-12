/**
 * Store for managing user details.
 *
 * @module stores/userDetails
 */

import { useMyUserStore } from "./user";
import { defineStore } from "pinia";
import type { UserDetails } from "~/types/UserDetails";
import type { Location } from "~/types/Location";

/**
 * Defines the store for user details.
 */
export const useMyUserDetailsStore = defineStore("myUserDetailsStore", {
  state: () => ({
    /**
     * User detail ID.
     * @type {string}
     */
    id: "",

    /**
     * User ID.
     * @type {string}
     */
    userId: "",

    /**
     * Full name of the user.
     * @type {string}
     */
    fullName: "",

    /**
     * Age of the user.
     * @type {number}
     */
    age: 0,

    /**
     * Location of the user.
     * @type {Location}
     */
    location: {} as Location,

    /**
     * Avatar of the user.
     * @type {string}
     */
    avatar: "",
  }),

  getters: {
    /**
     * Gets the user detail ID.
     * @param {object} state - The state object.
     * @returns {string} The user detail ID.
     */
    getId(state) {
      return state.id;
    },

    /**
     * Gets all user details.
     * @param {object} state - The state object.
     * @returns {object} An object containing all user details.
     */
    getAll(state) {
      return {
        fullName: state.fullName,
        age: state.age,
        location: state.location,
        avatar: state.avatar,
      };
    },

    /**
     * Gets the full name of the user.
     * @param {object} state - The state object.
     * @returns {string} The full name of the user.
     */
    getFullName(state) {
      return state.fullName;
    },

    /**
     * Gets the avatar of the user.
     * @param {object} state - The state object.
     * @returns {string} The avatar of the user.
     */
    getAvatar(state) {
      return state.avatar;
    },
  },
  actions: {
    /**
     * Sets the user detail ID.
     * @param {string} id - The user detail ID.
     */
    setId(id: string) {
      this.id = id;
    },

    /**
     * Sets the user ID.
     * @param {string} id - The user ID.
     */
    setUserId(id: string) {
      this.userId = id;
    },

    /**
     * Sets the avatar of the user.
     * @param {any} image - The avatar image.
     */
    async setAvatar(image: any) {
      this.avatar = image;
    },

    /**
     * Sets the user details.
     * @param {UserDetails} userDetails - The user details.
     */
    async set(userDetails: UserDetails) {
      this.id = (await userDetails._id) as unknown as string;
      this.userId = (await userDetails.userId) as unknown as string;
      this.fullName = userDetails.fullName;
      this.age = userDetails.age;
      this.location = userDetails.location;
      this.avatar = userDetails.avatar;
    },

    /**
     * Loads the user details.
     */
    async load() {
      const userDetails = (await useIUser().getUserDetails(
        useMyUserStore().getId
      )) as unknown as UserDetails;

      if (userDetails) this.set(userDetails);
    },

    /**
     * Posts the user details.
     */
    async post() {
      this.userId = useMyUserStore().getId;
      await useIUser().postUserDetails(this.$state);
    },

    /**
     * Deletes the user details.
     */
    async delete() {
      await useIUser().deleteUser(this.userId, this.generateAnonymousUser());
    },

    /**
     * Generates an anonymous user object.
     * @returns {object} An anonymous user object.
     */
    generateAnonymousUser() {
      return {
        age: this.age,
        location: this.location,
      };
    },
  },
});
