export const useMetronome = () => {
	const metronome = [
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

	const getMetronome = () => metronome

	return { getMetronome }
}
