import { Instrument } from '~/types/Instrument'

export const useHelpers = () => {
	function translate(direction: string | number) {
		switch (direction) {
			case 'downToUp':
				return 'Todas (início do grave)'
			case 'upToDown':
				return 'Todas (ínicio do agudo)'

			default:
				return direction
		}
	}

	function getQuantityOfStrings(instrument: string) {
		switch (true) {
			case instrument === 'acoustic-guitar' || instrument === 'electric-guitar':
				return 6
			case instrument === 'bass' || instrument === 'cavaco':
				return 4
		}
	}

	function getInstrumentEnum(instrument: string) {
		switch (instrument) {
			case 'acoustic-guitar':
				return Instrument.ACOUSTICGUITAR
			case 'electric-guitar':
				return Instrument.ELECTRICGUITAR
			case 'bass':
				return Instrument.BASS
			case 'cavaco':
				return Instrument.CAVACO
		}
	}

	return {
		translate,
		getQuantityOfStrings,
		getInstrumentEnum,
	}
}
