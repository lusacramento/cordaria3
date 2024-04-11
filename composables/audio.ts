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
	stringIndex: string,
) {
	urls = getMetronomeUrls(urls)
	urls = getInstrumentUrls(urls, instrument, instrumentMap)

	addMetronomeToPlaylist(counter, playlist)

	addInstrumentToPlaylist(deck, playlist, instrumentMap, stringIndex)

	const sampler = new Tone.Sampler({
		urls: urls,
		onload: async () => {
			const sequence = await generateSequence(sampler, tempo).start(0)

			await playAudios(sequence, bpm)
			useController().startLesson(tempo)
		},

		onerror: (error) => {
			console.log('Error loading sample: ', error)
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

	if (Array.isArray(instrumentMap))
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
	stringIndex: string,
) {
	const stringsNumber = instrumentMap.length - 1
	let stringIndexNumber = 0

	switch (stringIndex) {
		case 'bass':
			stringIndexNumber = stringsNumber
			break
		case 'treble':
			stringIndexNumber = 0
			break
		default:
			stringIndexNumber = parseInt(stringIndex)
			break
	}

	deck.forEach((card: Card) => {
		switch (stringIndex) {
			case 'bass':
				addCardToPlaylist(card, stringIndexNumber)
				stringIndexNumber--
				if (stringIndexNumber == 0) stringIndex = 'treble'
				break

			case 'treble':
				addCardToPlaylist(card, stringIndexNumber)
				stringIndexNumber++
				if (stringIndexNumber == stringsNumber - 1) stringIndex = 'bass'
				break
			default:
				addCardToPlaylist(card, stringIndexNumber)
				break
		}
	})

	function addCardToPlaylist(card: Card, str: number) {
		card.fragments.forEach((fragment: any) => {
			const fret = fragment.value
			const note = instrumentMap[str][parseInt(fret)].note

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
