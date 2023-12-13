import * as Tone from 'tone'

// Attributes
const viewMode = ref('allCards')

const tempo = ref()
const bpm = ref(0)

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

const instrument = ref('bass')
let instrumentMap = ref()

// Methods

function payLoad(firstFinger: string, viewModeValue: string, newBpm: number) {
	initializeDeck(firstFinger)

	initializeCard()

	updateViewMode(viewModeValue)

	updateTempo(newBpm)

	getInstrument()

	useAudio().getAudios(
		counter.value,
		instrument.value,
		instrumentMap.value,
		deck.value,
		bpm.value,
		tempo.value,
	)
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

function updateTempo(newBpm: number) {
	bpm.value = newBpm
	tempo.value = useMath().convertBpmToMs(newBpm)
}

function getInstrument() {
	instrumentMap.value = useAudio().selectInstrument(instrument.value)
}

async function startLesson() {
	isStart.value = true

	fragment.current.value = card.current.value.fragments[fragmentIndex]
	fragment.next.value = card.current.value.fragments[fragmentIndex + 1]

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

		payLoad,
		startLesson,
	}
}
