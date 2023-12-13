import * as Tone from 'tone'

let urls: any = {}
const playlist: string[] = []

const adjustSync = 1.1 // <-- ajust here the release duration for legattos notes

const selectInstrument = function (instrument: string) {
	let instrumentMap = {}
	switch (instrument) {
		case 'acoustic-guitar':
			instrumentMap = useGuitar().getMap()
			break
		case 'eletric-guitar':
			instrumentMap = useGuitar().getMap()
			break
		case 'cavaco':
			instrumentMap = useCavaco().getMap()
			break
		case 'bass':
			instrumentMap = useBass().getMap()
			break
		default:
			break
	}
	return instrumentMap
}

const getAudios = function (
	counter: number,
	instrument: string,
	instrumentMap: [],
	deck: [],
	bpm: number,
	tempo: number,
) {
	urls = getMetronomeUrls(urls)
	urls = getInstrumentUrls(urls, instrument, instrumentMap)

	addMetronomeToPlaylist(counter, playlist)

	addInstrumentToPlaylist(deck, playlist, instrumentMap)

	const sampler = new Tone.Sampler({
		urls: urls,
		onload: async () => {
			const sequence = await generateSequence(sampler, tempo).start(0)

			await playAudios(sequence, bpm)
			useState().startLesson()
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

function getInstrumentUrls(urls: any, instrument: string, instrumentMap: []) {
	const baseUrl = useUrls().getUrl(instrument)

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
	deck: [],
	playlist: any[],
	instrumentMap: any,
) {
	deck.forEach((card: any) => {
		const str = '1'
		card.fragments.forEach((fragment: any) => {
			const fret = fragment.value
			const note = instrumentMap[str][fret].note

			playlist.push([note])
		})
	})

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
		selectInstrument,
		getAudios,
	}
}
