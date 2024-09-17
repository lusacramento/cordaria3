import type { ObjectId } from 'mongoose'
import type { Instrument } from '~/types/Instrument'
import type { Settings } from '~/types/Settings.js'
import { ViewMode } from '~/types/ViewMode'

export const useDbController = () => {
	const userStore = useMyUserStore()
	const userDetailsStore = useMyUserDetailsStore()
	const iUser = useIUser()
	const iSettings = useISettings()

	// functions
	// user
	async function getUserDetails() {
		return await iUser.getUserDetails(userStore.getId)
	}

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

	async function postSettings(settings: Settings) {
		return await iSettings.postSettings(settings)
	}

	async function updateSettings(data: any) {
		return await iSettings.updateSettings(userStore.getId, data)
	}
	return {
		getUserDetails,
		postUserDetails,
		updateUserDetails,
		postSettings,
		updateSettings,
	}
}
