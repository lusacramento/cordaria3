const settings = {
	instruments: [
		{
			name: 'acoustic-guitar',
			label: 'Violão',
			strings: [
				{
					stringIndex: '0',
					label: 'Corda 1 (Mi4)',
				},
				{
					stringIndex: '1',
					label: 'Corda 2 (Si3)',
				},
				{
					stringIndex: '2',
					label: 'Corda 3 (Sol3)',
				},
				{
					stringIndex: '3',
					label: 'Corda 4 (Ré3)',
				},
				{
					stringIndex: '4',
					label: 'Corda 5 (Lá2)',
				},
				{
					stringIndex: '5',
					label: 'Corda 6 (E2)',
				},
				{
					stringIndex: 'bass',
					label: 'Todas (ínicio grave)',
				},
				{
					stringIndex: 'treble',
					label: 'Todas (início agudo)',
				},
			],
		},

		{
			name: 'eletric-guitar',
			label: 'Guitarra',
			strings: [
				{
					stringIndex: '0',
					label: 'Corda 1 (Mi4)',
				},
				{
					stringIndex: '1',
					label: 'Corda 2 (Si3)',
				},
				{
					stringIndex: '2',
					label: 'Corda 3 (Sol3)',
				},
				{
					stringIndex: '3',
					label: 'Corda 4 (Ré3)',
				},
				{
					stringIndex: '4',
					label: 'Corda 5 (Lá2)',
				},
				{
					stringIndex: '5',
					label: 'Corda 6 (E2)',
				},
				{
					stringIndex: 'bass',
					label: 'Todas (ínicio grave)',
				},
				{
					stringIndex: 'treble',
					label: 'Todas (início agudo)',
				},
			],
		},

		{
			name: 'cavaco',
			label: 'Cavaquinho',
			strings: [
				{
					stringIndex: '0',
					label: 'Corda 1 (Ré5)',
				},
				{
					stringIndex: '1',
					label: 'Corda 2 (Si4)',
				},
				{
					stringIndex: '2',
					label: 'Corda 3 (Sol4)',
				},
				{
					stringIndex: '3',
					label: 'Corda 4 (Ré4)',
				},
				{
					stringIndex: 'bass',
					label: 'Todas (início grave)',
				},
				{
					stringIndex: 'treble',
					label: 'Todas (início agudo)',
				},
			],
		},

		{
			name: 'bass',
			label: 'Baixo',
			strings: [
				{
					stringIndex: '0',
					label: 'Corda 1 (Sol2)',
				},
				{
					stringIndex: '1',
					label: 'Corda 2 (Ré2)',
				},
				{
					stringIndex: '2',
					label: 'Corda 3 (Lá1)',
				},
				{
					stringIndex: '3',
					label: 'Corda 4 (Mi1)',
				},
				{
					stringIndex: 'bass',
					label: 'Todas (início grave)',
				},
				{
					stringIndex: 'treble',
					label: 'Todas (início agudo)',
				},
			],
		},
	],

	fingers: [
		{ finger: '0' },
		{ finger: '1' },
		{ finger: '2' },
		{ finger: '3' },
		{ finger: '4' },
		// { finger: 'P' },
	],

	viewModes: [
		{ label: '3 cartas', value: '3Cards' },
		{ label: 'Todas as cartas', value: 'allCards' },
	],
}

const getInstruments = () => settings.instruments
const getFingers = () => settings.fingers
const getViewModes = () => settings.viewModes

export const useSettings = () => {
	return { getInstruments, getFingers, getViewModes }
}
