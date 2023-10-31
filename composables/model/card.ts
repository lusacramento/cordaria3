import { useFragment } from './fragment'
export const useCard = (value?: string) => {
	Fragment: useFragment()

	class Card {
		id: string
		content: string
		fragments: Object[] = []
		isLast: boolean = false
		status: string

		constructor(content: string) {
			this.id = content
			this.content = content

			this.fragments = this.getFragments(content)

			this.isLast = false

			this.status = 'next'
		}

		getFragments(content: string) {
			const Fragment = useFragment()
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

		setIsLast() {
			this.isLast = true
		}

		setStatus(status: string) {
			this.status = status
		}
	}

	return Card
}
