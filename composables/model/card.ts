import { Fragment } from './fragment'

export class Card {
	id: string
	content: string
	fragments: Fragment[]
	isLast: boolean = false
	status: string
	str: string

	constructor(content: string, stringNumber: string) {
		this.id = content
		this.content = content

		this.fragments = this.getFragments(content)

		this.isLast = false

		this.status = 'next'
		this.str = stringNumber
	}

	static getEmptyCard() {
		return new Card('', '')
	}

	getFragments(content: string) {
		const fragments = []

		for (let index = 0; index < content.length; index++) {
			const fragmentContent = content[index]

			const fragment = new Fragment(
				`${this.id}_${index}_${fragmentContent}`,
				fragmentContent,
			)

			fragments.push(fragment)
		}

		return fragments
	}

	setStatus(status: string) {
		this.status = status
	}
}
