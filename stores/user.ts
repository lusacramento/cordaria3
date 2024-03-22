import { defineStore } from 'pinia'

export const useMyUserStore = defineStore({
	id: 'myUserStore',
	state: () => ({
		nameUser: '',
		loggedIn: false,
		lastLesson: 120,
		viewMode: '3Cards',
		theme: 'dark',
		counter: 5,
	}),

	getters: {
		getNameUser(state) {
			return state.nameUser
		},
		getloggedIn(state) {
			return state.loggedIn
		},
		getLastLesson(state) {
			return state.lastLesson
		},
		getViewMode(state) {
			return state.viewMode
		},
		getTheme(state) {
			return state.theme
		},
		getCounter(state) {
			return state.counter
		},
	},
	actions: {},
})
