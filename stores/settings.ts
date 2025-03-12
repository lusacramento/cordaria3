import { defineStore } from "pinia";
import { Instrument } from "~/types/Instrument";
import type { Settings } from "~/types/Settings";
import { ViewMode } from "~/types/ViewMode";
import { useMyUserStore } from "./user";

/**
 * Store for managing user settings.
 */
export const useMySettingsStore = defineStore("mySettingsStore", {
  state: () => ({
    /**
     * The ID of the user.
     * @type {string}
     */
    userId: "",

    /**
     * A counter value.
     * @type {number}
     */
    counter: 4,

    /**
     * The current view mode.
     * @type {ViewMode}
     */
    viewMode: ViewMode.CARDS3,

    /**
     * The selected instrument.
     * @type {Instrument}
     */
    instrument: Instrument.NOT_SELECTED,

    /**
     * Flag to show or hide statistics.
     * @type {boolean}
     */
    showStatistics: false,
  }),

  getters: {
    /**
     * Get the counter value.
     * @param {State} state - The state of the store.
     * @returns {number} The counter value.
     */
    getCounter(state) {
      return state.counter;
    },

    /**
     * Get the current view mode.
     * @param {State} state - The state of the store.
     * @returns {ViewMode} The current view mode.
     */
    getViewMode(state) {
      return state.viewMode;
    },

    /**
     * Get the selected instrument.
     * @param {State} state - The state of the store.
     * @returns {Instrument} The selected instrument.
     */
    getInstrument(state) {
      return state.instrument;
    },

    /**
     * Get the flag to show or hide statistics.
     * @param {State} state - The state of the store.
     * @returns {boolean} The flag to show or hide statistics.
     */
    getShowStatistics(state) {
      return state.showStatistics;
    },
  },

  actions: {
    /**
     * Set the user ID.
     * @param {string} id - The ID of the user.
     */
    setUserId(id: string) {
      this.userId = id;
    },

    /**
     * Set all settings.
     * @param {Settings} settings - The settings to be applied.
     */
    setAll(settings: Settings) {
      this.counter = settings.counter;
      this.viewMode = settings.viewMode;
      this.instrument = settings.instrument;
    },

    /**
     * Set the counter value.
     * @param {number} value - The counter value.
     */
    setCounter(value: number) {
      this.counter = value;
    },

    /**
     * Set the view mode.
     * @param {ViewMode} value - The view mode.
     */
    setViewMode(value: ViewMode) {
      this.viewMode = value;
    },

    /**
     * Set the selected instrument.
     * @param {Instrument} instrument - The instrument to be selected.
     */
    setInstrument(instrument: Instrument) {
      this.instrument = instrument;
    },

    /**
     * Toggle the show statistics flag.
     */
    toogleShowStatistics() {
      this.showStatistics = !this.showStatistics;
    },

    /**
     * Generate the user ID from the user store.
     */
    generate() {
      this.userId = useMyUserStore().getId;
    },

    /**
     * Load the settings from the settings service.
     */
    async load() {
      const settings = (await useISettings().getSettings(
        useMyUserStore().getId
      )) as Settings;

      if (settings) {
        this.setAll(settings);
        return;
      }

      this.generate();
      this.post();
    },

    /**
     * Post the current settings to the settings service.
     */
    async post() {
      useISettings().postSettings(this.$state as unknown as Settings);
    },

    /**
     * Update the settings in the settings service.
     * @returns {Promise<void>}
     */
    async update() {
      this.userId = useMyUserStore().getId;
      return await useISettings().updateSettings(
        this.userId,
        this.$state as unknown as Settings
      );
    },
  },
});
