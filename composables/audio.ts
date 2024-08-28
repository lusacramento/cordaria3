import * as Tone from 'tone'
import type { Card } from './model/card'
import { Instrument } from '~/types/Instrument'

let urls: any = {}
const playlist: string[] = []

const adjustSync = 1.1 // <-- ajust here the release duration for legattos notes

let sampler: Tone.Sampler
let sequence: Tone.Sequence

function getInstrumentMapping(instrument: Instrument) {
	let instrumentMap = {}
	switch (true) {
		case instrument === Instrument.ACOUSTICGUITAR ||
			instrument === Instrument.ELECTRICGUITAR:
			instrumentMap = useGuitar().getMap()
			break
		case instrument === Instrument.CAVACO:
			instrumentMap = useCavaco().getMap()
			break
		case instrument === Instrument.BASS:
			instrumentMap = useBass().getMap()
			break
		default:
			break
	}
	return instrumentMap
}

async function getAudios(
	counter: number,
	instrument: Instrument,
	instrumentMap: {},
	deck: Card[],
	bpm: number,
	tempo: number,
) {
	urls = getMetronomeUrls(urls)
	urls = getInstrumentUrls(urls, instrument, instrumentMap)

	addMetronomeToPlaylist(counter, playlist)

	addInstrumentToPlaylist(deck, playlist, instrumentMap)
	if (sampler) {
		await stopAudios()
	}

	sampler = await new Tone.Sampler({
		urls: urls,
		onload: async () => {
			sequence = await generateSequence(sampler, tempo).start(0)

			await playAudios(bpm)
			useController().startLesson(tempo)
		},

		onerror: (error) => {
			new Error('Error loading sample: ', error)
		},
	})
	sampler.toDestination()
}

function getMetronomeUrls(urls: any) {
	const baseUrl = useUrls().getUrl('metronome')

	urls['C1'] = `${baseUrl}high.mp3`
	urls['C0'] = `${baseUrl}low.mp3`

	return urls
}

function getInstrumentUrls(
	urls: any,
	instrument: Instrument,
	instrumentMap: {},
) {
	const baseUrl = useUrls().getUrl(
		useHelpers().convertInstrumentEnumToString(instrument),
	)

	if (!Array.isArray(instrumentMap)) {
		new Error('instrumentMap  is not an array')
	} else
		instrumentMap.forEach((str: any[]) => {
			str.forEach((fret) => {
				urls[fret.note] = `${baseUrl}${fret.tablature}.mp3`
			})
		})

	return urls
}

function addMetronomeToPlaylist(counter: number, playlist: any[]) {
	playlist.push(['C1'])
	for (let index = 2; index <= counter; index++) playlist.push(['C0'])
}

function addInstrumentToPlaylist(
	deck: Card[],
	playlist: any[],
	instrumentMap: any,
) {
	deck.forEach((card: Card) => {
		addCardToPlaylist(card, parseInt(card.str))
	})

	function addCardToPlaylist(card: Card, str: number) {
		card.fragments.forEach((fragment: any) => {
			const fret = fragment.value
			const strIndex = str - 1
			const note = instrumentMap[strIndex][parseInt(fret)].note

			playlist.push([note])
		})
	}

	return playlist
}

function generateSequence(sampler: Tone.Sampler, tempo: number) {
	return new Tone.Sequence((time, note) => {
		sampler.triggerAttackRelease(note, calculateRelease(tempo), time)
	}, playlist)
}

function playAudios(bpm: number) {
	sequence.loop = false
	sequence.now()
	Tone.getTransport().bpm.value = bpm / 2
	Tone.start()
	Tone.getTransport().start()
}

async function stopAudios() {
	if (Tone.getContext().state === 'running' && sampler) {
		await sampler.dispose()
		await sequence.stop
		await Tone.getTransport().cancel()
	}
}

function calculateRelease(tempo: number) {
	return (tempo * adjustSync) / 1000
}

export const useAudio = () => {
	return {
		getInstrumentMapping,
		getAudios,
		sampler,
		sequence,
		Tone,
		stopAudios,
	}
}
