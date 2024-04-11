import { defineStore } from 'pinia'

export const useMyUserStore = defineStore({
	id: 'myUserStore',
	state: () => ({
		nameUser: '',
		loggedIn: false,
		theme: 'dark',
	}),

	getters: {
		getNameUser(state) {
			return state.nameUser
		},
		getloggedIn(state) {
			return state.loggedIn
		},
	},
	actions: {},
})
