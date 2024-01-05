export const useBass = () => {
	const map = [
		[
			{
				note: 'G2',
				enharmony: 'null',
				tablature: '10',
			},
			{
				note: 'G#2',
				enharmony: 'Ab2',
				tablature: '11',
			},
			{
				note: 'A2',
				enharmony: 'null',
				tablature: '12',
			},
			{
				note: 'A#2',
				enharmony: 'Bb2',
				tablature: '13',
			},
			{
				note: 'B2',
				enharmony: 'null',
				tablature: '14',
			},
		],
		[
			{
				note: 'D2',
				enharmony: 'null',
				tablature: '20',
			},
			{
				note: 'D#2',
				enharmony: 'Eb2',
				tablature: '21',
			},
			{
				note: 'E2',
				enharmony: 'null',
				tablature: '22',
			},
			{
				note: 'F2',
				enharmony: 'null',
				tablature: '23',
			},
			{
				note: 'F#2',
				enharmony: 'Gb2',
				tablature: '24',
			},
		],
		[
			{
				note: 'A1',
				enharmony: 'null',
				tablature: '30',
			},
			{
				note: 'A#1',
				enharmony: 'Bb1',
				tablature: '31',
			},
			{
				note: 'B1',
				enharmony: 'null',
				tablature: '32',
			},
			{
				note: 'C2',
				enharmony: 'null',
				tablature: '33',
			},
			{
				note: 'C#2',
				enharmony: 'Db2',
				tablature: '34',
			},
		],
		[
			{
				note: 'E1',
				enharmony: 'null',
				tablature: '40',
			},
			{
				note: 'F1',
				enharmony: 'null',
				tablature: '41',
			},
			{
				note: 'F#1',
				enharmony: 'Gb1',
				tablature: '42',
			},
			{
				note: 'G1',
				enharmony: 'null',
				tablature: '43',
			},
			{
				note: 'G#1',
				enharmony: 'Ab1',
				tablature: '44',
			},
		],
	]

	const getMap = () => map

	return {
		getMap,
	}
}
