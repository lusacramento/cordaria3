import { defineStore } from 'pinia'
import { Instrument } from '~/types/Instrument.js'
import type { Settings } from '~/types/Settings'
import { ViewMode } from '~/types/ViewMode'

export const useMySettingsStore = defineStore({
	id: 'mySettingsStore',
	state: () => ({
		userId: '',
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
		setAll(settings: Settings) {
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

		generate() {
			this.userId = useMyUserStore().getId
			this.instrument = Instrument.ACOUSTICGUITAR
		},

		async load() {
			const settings = (await useISettings().getSettings(
				useMyUserStore().getId,
			)) as Settings

			if (settings) {
				this.setAll(settings)
				return
			}

			this.generate()
			this.post()
		},

		async post() {
			console.log(this.$state)
			useISettings().postSettings(this.$state as unknown as Settings)
		},

		async update() {
			this.userId = useMyUserStore().getId
			return await useISettings().updateSettings(
				this.userId,
				this.$state as unknown as Settings,
			)
		},
	},
})
