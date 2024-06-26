import { defineStore } from 'pinia'

export const useMyUserStore = defineStore({
	id: 'myUserStore',
	state: () => ({
		id: '',
		userName: '',
		email: '',
		password: '',
		loggedIn: false,
		theme: 'dark',
	}),

	getters: {
		getId(state) {
			return state.id
		},

		getUserName(state) {
			return state.userName
		},

		getPassword(state) {
			return state.password
		},

		getloggedIn(state) {
			return state.loggedIn
		},
	},
	actions: {
		setId(id: string) {
			this.id = id
		},

		setUserName(userName: string) {
			this.userName = userName
			return
		},

		setPassword(password: string) {
			this.password = password
		},

		clearPassword() {
			this.password = ''
		},

		logIn() {
			this.loggedIn = true
			return this.loggedIn
		},

		logOut() {
			this.loggedIn = false
		},
	},
})
