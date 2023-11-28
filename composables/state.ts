import * as Tone from 'tone'

// Attributes
const viewMode = ref('allCards')

const tempo = ref()

const isStart = ref(false)

const counter = ref(5)
const isShowCounter = ref(false)

const deck = ref()

const card = {
	prev: ref(),
	current: ref(),
	next: ref(),
}

const fragment = {
	prev: ref(),
	current: ref(),
	next: ref(),
}

let deckIndex = 0
let fragmentIndex = 0

let toDo = ''

const instrument = ref('bass')
let instrumentMap = ref()
let isLoaded = false

// Methods

function loadDeck(firstFinger: string, viewModeValue: string, bpm: number) {
	initializeDeck(firstFinger)

	initializeCard()

	updateViewMode(viewModeValue)

	getTempo(bpm)

	isStart.value = true

	startLesson()
}

function initializeDeck(firstFinger: string) {
	deck.value = useDeck().getDeck(firstFinger)
}

function initializeCard() {
	card.prev.value = clearCard()
	card.current.value = deck.value[deckIndex]
	card.current.value.setStatus('current')
	card.next.value = deck.value[deckIndex + 1]
}

function clearCard() {
	return { id: 0, value: '', fragments: [] }
}

function updateViewMode(viewModeValue: string) {
	viewMode.value = viewModeValue
}

function getTempo(bpm: number) {
	tempo.value = useMath().convertBpmToMs(bpm)
}

function getInstrument() {
	instrumentMap.value = useAudio().selectInstrument(instrument.value)
}

function getAudios(this: any) {
	const playlist: string[][] = []
	let urls: any = {}
	for (let str = 0; str < instrumentMap.value.length; str++) {
		const frets = instrumentMap.value[str]
		for (let fret = 0; fret < frets.length; fret++) {
			const note: string = frets[fret].note

			playlist.push([note])

			const tablature = frets[fret].tablature
			urls[note] = `${tablature}.mp3`
		}
	}

	const baseUrl = `/audios/${instrument.value}/`

	const sampler = new Tone.Sampler({
		urls,
		baseUrl: baseUrl,
		onload: () => {
			sampler.loaded
		},
	}).toDestination()

	const seq = generateSequence(sampler, playlist)

	seq.loop = false
	Tone.Transport.start()

	Tone.Transport.bpm.value = 40
	//   Tone.Transport.start()
	onchange = (seq: any) => {
		this.$emit('sequence', seq)
	}
	Tone.start()
	Tone.Transport.start()

	seq.start(1000)
}

function generateSequence(sampler: any, notes: string[][]) {
	return new Tone.Sequence((time, note) => {
		sampler.triggerAttackRelease(note, 1000, time)
		// subdivisions are given as subarrays
	}, notes).start(0)
}

function convertBpmToMs(bpm: number) {
	const newTempo = 60000 / bpm
	return newTempo
}

async function startLesson() {
	isStart.value = true

	fragment.current.value = card.current.value.fragments[fragmentIndex]
	fragment.next.value = card.current.value.fragments[fragmentIndex + 1]

	isShowCounter.value = true
	let toDo = 'counter'

	function startPractice() {
		switch (toDo) {
			case 'counter':
				toDo = updateCounter()
				if (toDo === 'play') {
					hideCounter()
					play()
				}
				break
			case 'play':
				play()
				break
			// case 'finish':
			// 	finishPractice()
			// 	break
		}
	}

	const timer = setInterval(startPractice, tempo.value)

	function updateCounter() {
		counter.value--
		if (isFinishCount()) {
			return 'play'
		}

		return 'counter'
	}

	function isFinishCount() {
		return counter.value === 0
	}

	function resetIndex() {
		return 0
	}

	function play() {
		if (isLastCard() && isLastFragment()) {
			fragment.prev.value.setIsHighlight(false)
			finishPractice()
		} else {
			if (isLastFragment()) {
				getNextCard()
				toAnimate()
			} else toAnimate()

			updateValues()
		}
	}

	function isLastCard() {
		return deck.value.length === deckIndex + 1
	}

	function toAnimate() {
		if (fragment.prev.value != undefined) {
			fragment.prev.value.setIsHighlight(false)
		}
		fragment.current.value.setIsHighlight(true)
	}

	function updateValues() {
		fragment.prev.value = fragment.current.value
		fragmentIndex++
		fragment.current.value = card.current.value.fragments[fragmentIndex]
	}

	function isLastFragment() {
		return card.current.value.fragments.length === fragmentIndex
	}

	function getNextCard() {
		card.prev.value = card.current.value
		card.prev.value.setStatus('prev')

		card.current.value = card.next.value
		card.current.value.setStatus('current')

		deckIndex++

		if (deck.value.length > deckIndex + 1)
			card.next.value = deck.value[deckIndex + 1]
		else card.next.value = ''

		fragmentIndex = resetIndex()

		fragment.current.value = card.current.value.fragments[fragmentIndex]
	}

	function hideCounter() {
		isShowCounter.value = !isShowCounter.value
	}

	function finishPractice() {
		clearInterval(timer)
		card.current.value.setStatus('prev')
		card.prev.value = card.current.value
		card.current.value = ''
	}
}

export const useState = () => {
	return {
		viewMode,
		isStart,
		card,
		deck,
		counter,
		isShowCounter,
		loadDeck,
	}
}
