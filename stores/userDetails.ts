import { useMyUserStore } from './user'
import { defineStore } from 'pinia'
import type { UserDetails } from '~/types/UserDetails'

export const useMyUserDetailsStore = defineStore({
	id: 'myUserDetailsStore',
	state: () => ({
		id: '',
		userId: '',
		fullName: '',
		age: 0,
		state: '',
		country: '',
		avatar: '',
	}),

	getters: {
		getId(state) {
			return state.id
		},

		getAll(state) {
			return {
				fullName: state.fullName,
				age: state.age,
				state: state.state,
				country: state.country,
				avatar: state.avatar,
			}
		},

		getFullName(state) {
			return state.fullName
		},

		getAvatar(state) {
			return state.avatar
		},
	},
	actions: {
		setId(id: string) {
			this.id = id
		},

		setUserId(id: string) {
			this.userId = id
		},

		async setAvatar(image: any) {
			this.avatar = image
		},

		async set(userDetails: UserDetails) {
			this.id = (await userDetails._id) as unknown as string
			this.userId = (await userDetails.userId) as unknown as string
			this.fullName = userDetails.fullName
			this.age = userDetails.age
			this.state = userDetails.state
			this.country = userDetails.country
			this.avatar = userDetails.avatar
		},

		async load() {
			const userDetails = (await useIUser().getUserDetails(
				useMyUserStore().getId,
			)) as unknown as UserDetails

			if (userDetails) this.set(userDetails)
		},

		async post() {
			this.userId = useMyUserStore().getId
			console.log(this.userId)

			await useIUser().postUserDetails(this.$state)
		},
	},
})
