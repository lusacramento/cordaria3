import { defineStore } from 'pinia'
import type { Settings } from '~/types/Settings'
import { ViewMode } from '~/types/ViewMode'

export const useMySettingsStore = defineStore({
	id: 'mySettingsStore',
	state: () => ({
		counter: 4,
		viewMode: ViewMode.CARDS3,
		showStatistics: false,
	}),

	getters: {
		getCounter(state) {
			return state.counter
		},

		getLastLesson(state) {
			return state.lastLesson
		},

		getViewMode(state) {
			return state.viewMode
		},

		getInstrumentDefault(state) {
			return state.instrumentDefault as keyof typeof Instrument
		},

		getTheme(state) {
			return state.themeDark
		},

		getShowStatistics(state) {
			return state.showStatistics
		},
	},

	actions: {
		setCounter(value: number) {
			this.counter = value
		},

		setViewMode(value: ViewMode) {
			this.viewMode = value
		},

		toogleShowStatistics() {
			this.showStatistics = !this.showStatistics
		},
	},
})
