import { useMySettingsStore } from './../stores/settings'
import { Card } from './model/card'
import type { Lesson } from '~/types/Lesson'

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

const instrument = ref('')
const instrumentMap = ref([]) as Ref<any>

const lesson = ref() as Ref<Lesson> | Ref<null>

// lesson variables
let lessonNumber = 0

// counter variable
const counter = ref(0)

const isCompleted = ref(false)

export const useController = () => {
	let deckIndex = 0

	const detailsStore = useMyUserDetailsStore()
	const progressStore = useMyProgressStore()
	const settingsStore = useMySettingsStore()

	async function init() {
		instrument.value = await detailsStore.getInstrument
		lesson.value = await progressStore.getCurrentLesson
		counter.value = await settingsStore.getCounter
		instrumentMap.value = await useAudio().getInstrumentMapping(
			instrument.value,
		)
		if (lesson.value !== null) initDeck(lesson.value)
	}

	function initDeck(lesson: Lesson) {
		let stringsNumber = 0
		if (Array.isArray(instrumentMap.value))
			stringsNumber = instrumentMap.value.length

		deck.value = new Deck(
			lesson.firstFinger.toString(),
			lesson.stringNumber,
			stringsNumber,
		).deck

		cards.current.value = deck.value[deckIndex]
		cards.next.value = deck.value[deckIndex + 1]
	}

	async function payload(repeatedLesson?: number) {
		const tempo = getTempo(lesson.value?.bpm as number)

		useAudio().getAudios(
			counter.value,
			instrument.value,
			instrumentMap.value,
			deck.value,
			lesson.value?.bpm as number,
			tempo,
		)
	}

	function getTempo(bpm: number) {
		return useMath().convertBpmToMs(bpm)
	}

	async function startLesson(tempo: number) {
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

			// if (lesson.value?.message) alert(lesson.value.message)

			isCompleted.value = true
		}
	}

	function toogleShowStatistics() {
		showStatistics.value = !showStatistics.value
		showBox.value = !showBox.value
	}

	return {
		deck,
		cards,
		showCards,
		showStatistics,
		showBox,
		isShowCounter,
		toogleShowStatistics,
		payload,
		init,
		counter,
		startLesson,
		isCompleted,
	}
}
