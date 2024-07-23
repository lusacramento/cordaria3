import type { Progress } from '~/types/Progress'

export const useIProgress = () => {
	const url = '/api/progress/'

	async function getProgress(userId: string) {
		return await useFetch(url, {
			method: 'get',
			params: { userId: userId },
		})
	}

	async function postProgress(progress: Progress) {
		return await useFetch(url, {
			method: 'post',
			body: progress,
		})
	}
	return { getProgress, postProgress }
}
