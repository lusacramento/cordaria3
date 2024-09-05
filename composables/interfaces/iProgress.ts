import { Instrument } from './../../types/Instrument'
import type { Progress } from '~/types/Progress'

export const useIProgress = () => {
	const url = '/api/progress/'

	async function getProgress(userId: string, instrument: Instrument) {
		return await $fetch(url, {
			method: 'get',
			params: { userId, instrument },
		})
	}

	async function postProgress(progress: Progress) {
		return await useFetch(url, {
			method: 'post',
			body: progress,
		})
	}

	async function setProgress(progress: Progress) {
		return await useFetch(`${url}alter/`, {
			method: 'put',
			body: progress,
		})
	}
	return { getProgress, postProgress, setProgress }
}
