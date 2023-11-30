export const useUrls = (instrumentName: string) => {
	const urls = [
		{
			name: 'Acoustic Guitar',
			baseUrl: '/audios/acoustic-guitar/',
		},

		{
			name: 'Eletric Guitar',
			baseUrl: '/audios/eletric-guitar/',
		},
		{
			name: 'Bass',
			baseUrl: '/audios/bass/',
		},
		{
			name: 'Cavaco',
			baseUrl: '/audios/cavaco/',
		},
	]

	const getUrl = function (instrumentName: string) {
		urls.forEach((url) => {
			if (instrumentName === url.name) return url.baseUrl
			return 'Url não encontrada!'
		})
	}

	return {
		getUrl,
	}
}
