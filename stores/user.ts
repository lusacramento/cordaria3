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
	actions: {
		async createUser(values: any) {
			const response = await useFetch('/api/users', {
				method: 'post',
				body: values,
			})
			console.log(values)
			if (!response.error.value) {
				this.userName = values.userName
				this.loggedIn = true
			}
			console.log(response.error.value?.data)
			return response
		},
	},
})
