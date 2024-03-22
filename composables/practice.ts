import * as Tone from 'tone'

// Attributes

// views
const instrument = ref()
const firstFinger = ref()
const str = ref()
const bpm = ref(0)

// data
const deck = ref()

const cards = {
	prev: ref(),
	current: ref(),
	next: ref(),
}

const fragment = {
	prev: ref(),
	current: ref(),
	next: ref(),
}

// indexes
let deckIndex = 0
let fragmentIndex = 0

// auxialiaries
const tempo = ref()
const isStart = ref(false)

const counter = ref(5)
const isShowCounter = ref(false)

let instrumentMap = ref()

// Methods

function payLoad(
	instrument2: string,
	firstFinger2: string,
	str2: string,
	bpm2: number,
) {
	instrument.value = instrument2
	firstFinger.value = firstFinger2
	str.value = str2
	bpm.value = bpm2

	initializeDeck(firstFinger.value)

	initializeCard()

	// updateViewMode(viewMode.value)

	getTempo(bpm.value)

	getInstrumentMap(instrument.value)

	useAudio().getAudios(
		counter.value,
		instrument.value,
		instrumentMap.value,
		deck.value,
		bpm.value,
		tempo.value,
		str.value,
	)
}

function initializeDeck(firstFinger: string) {
	deck.value = useDeck().getDeck(firstFinger)
}

function initializeCard() {
	cards.prev.value = clearCard()
	cards.current.value = deck.value[deckIndex]
	cards.current.value.setStatus('current')
	cards.next.value = deck.value[deckIndex + 1]
}

function clearCard() {
	return { id: 0, value: '', fragments: [] }
}

function getTempo(bpm: number) {
	tempo.value = useMath().convertBpmToMs(bpm)
}

function getInstrumentMap(instrument: string) {
	instrumentMap.value = useAudio().selectInstrument(instrument)
}

export const usePractice = () => {
	async function startLesson() {
		isStart.value = true

		fragment.current.value = cards.current.value.fragments[fragmentIndex]
		fragment.next.value = cards.current.value.fragments[fragmentIndex + 1]

		isShowCounter.value = true
		let toDo = 'counter'

		Tone.start()
		Tone.Transport.start()

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
			fragment.current.value = cards.current.value.fragments[fragmentIndex]
		}

		function isLastFragment() {
			return cards.current.value.fragments.length === fragmentIndex
		}

		function getNextCard() {
			cards.prev.value = cards.current.value
			cards.prev.value.setStatus('prev')

			cards.current.value = cards.next.value
			cards.current.value.setStatus('current')

			deckIndex++

			if (deck.value.length > deckIndex + 1)
				cards.next.value = deck.value[deckIndex + 1]
			else cards.next.value = ''

			fragmentIndex = resetIndex()

			fragment.current.value = cards.current.value.fragments[fragmentIndex]
		}

		function hideCounter() {
			isShowCounter.value = !isShowCounter.value
		}

		function finishPractice() {
			clearInterval(timer)
			cards.current.value.setStatus('prev')
			cards.prev.value = cards.current.value
			cards.current.value = ''
		}
	}

	return {
		isStart,
		cards,
		deck,
		counter,
		isShowCounter,

		payLoad,
		startLesson,
	}
}
