import { useMySettingsStore } from './../stores/settings'
import { Card } from './model/card'

// Views variables
const showCards = ref(false)
const showStatistics = ref(false)
const showBox = ref(true)

const isShowCounter = ref(false)

//  Model variable
const deck: Ref<Card[]> = ref([])
const cards = {
	prev: ref(Card.getEmptyCard()),
	current: ref(Card.getEmptyCard()),
	next: ref(Card.getEmptyCard()),
}

// lesson variables
const title = ref('A PRÁTICA')
let lessonNumber = 0

// counter variable
const counter = ref(0)

export const useController = () => {
	counter.value = useMySettingsStore().getCounter
	let deckIndex = 0

	function init() {
		initLesson()
		initDeck(lesson)
	}

	function initLesson() {
		lessonNumber = useMySettingsStore().getLastLesson + 1
		lesson = useLessons().getLesson(lessonNumber)
	}

	function initDeck(lesson: Lesson) {
		deck.value = new Deck(lesson.firstFinger.toString()).deck

		cards.current.value = deck.value[deckIndex]
		cards.next.value = deck.value[deckIndex + 1]
	}

	function payload(repeatedLesson?: number) {
		switch (true) {
			case repeatedLesson !== undefined:
				updateLesson(repeatedLesson)
				break
			case counter.value !== useMySettingsStore().getCounter:
				counter.value = useMySettingsStore().getCounter
				updateLesson(lessonNumber)
				break

			default:
				new Error('No valid argument provided')
				break
		}

		const defaultInstrumentName = useMySettingsStore().getInstrumentDefault
		const instrumentMap = useAudio().getInstrumentMapping(defaultInstrumentName)

		const tempo = getTempo(lesson.bpm)

		const stringIndex = (parseInt(lesson.stringNumber) - 1).toString()
		useAudio().getAudios(
			counter.value,
			defaultInstrumentName,
			instrumentMap,
			deck.value,
			lesson.bpm,
			tempo,
			stringIndex,
		)
	}

	function updateLesson(lessonNumber: number) {
		lesson = useLessons().getLesson(lessonNumber)
		initDeck(lesson)
	}

	function getTempo(bpm: number) {
		return useMath().convertBpmToMs(bpm)
	}

	async function startLesson(tempo: number) {
		title.value = `Lição: ${lesson.id} - Corda: ${useHelpers().translate(
			lesson.stringNumber,
		)} - BPM: ${lesson.bpm} - Nível: ${lesson.level}`
		showStatistics.value = false
		showBox.value = false

		showCards.value = true

		const fragment = {
			prev: ref(),
			current: ref(),
			next: ref(),
		}

		let fragmentIndex = 0

		fragment.current.value = cards.current.value.fragments[fragmentIndex]
		fragment.next.value = cards.current.value.fragments[fragmentIndex + 1]

		isShowCounter.value = true
		let toDo = 'counter'

		function startPractice() {
			switch (toDo) {
				case 'counter':
					toDo = updateTodo()
					if (toDo === 'play') {
						hideCounter()
						cards.current.value.setStatus('current')

						play()
					}
					break
				case 'play':
					play()
					break
			}
		}

		const timer = setInterval(startPractice, tempo)

		function updateTodo() {
			counter.value--
			return isFinishCount() ? 'play' : 'counter'
		}

		function hideCounter() {
			isShowCounter.value = !isShowCounter.value
		}

		function isFinishCount() {
			return counter.value === 0
		}

		function play() {
			if (isFinished()) {
				fragment.prev.value.setIsHighlight(false)

				finishPractice()
			} else {
				if (isLastFragment()) {
					getNextCard()
					toAnimate()
				} else toAnimate()

				getNextFragment()
			}
		}

		function isFinished() {
			return isLastCard() && isLastFragment()
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

		function getNextFragment() {
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
			else cards.next.value = Card.getEmptyCard()

			fragmentIndex = resetIndex()

			fragment.current.value = cards.current.value.fragments[fragmentIndex]
		}

		function resetIndex() {
			return 0
		}

		function finishPractice() {
			clearInterval(timer)
			cards.current.value.setStatus('prev')
			cards.prev.value = cards.current.value
			cards.current.value = Card.getEmptyCard()
			title.value = 'Lição finalizada!'

			if (lesson.message) alert(lesson.message)
		}
	}

	function toogleShowStatistics() {
		showStatistics.value = !showStatistics.value
		showBox.value = !showBox.value
	}

	return {
		deck,
		cards,
		title,
		showCards,
		showStatistics,
		showBox,
		isShowCounter,
		toogleShowStatistics,
		payload,
		init,
		counter,
		startLesson,
	}
}
