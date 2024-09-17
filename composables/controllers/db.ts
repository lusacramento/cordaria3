import type { Instrument } from '~/types/Instrument'

export const useDbController = () => {
	const userStore = useMyUserStore()
	const userDetailsStore = useMyUserDetailsStore()
	const iUser = useIUser()
	const iSettings = useISettings()

	// functions
	// user
	async function postUserDetails() {
		const userDetails = {
			userId: userStore.getId,
			...useMyUserDetailsStore().getAll,
		}
		await iUser.postUserDetails(userDetails)
	}

	async function updateUserDetails(instrument: Instrument) {
		await iUser.setUserDetails({
			userId: userDetailsStore.userId,
			instrument: instrument,
		})
	}

	return {
		postUserDetails,
		updateUserDetails,
	}
}
