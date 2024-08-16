import { defineStore } from 'pinia'

export const useMyUserStore = defineStore({
	id: 'myUserStore',
	state: () => ({
		id: ('' as string) || null,
		userName: '',
		email: '',
		password: '',
		confirmPassword: '',
		acceptTerms: false,
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

		getEmail(state) {
			return state.email
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

		isAllFields() {
			return this.email &&
				this.userName &&
				this.password &&
				this.confirmPassword &&
				this.acceptTerms
				? true
				: false
		},

		clearPassword() {
			this.password = ''
			this.confirmPassword = ''
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
