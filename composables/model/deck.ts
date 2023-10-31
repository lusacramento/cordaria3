import { useData } from './data'

class Deck {
	deck: Array<any> = []

	constructor(firstFinger: string) {
		const data = useData()

		if (!this.isEmptyData(data)) {
			this.getCards(data, firstFinger)
			this.suffleDeck()
			this.markLastCard()
		}
	}

	getDeck() {
		return this.deck
	}

	getCards(data: string[], firstFinger: string) {
		const Card = useCard()

		for (let index = 0; index < data.length; index++) {
			const value = data[index]

			if (this.filterFirstFinger(value, firstFinger)) {
				const card = new Card(value)

				this.deck.push(card)
			}
		}
	}

	filterFirstFinger(value: string, firstFinger: string) {
		return value[0] === firstFinger
	}

	isEmptyData(data: string[]) {
		if (data.length <= 0) return true
		return false
	}

	suffleDeck() {
		if (this.deck) {
			let suffledDeck = this.deck.slice()

			for (let i = suffledDeck.length; i > 0; i--) {
				const sortedIndex = useMath().sortIndex(i)
				const card = suffledDeck[sortedIndex]
				suffledDeck.push(card)
				suffledDeck.splice(sortedIndex, 1)
			}

			this.deck = suffledDeck
		}
	}

	markLastCard() {
		this.deck[this.deck.length - 1].isLast = true
	}
}

export const useDeck = () => {
	const getDeck = (firstFinger: string) => new Deck(firstFinger).getDeck()
	return { getDeck }
}
