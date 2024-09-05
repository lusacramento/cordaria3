import type { Instrument } from '~/types/Instrument'

const statisticsUrl = '/api/statistics'

function getStatistics(userId: string, instrument: Instrument) {
	return $fetch(statisticsUrl, {
		method: 'get',
		params: { userId: userId, instrument: instrument },
	})
}

export const useIStatistics = () => {
	return { getStatistics }
}
