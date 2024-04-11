import { useData } from './data'
import { Card } from './card'

class Deck {
	deck: Card[] = []

	constructor(firstFinger: string) {
		const data = useData()

		if (data.length <= 0 || data === null || data === undefined)
			new Error('There is not  data')

		this.getCards(data, firstFinger)
		this.suffleDeck()
		this.markLastCard()
	}

	getDeck() {
		return this.deck
	}

	getCards(data: string[], firstFinger: string) {
		const dataFiltered = data.filter((item) => item[0] === firstFinger)

		dataFiltered.forEach((element) => {
			const card = new Card(element)

			this.deck.push(card)
		})
	}

	suffleDeck() {
		if (!this.deck) new Error('There  are no cards in the deck to suffle')

		let suffledDeck = this.deck.slice()

		for (let i = suffledDeck.length; i > 0; i--) {
			const sortedIndex = useMath().sortIndex(i)
			const card = suffledDeck[sortedIndex]
			suffledDeck.push(card)
			suffledDeck.splice(sortedIndex, 1)
		}

		this.deck = suffledDeck
	}

	markLastCard() {
		this.deck[this.deck.length - 1].isLast = true
	}
}

export { Deck }
