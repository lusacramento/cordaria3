import { defineStore } from 'pinia'
import { Instrument } from '~/types/Instrument.js'
import type { Settings } from '~/types/Settings'
import { ViewMode } from '~/types/ViewMode'

export const useMySettingsStore = defineStore({
	id: 'mySettingsStore',
	state: () => ({
		counter: 4,
		viewMode: ViewMode.CARDS3,
		instrument: Instrument.NOT_SELECTED,
		showStatistics: false,
	}),

	getters: {
		getCounter(state) {
			return state.counter
		},

		getViewMode(state) {
			return state.viewMode
		},

		getInstrument(state) {
			return state.instrument
		},

		getShowStatistics(state) {
			return state.showStatistics
		},
	},

	actions: {
		setAllSettings(settings: Settings) {
			this.counter = settings.counter
			this.viewMode = settings.viewMode
			this.instrument = settings.instrument
		},

		setCounter(value: number) {
			this.counter = value
		},

		setViewMode(value: ViewMode) {
			this.viewMode = value
		},

		toogleShowStatistics() {
			this.showStatistics = !this.showStatistics
		},

		async loadSettings() {
			const settings = (await useISettings().getSettings(
				useMyUserStore().getId,
			)) as Settings

			if (settings) this.setAllSettings(settings)
		},

		async updateSettings() {
			return await useISettings().updateSettings(
				useMyUserStore().getId,
				this.$state as unknown as Settings,
			)
			// }
		},
	},
})
