export const useMetronome = () => {
	const metronomeHead = {
		name: 'Metronome',
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

	return { getMap }
}
