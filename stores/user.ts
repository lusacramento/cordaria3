import { type User } from "~/types/User.js";
import { useMySettingsStore } from "./settings";
import { defineStore } from "pinia";

export const useMyUserStore = defineStore({
  id: "myUserStore",
  state: () => ({
    _id: "" as string,
    userName: "",
    email: "",
    password: "",
    confirmPassword: "",
    acceptTerms: false,
    isNewRegistered: false,
    loggedIn: false,
    rescueToken: "",
    theme: "dark",
  }),

  getters: {
    getId(state) {
      return state._id;
    },

    getUserName(state) {
      return state.userName;
    },

    getEmail(state) {
      return state.email;
    },

    getPassword(state) {
      return state.password;
    },

    getConfirmPassword(state) {
      return state.confirmPassword;
    },

    getAcceptTerms(state) {
      return state.acceptTerms;
    },

    getIsNewRegistered(state) {
      return state.isNewRegistered;
    },

    getloggedIn(state) {
      return state.loggedIn;
    },

    getRescueToken(state) {
      return state.rescueToken;
    },

    getRescueUrl(state) {
      const baseUrl = useRuntimeConfig().public.origin;
      return `${baseUrl}/recuperar-senha?token=${state.rescueToken}`;
    },
  },
  actions: {
    setId(id: string) {
      this._id = id;
    },

    setUserName(userName: string) {
      this.userName = userName;
    },

    setEmail(email: string) {
      this.email = email;
    },

    setPassword(password: string) {
      this.password = password;
    },

    setIsNewRegistered(newRegistered: boolean) {
      this.isNewRegistered = newRegistered;
    },

    setRescueToken(token: string) {
      this.rescueToken = this.rescueToken;
    },

    isAllFields() {
      return this.email &&
        this.userName &&
        this.password &&
        this.confirmPassword &&
        this.acceptTerms
        ? true
        : false;
    },

    clearPassword() {
      this.password = "";
      this.confirmPassword = "";
    },

    logIn() {
      this.loggedIn = true;
      return this.loggedIn;
    },

    logOut() {
      this.loggedIn = false;
    },

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

    async saveSettings() {
      useMySettingsStore().setUserId(this._id);
      await useMySettingsStore().post();
    },

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
  },
});
