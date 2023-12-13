export const useMetronome = () => {
	const metronomeHead = {
		name: 'Metronome',
		baseUrl: '/audios/metronome/',
		stringsNumber: 0,
	}
	const map = [
		{
			note: 'C1',
			enharmony: 'null',
			tablature: 'metronome-high-bip',
		},
		{
			note: 'C0',
			enharmony: 'null',
			tablature: 'metronome-low-bip',
		},
	]

	const getMap = () => map

	const getHead = () => metronomeHead

	return { getMap, getHead }
}
