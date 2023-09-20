const isStart = ref(false)
let viewMode = ref('allCards')

const emptyCard = ref({ fragments: [] })

const card = {
	prev: ref({ fragments: [] }),
	current: ref({ fragments: [] }),
	next: ref({ fragments: [] }),
}

const deck = ref(useDeck().getDeck('0'))

const loadScreen = function (screenViewMode: string) {
	switch (screenViewMode) {
		case '3Cards':
			viewMode.value = '3Cards'
			break
		case 'allCards':
			viewMode.value = 'allCards'
			break
		default:
			break
	}
}

const loadDeck = function (finger: string) {
	isStart.value = true
	deck.value = useDeck().getDeck(finger)

	card.current.value = deck.value[0]
	card.next.value = deck.value[1]
}

function startLesson() {
	let counter = deck.value.length

	const timer = setInterval(startPractice, 1000)
	function startPractice() {
		animateCards()
		counter--
		if (counter == 0) finishPractice()
	}
	function finishPractice() {
		clearInterval(timer)
	}
}

let index = 2
const animateCards = () => {
	card.prev.value = card.current.value
	card.current.value = card.next.value
	if (index < deck.value.length) {
		card.next.value = deck.value[index]
	}
	if (index == deck.value.length) {
		card.next.value = emptyCard.value
	}
	index++
}

export const useExecise = () => {
	return {
		isStart,
		viewMode,
		card,
		deck,
		loadScreen,
		loadDeck,
		animateCards,
		startLesson,
	}
}
