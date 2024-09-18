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
		imageUrl: '/imgs/uploads/default-avatar.png',
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
				imageUrl: state.imageUrl,
			}
		},

		getFullName(state) {
			return state.fullName
		},

		getImageUrl(state) {
			return state.imageUrl
		},
	},
	actions: {
		setId(id: string) {
			this.id = id
		},

		setUserId(id: string) {
			this.userId = id
		},

		setImageUrl(imageFileName: string) {
			this.imageUrl = `/imgs/uploads/${imageFileName}`
		},

		async set(userDetails: UserDetails) {
			this.id = (await userDetails._id) as unknown as string
			this.userId = (await userDetails.userId) as unknown as string
			this.fullName = userDetails.fullName
			this.age = userDetails.age
			this.state = userDetails.state
			this.country = userDetails.country
			this.imageUrl = userDetails.imageUrl
		},

		async load() {
			const userDetails = (await useIUser().getUserDetails(
				useMyUserStore().getId,
			)) as unknown as UserDetails

			if (userDetails) this.set(userDetails)
		},

		async post() {
			await useIUser().postUserDetails(this.$state)
		},
	},
})
