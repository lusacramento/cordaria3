import type { Score } from '~/types/Score'

const url = '/api/scores'

async function getScore(userId: string, instrument: string) {
	return $fetch(url, {
		method: 'get',
		query: { userId, instrument },
	})
}

async function postScore(score: Score) {
	return $fetch(url, {
		body: score,
		method: 'post',
	})
}
export const useIScore = () => {
	return { getScore, postScore }
}
