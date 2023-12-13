const settings = {
	instruments: {
		acousticGuitar: {
			name: 'acoustic-guitar',
			label: 'Violão',
			strings: [
				{
					string: 1,
					label: 'Corda 1 (Mi4)',
				},
				{
					string: 2,
					label: 'Corda 2 (Si3)',
				},
				{
					string: 3,
					label: 'Corda 3 (Sol3)',
				},
				{
					string: 4,
					label: 'Corda 4 (Ré3)',
				},
				{
					string: 5,
					label: 'Corda 5 (Lá2)',
				},
				{
					string: 6,
					label: 'Corda 6 (E2)',
				},
				{
					string: 'fromBassToTreble',
					label: 'Todas (ínicio corda 6)',
				},
				{
					string: 'fromTrebleToBass',
					label: 'Todas (início corda 1',
				},
			],
		},

		electricGuitar: {
			name: 'eletric-guitar',
			label: 'Guitarra',
			strings: [
				{
					string: 1,
					label: 'Corda 1 (Mi4)',
				},
				{
					string: 2,
					label: 'Corda 2 (Si3)',
				},
				{
					string: 3,
					label: 'Corda 3 (Sol3)',
				},
				{
					string: 4,
					label: 'Corda 4 (Ré3)',
				},
				{
					string: 5,
					label: 'Corda 5 (Lá2)',
				},
				{
					string: 6,
					label: 'Corda 6 (E2)',
				},
				{
					string: 'fromBassToTreble',
					label: 'Todas (ínicio corda 6)',
				},
				{
					string: 'fromTrebleToBass',
					label: 'Todas (início corda 1',
				},
			],
		},

		cavaco: {
			name: 'cavaco',
			label: 'Cavaquinho',
			strings: [
				{
					string: 1,
					label: 'Corda 1 (Ré5)',
				},
				{
					string: 2,
					label: 'Corda 2 (Si4)',
				},
				{
					string: 3,
					label: 'Corda 3 (Sol4)',
				},
				{
					string: 4,
					label: 'Corda 4 (Ré4)',
				},
				{
					string: 'fromBassToTreble',
					label: 'Todas (início corda 4)',
				},
				{
					string: 'fromTrebleToBass',
					label: 'Todas (início corda 1)',
				},
			],
		},

		bass: {
			name: 'bass',
			label: 'Baixo',
			strings: [
				{
					string: 1,
					label: 'Corda 1 (Sol2)',
				},
				{
					string: 2,
					label: 'Corda 2 (Ré2)',
				},
				{
					string: 3,
					label: 'Corda 3 (Lá1)',
				},
				{
					string: 4,
					label: 'Corda 4 (Mi1)',
				},
				{
					string: 'fromBassToTreble',
					label: 'Todas (início corda 4)',
				},
				{
					string: 'fromTrebleToBass',
					label: 'Todas (início corda 1)',
				},
			],
		},
	},

	fingers: [
		{ finger: '0' },
		{ finger: '1' },
		{ finger: '2' },
		{ finger: '3' },
		{ finger: '4' },
		{ finger: 'P' },
	],

	viewMode: [
		{ label: '3 cartas', value: '3Cards' },
		{ label: 'Todas as cartas', value: 'allCards' },
	],
}

const getInstruments = () => settings.instruments
const getFingers = () => settings.fingers

export const useSettings = () => {
	return { getInstruments, getFingers }
}
