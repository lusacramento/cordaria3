export const useGuitar = () => {
	const acoustGuitarHead = {
		name: 'Acoustic Guitar',
		stringsNumber: 6,
	}

	const eletricGuitarHead = {
		name: 'Eletric Guitar',
		stringsNumber: 6,
	}
	const map = [
		[
			{
				note: 'E4',
				enharmony: 'null',
				tablature: '10',
			},
			{
				note: 'F4',
				enharmony: 'null',
				tablature: '11',
			},
			{
				note: 'F#4',
				enharmony: 'Gb4',
				tablature: '12',
			},
			{
				note: 'G4',
				enharmony: 'null',
				tablature: '13',
			},
			{
				note: 'G#4',
				enharmony: 'Ab4',
				tablature: '14',
			},
		],
		[
			{
				note: 'B3',
				enharmony: 'null',
				tablature: '20',
			},
			{
				note: 'C4',
				enharmony: 'null',
				tablature: '21',
			},
			{
				note: 'C#4',
				enharmony: 'Db4',
				tablature: '22',
			},
			{
				note: 'D4',
				enharmony: 'null',
				tablature: '23',
			},
			{
				note: 'D#4',
				enharmony: 'Eb4',
				tablature: '24',
			},
		],
		[
			{
				note: 'G3',
				enharmony: 'null',
				tablature: '30',
			},
			{
				note: 'G#3',
				enharmony: 'Ab3',
				tablature: '31',
			},
			{
				note: 'A3',
				enharmony: 'null',
				tablature: '32',
			},
			{
				note: 'A#3',
				enharmony: 'Bb3',
				tablature: '33',
			},
			{
				note: 'B3',
				enharmony: 'null',
				tablature: '34',
			},
		],
		[
			{
				note: 'D3',
				enharmony: 'null',
				tablature: '40',
			},
			{
				note: 'D#3',
				enharmony: 'Eb3',
				tablature: '41',
			},
			{
				note: 'E3',
				enharmony: 'null',
				tablature: '42',
			},
			{
				note: 'F3',
				enharmony: 'null',
				tablature: '43',
			},
			{
				note: 'F#3',
				enharmony: 'Gb3',
				tablature: '44',
			},
		],
		[
			{
				note: 'A2',
				enharmony: 'null',
				tablature: '50',
			},
			{
				note: 'A#2',
				enharmony: 'Bb2',
				tablature: '51',
			},
			{
				note: 'B2',
				enharmony: 'null',
				tablature: '52',
			},
			{
				note: 'C3',
				enharmony: 'null',
				tablature: '53',
			},
			{
				note: 'C#3',
				enharmony: 'Db3',
				tablature: '54',
			},
		],
		[
			{
				note: 'E2',
				enharmony: 'null',
				tablature: '60',
			},
			{
				note: 'F2',
				enharmony: 'null',
				tablature: '61',
			},
			{
				note: 'F#2',
				enharmony: 'Gb2',
				tablature: '62',
			},
			{
				note: 'G2',
				enharmony: 'null',
				tablature: '63',
			},
			{
				note: 'G#2',
				enharmony: 'Ab2',
				tablature: '64',
			},
		],
	]

	const getMap = () => map

	// const getHead = () => guitar

	return {
		getMap,
	}
}
