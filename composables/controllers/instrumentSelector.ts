import disabledLightAcousticGuitar from '~/assets/imgs/instruments/index/light/disabled/acoustic-guitar.png'
import enabledLightAcousticGuitar from '~/assets/imgs/instruments/index/light/enabled/acoustic-guitar.png'
import disabledLightElectricGuitar from '~/assets/imgs/instruments/index/light/disabled/electric-guitar.png'
import enabledLightElectricGuitar from '~/assets/imgs/instruments/index/light/enabled/electric-guitar.png'
import disabledLightBass from '~/assets/imgs/instruments/index/light/disabled/bass.png'
import enabledLightBass from '~/assets/imgs/instruments/index/light/enabled/bass.png'
import disabledLightCavaco from '~/assets/imgs/instruments/index/light/disabled/cavaco.png'
import enabledLightCavaco from '~/assets/imgs/instruments/index/light/enabled/cavaco.png'

import disabledDarkAcousticGuitar from '~/assets/imgs/instruments/index/dark/disabled/acoustic-guitar.png'
import enebledDarkAcousticGuitar from '~/assets/imgs/instruments/index/dark/enabled/acoustic-guitar.png'
import disabledDarkElectricGuitar from '~/assets/imgs/instruments/index/dark/disabled/electric-guitar.png'
import enabledDarkElectricGuitar from '~/assets/imgs/instruments/index/dark/enabled/electric-guitar.png'
import disabledDarkBass from '~/assets/imgs/instruments/index/dark/disabled/bass.png'
import enabledDarkBass from '~/assets/imgs/instruments/index/dark/enabled/bass.png'
import disabledDarkCavaco from '~/assets/imgs/instruments/index/dark/disabled/cavaco.png'
import enabledDarkCavaco from '~/assets/imgs/instruments/index/dark/enabled/cavaco.png'
import { Instrument } from '~/types/Instrument'

export const useInstrumentSelector = () => {
	const instruments = ref({
		acousticGuitar: {
			id: Instrument.ACOUSTICGUITAR,
			url: disabledDarkAcousticGuitar,
		},
		electricGuitar: {
			id: Instrument.ELECTRICGUITAR,
			url: disabledDarkElectricGuitar,
		},

		bass: {
			id: Instrument.BASS,
			url: disabledDarkBass,
		},
		cavaco: {
			id: Instrument.CAVACO,
			url: disabledDarkCavaco,
		},
	})

	const { value } = toRefs(useColorMode())

	watch(value, (newValue) => {
		updateThemeImages()
		updateActiveInstrumentImage(instrument.value)
	})

	const { instrument } = storeToRefs(useMySettingsStore())

	watch(instrument, () => {
		updateThemeImages()
		updateActiveInstrumentImage(instrument.value)
	})

	function updateThemeImages() {
		switch (value.value) {
			case 'dark':
				instruments.value.acousticGuitar.url = disabledDarkAcousticGuitar
				instruments.value.electricGuitar.url = disabledDarkElectricGuitar
				instruments.value.bass.url = disabledDarkBass
				instruments.value.cavaco.url = disabledDarkCavaco

				break
			case 'light':
				instruments.value.acousticGuitar.url = disabledLightAcousticGuitar
				instruments.value.electricGuitar.url = disabledLightElectricGuitar
				instruments.value.bass.url = disabledLightBass
				instruments.value.cavaco.url = disabledLightCavaco

				break
		}
	}

	function updateActiveInstrumentImage(instrument: Instrument) {
		switch (instrument) {
			case Instrument.ACOUSTICGUITAR:
				instruments.value.acousticGuitar.url =
					value.value === 'dark'
						? enebledDarkAcousticGuitar
						: enabledLightAcousticGuitar
				instruments.value.acousticGuitar.url = enebledDarkAcousticGuitar
				break
			case Instrument.ELECTRICGUITAR:
				instruments.value.electricGuitar.url =
					value.value === 'dark'
						? enabledDarkElectricGuitar
						: enabledLightElectricGuitar

				break
			case Instrument.BASS:
				instruments.value.bass.url =
					value.value === 'dark' ? enabledDarkBass : enabledLightBass

				break
			case Instrument.CAVACO:
				instruments.value.cavaco.url =
					value.value === 'dark' ? enabledDarkCavaco : enabledLightCavaco

				break

			default:
				break
		}
	}

	function joinGame(instrument: Instrument) {
		console.log(instrument)
	}

	function mouseHover(newInstrument: Instrument) {}

	// function mouseLeave() {
	// 	updateActiveInstrumentImage(instrument.value)
	// }

	return {
		instruments,
		updateThemeImages,
		updateActiveInstrumentImage,
		joinGame,
		mouseHover,
		// mouseLeave,
	}
}
