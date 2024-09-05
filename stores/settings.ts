import { defineStore } from 'pinia'
import { Instrument } from '~/types/Instrument.js'
import type { Settings } from '~/types/Settings'
import { ViewMode } from '~/types/ViewMode'

export const useMySettingsStore = defineStore({
	id: 'mySettingsStore',
	state: () => ({
		counter: 4,
		viewMode: ViewMode.CARDS3,
		instrument: Instrument.ACOUSTICGUITAR,
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

		getInstrument(state) {
			return state.instrument
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
