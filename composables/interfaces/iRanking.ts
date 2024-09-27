import { type Instrument } from '~/types/Instrument'

const url = '/api/ranking'

export const useIRanking = () => {
	function getRanking(instrument: Instrument) {
		return $fetch(url, {
			method: 'GET',
			params: { instrument: instrument },
		})
	}
	return { getRanking }
}
