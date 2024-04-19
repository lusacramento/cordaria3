import * as Tone from 'tone'
import type { Card } from './model/card'

let urls: any = {}
const playlist: string[] = []

const adjustSync = 1.1 // <-- ajust here the release duration for legattos notes

function getInstrumentMapping(instrument: string) {
	let instrumentMap = {}
	switch (true) {
		case instrument === 'acoustic-guitar' || instrument === 'eletric-guitar':
			instrumentMap = useGuitar().getMap()
			break
		case instrument === 'cavaco':
			instrumentMap = useCavaco().getMap()
			break
		case instrument === 'bass':
			instrumentMap = useBass().getMap()
			break
		default:
			break
	}
	return instrumentMap
}

function getAudios(
	counter: number,
	instrument: string,
	instrumentMap: {},
	deck: Card[],
	bpm: number,
	tempo: number,
	str: string,
) {
	urls = getMetronomeUrls(urls)
	urls = getInstrumentUrls(urls, instrument, instrumentMap)

	addMetronomeToPlaylist(counter, playlist)

	addInstrumentToPlaylist(deck, playlist, instrumentMap, str)

	const sampler = new Tone.Sampler({
		urls: urls,
		onload: async () => {
			const sequence = await generateSequence(sampler, tempo).start(0)

			await playAudios(sequence, bpm)
			useController().startLesson(tempo)
		},

		onerror: (error) => {
			new Error('Error loading sample: ', error)
		},
	}).toDestination()
}

function getMetronomeUrls(urls: any) {
	const baseUrl = useUrls().getUrl('metronome')

	urls['C1'] = `${baseUrl}high.mp3`
	urls['C0'] = `${baseUrl}low.mp3`

	return urls
}

function getInstrumentUrls(urls: any, instrument: string, instrumentMap: {}) {
	const baseUrl = useUrls().getUrl(instrument)

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
	str: string,
) {
	const stringsNumber = instrumentMap.length
	let strNumber = 0

	switch (str) {
		case 'downToUp':
			strNumber = stringsNumber
			break
		case 'upToDown':
			strNumber = 1
			break
		default:
			strNumber = parseInt(str)
			break
	}

	deck.forEach((card: Card) => {
		switch (str) {
			case 'downToUp':
				addCardToPlaylist(card, strNumber)
				strNumber--
				if (strNumber == 1) str = 'upToDown'
				break

			case 'upToDown':
				addCardToPlaylist(card, strNumber)
				strNumber++
				if (strNumber == stringsNumber) str = 'downToUp'
				break
			default:
				addCardToPlaylist(card, strNumber)
				break
		}
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

function playAudios(sequence: Tone.Sequence, bpm: number) {
	sequence.loop = false
	Tone.Transport.bpm.value = bpm / 2
	Tone.start()
	Tone.Transport.start()
}

function calculateRelease(tempo: number) {
	return (tempo * adjustSync) / 1000
}

export const useAudio = () => {
	return {
		getInstrumentMapping,
		getAudios,
	}
}
