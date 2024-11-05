import disabledLightAcousticGuitar from '~/assets/imgs/instruments/index/light/disabled/acoustic-guitar.png'
import enabledLightAcousticGuitar from '~/assets/imgs/instruments/index/light/enabled/acoustic-guitar.png'
import disabledLightElectricGuitar from '~/assets/imgs/instruments/index/light/disabled/electric-guitar.png'
import enabledLightElectricGuitar from '~/assets/imgs/instruments/index/light/enabled/electric-guitar.png'
import disabledLightBass from '~/assets/imgs/instruments/index/light/disabled/bass.png'
import enabledLightBass from '~/assets/imgs/instruments/index/light/enabled/bass.png'
import disabledLightCavaco from '~/assets/imgs/instruments/index/light/disabled/cavaco.png'
import enabledLightCavaco from '~/assets/imgs/instruments/index/light/enabled/cavaco.png'

import disabledDarkAcousticGuitar from '~/assets/imgs/instruments/index/dark/disabled/acoustic-guitar.png'
import enabledDarkAcousticGuitar from '~/assets/imgs/instruments/index/dark/enabled/acoustic-guitar.png'
import disabledDarkElectricGuitar from '~/assets/imgs/instruments/index/dark/disabled/electric-guitar.png'
import enabledDarkElectricGuitar from '~/assets/imgs/instruments/index/dark/enabled/electric-guitar.png'
import disabledDarkBass from '~/assets/imgs/instruments/index/dark/disabled/bass.png'
import enabledDarkBass from '~/assets/imgs/instruments/index/dark/enabled/bass.png'
import disabledDarkCavaco from '~/assets/imgs/instruments/index/dark/disabled/cavaco.png'
import enabledDarkCavaco from '~/assets/imgs/instruments/index/dark/enabled/cavaco.png'
import { Instrument } from '~/types/Instrument'

export const useInstrumentSelector = () => {
	const { value } = toRefs(useColorMode())
	const { instrument } = storeToRefs(useMySettingsStore())
	const isMobile = ref(verifyIsMobile())

	const instruments = ref({
		acousticGuitar: {
			id: Instrument.ACOUSTICGUITAR,
			url:
				value.value === 'dark'
					? disabledDarkAcousticGuitar
					: disabledLightAcousticGuitar,
		},
		electricGuitar: {
			id: Instrument.ELECTRICGUITAR,
			url:
				value.value === 'dark'
					? disabledDarkElectricGuitar
					: disabledLightElectricGuitar,
		},

		bass: {
			id: Instrument.BASS,
			url: value.value === 'dark' ? disabledDarkBass : disabledLightBass,
		},
		cavaco: {
			id: Instrument.CAVACO,
			url: value.value === 'dark' ? disabledDarkCavaco : disabledLightCavaco,
		},
	})

	highlightInstrument(instrument.value)

	watch(value, (newValue) => {
		removeHighlightOfAllInstruments()
		updateActiveInstrumentImage(instrument.value)
	})

	watch(instrument, () => {
		removeHighlightOfAllInstruments()
		updateActiveInstrumentImage(instrument.value)
	})

	function removeHighlightOfAllInstruments() {
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
						? enabledDarkAcousticGuitar
						: enabledLightAcousticGuitar
				instruments.value.acousticGuitar.url = enabledDarkAcousticGuitar
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

	function highlightInstrument(instrument: Instrument) {
		switch (value.value) {
			case 'dark':
				if (instruments.value.acousticGuitar.id == instrument)
					instruments.value.acousticGuitar.url = enabledDarkAcousticGuitar
				if (instruments.value.electricGuitar.id == instrument)
					instruments.value.electricGuitar.url = enabledDarkElectricGuitar
				if (instruments.value.bass.id == instrument)
					instruments.value.bass.url = enabledDarkBass
				if (instruments.value.cavaco.id == instrument)
					instruments.value.cavaco.url = enabledDarkCavaco
				break
			case 'light':
				if (instruments.value.acousticGuitar.id == instrument)
					instruments.value.acousticGuitar.url = enabledLightAcousticGuitar
				if (instruments.value.electricGuitar.id == instrument)
					instruments.value.electricGuitar.url = enabledLightElectricGuitar
				if (instruments.value.bass.id == instrument)
					instruments.value.bass.url = enabledLightBass
				if (instruments.value.cavaco.id == instrument)
					instruments.value.cavaco.url = enabledLightCavaco
				break

			default:
				break
		}
	}

	function joinGame(instrument: Instrument) {
		loadInstrument(instrument)
	}

	function mouseHover(newInstrument: Instrument) {
		removeHighlightOfAllInstruments()
		highlightInstrument(newInstrument)
	}

	function mouseLeave() {
		removeHighlightOfAllInstruments()
		updateActiveInstrumentImage(instrument.value)
	}

	async function loadInstrument(instrument: Instrument) {
		if (
			useMySettingsStore().getInstrument !== instrument &&
			useMyUserStore().getId
		) {
			await useMySettingsStore().setInstrument(instrument)
			await useMySettingsStore().update()
		} else {
			await useMySettingsStore().setInstrument(instrument)
		}

		redirectToPracticePage()
	}

	function redirectToPracticePage() {
		useRouter().push('/entrar')
	}

	function verifyIsMobile() {
		if (
			navigator.userAgent.match(/iPhone/i) ||
			navigator.userAgent.match(/iPad/i) ||
			navigator.userAgent.match(/Android/i)
		) {
			setADefaultInstrumentWhenNotLoggedAndIsMobile()
			return true
		}
		return false
	}

	function setADefaultInstrumentWhenNotLoggedAndIsMobile() {
		instrument.value = Instrument.ACOUSTICGUITAR
	}

	return {
		instruments,
		updateThemeImages: removeHighlightOfAllInstruments,
		updateActiveInstrumentImage,
		joinGame,
		mouseHover,
		mouseLeave,
		isMobile,
	}
}
