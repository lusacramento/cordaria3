import { useData } from './data'
import { Card } from './card'

class Deck {
	deck: Card[] = []

	constructor(
		firstFinger: string,
		stringNumber: string,
		stringsNumber: number,
	) {
		const data = useData()

		if (data.length <= 0 || data === null || data === undefined)
			new Error('There is not  data')

		this.getCards(data, firstFinger, stringNumber)
		this.suffleDeck()
		this.insertStringsOnCards(stringNumber, stringsNumber)
		this.markLastCard()
	}

	getDeck() {
		return this.deck
	}

	getCards(data: string[], firstFinger: string, stringNumber: string) {
		const dataFiltered = data.filter((item) => item[0] === firstFinger)

		dataFiltered.forEach((element) => {
			const card = new Card(element, stringNumber)

			this.deck.push(card)
		})
	}

	insertStringsOnCards(str: string, stringsNumber: number) {
		let strNumber = 0

		switch (str) {
			case 'downToUp':
				strNumber = stringsNumber
				break
			case 'upToDown':
				strNumber = 1
				break
			default:
				strNumber = parseInt(str)
				break
		}

		this.deck.forEach((card: Card) => {
			switch (str) {
				case 'downToUp':
					card.str = strNumber.toString()
					strNumber--
					if (strNumber === 1) str = 'upToDown'
					break

				case 'upToDown':
					card.str = strNumber.toString()

					strNumber++
					if (strNumber === stringsNumber) str = 'downToUp'
					break
				default:
					card.str = str
					break
			}
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
