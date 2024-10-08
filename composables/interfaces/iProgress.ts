import { Instrument } from './../../types/Instrument'
import type { Progress } from '~/types/Progress'

export const useIProgress = () => {
	const url = '/api/progress'
	const urlLastProgress = '/api/progress/last'

	async function getProgress(
		userId: string,
		instrument: string,
		currentLesson: number,
	) {
		return await $fetch(url, {
			method: 'get',
			params: {
				userId,
				instrument,
				currentLesson,
			},
		})
	}

	async function getLastProgress(userId: string, instrument: Instrument) {
		return await $fetch(urlLastProgress, {
			method: 'get',
			params: { userId, instrument },
		})
	}

	async function postProgress(progress: Progress) {
		return await $fetch(url, {
			method: 'post',
			body: progress,
		})
	}

	async function setProgress(progress: Progress) {
		return await $fetch(url, {
			method: 'put',
			body: progress,
		})
	}
	return { getProgress, getLastProgress, postProgress, setProgress }
}
