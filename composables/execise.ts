const isStart = ref(false)
let viewMode = ref('allCards')

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

	card.prev.value = deck.value[0]
	card.current.value = deck.value[1]
	card.next.value = deck.value[2]
}

export const useExecise = () => {
	return {
		isStart,
		viewMode,
		card,
		deck,
		loadScreen,
		loadDeck,
	}
}
