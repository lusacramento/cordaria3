import { defineStore } from 'pinia'

export const useMyUserStore = defineStore({
	id: 'myUserStore',
	state: () => ({
		userName: '',
		loggedIn: false,
		theme: 'dark',
	}),

	getters: {
		getNameUser(state) {
			return state.userName
		},
		getloggedIn(state) {
			return state.loggedIn
		},
	},
	actions: {},
})
