export const useCavaco = () => {
	const cavacoHead = {
		name: 'Cavaco',
		stringsNumber: 4,
	}

	const map = [
		[
			{
				note: 'D5',
				enharmony: 'null',
				tablature: '10',
			},
			{
				note: 'D#5',
				enharmony: 'Eb5',
				tablature: '11',
			},
			{
				note: 'E5',
				enharmony: 'null',
				tablature: '12',
			},
			{
				note: 'F5',
				enharmony: 'null',
				tablature: '13',
			},
			{
				note: 'F#5',
				enharmony: 'Gb5',
				tablature: '14',
			},
		],
		[
			{
				note: 'B4',
				enharmony: 'null',
				tablature: '20',
			},
			{
				note: 'C5',
				enharmony: 'null',
				tablature: '21',
			},
			{
				note: 'C#5',
				enharmony: 'Db5',
				tablature: '22',
			},
			{
				note: 'D5',
				enharmony: 'null',
				tablature: '23',
			},
			{
				note: 'D#5',
				enharmony: 'Eb5',
				tablature: '24',
			},
		],
		[
			{
				note: 'G4',
				enharmony: 'null',
				tablature: '30',
			},
			{
				note: 'G#4',
				enharmony: 'Ab4',
				tablature: '31',
			},
			{
				note: 'A4',
				enharmony: 'null',
				tablature: '32',
			},
			{
				note: 'A#4',
				enharmony: 'Bb4',
				tablature: '33',
			},
			{
				note: 'B4',
				enharmony: 'null',
				tablature: '34',
			},
		],
		[
			{
				note: 'D4',
				enharmony: 'null',
				tablature: '40',
			},
			{
				note: 'D#4',
				enharmony: 'Eb4',
				tablature: '41',
			},
			{
				note: 'E4',
				enharmony: 'null',
				tablature: '42',
			},
			{
				note: 'F4',
				enharmony: 'null',
				tablature: '43',
			},
			{
				note: 'F#4',
				enharmony: 'Gb4',
				tablature: '44',
			},
		],
	]

	const getMap = () => map

	const getHead = () => cavacoHead

	return { getMap, getHead }
}
