import { defineStore } from 'pinia'

export const useMyUserDetailsStore = defineStore({
	id: 'myUserDetailsStore',
	state: () => ({
		id: '',
		userId: '',
		fullName: '',
		age: 0,
		state: '',
		country: '',
		instrument: '',
		imageUrl: '/imgs/uploads/default-avatar.png',
	}),

	getters: {
		getAll(state) {
			return {
				fullName: state.fullName,
				age: state.age,
				state: state.state,
				country: state.country,
				instrument: state.instrument,
				imageUrl: state.imageUrl,
			}
		},

		getFullName(state) {
			return state.fullName
		},

		getInstrument(state) {
			return state.instrument
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

		update(data: any) {
			this.id = data._id
			this.userId = data.userId
			this.fullName = data.fullName
			this.age = data.age
			this.state = data.state
			this.country = data.country
			this.instrument = data.instrument
			this.imageUrl = data.imageUrl
		},
	},
})
