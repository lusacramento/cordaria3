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

	function getQuantityOfStrings(instrument: Instrument) {
		switch (true) {
			case instrument === Instrument.ACOUSTICGUITAR ||
				instrument === Instrument.ELECTRICGUITAR:
				return 6
			case instrument === Instrument.BASS || instrument === Instrument.CAVACO:
				return 4
		}
	}

	function getFileExtension(name: string) {
		return name.split('.')[1]
	}

	function convertInstrumentEnumToString(instrument: Instrument) {
		switch (instrument) {
			case Instrument.ACOUSTICGUITAR:
				return 'acoustic-guitar'
			case Instrument.ELECTRICGUITAR:
				return 'electric-guitar'

			case Instrument.BASS:
				return 'bass'
			case Instrument.CAVACO:
				return 'cavaco'

			case Instrument.NOT_SELECTED:
				throw createError('Instrumento não selecionado.')

			default:
				throw createError('Instrumento não encontrado.')
		}
	}

	return {
		translate,
		getQuantityOfStrings,
		getFileExtension,
		convertInstrumentEnumToString,
	}
}
