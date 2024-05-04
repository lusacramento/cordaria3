import { defineStore } from 'pinia'
import { Instrument } from 'tone/build/esm/instrument/Instrument'

export const useMySettingsStore = defineStore({
	id: 'mySettingsStore',
	state: () => ({
		counter: 4,
		lastLesson: 1,
		viewMode: '2Cards',
		instrumentDefault: 'acoustic-guitar',
		themeDark: true,
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

		setViewMode(value: string) {
			this.viewMode = value
		},

		toogleTheme() {
			this.themeDark = !this.themeDark
		},

		toogleShowStatistics() {
			this.showStatistics = !this.showStatistics
		},
	},
})
