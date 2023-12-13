export const useUrls = () => {
	const urls = [
		{
			name: 'metronome',
			baseUrl: '/audios/metronome/',
		},
		{
			name: 'acoustic-guitar',
			baseUrl: '/audios/acoustic-guitar/',
		},

		{
			name: 'eletric-guitar',
			baseUrl: '/audios/eletric-guitar/',
		},
		{
			name: 'bass',
			baseUrl: '/audios/bass/',
		},
		{
			name: 'cavaco',
			baseUrl: '/audios/cavaco/',
		},
	]

	const getUrl = function (instrumentName: string) {
		let url: string = ''
		urls.forEach((object) => {
			if (instrumentName === object.name) url = object.baseUrl
		})

		if (url !== '') return url
		else return 'Url não encontrada!'
	}

	return {
		getUrl,
	}
}
