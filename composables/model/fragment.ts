export class Fragment {
	id: string
	value: string
	isHighlight: boolean

	constructor(id: string, value: string) {
		this.id = id
		this.value = value
		this.isHighlight = false
	}

	setIsHighlight(isHighlight: boolean) {
		this.isHighlight = isHighlight
	}

	getEmptyFragment() {
		return new Fragment('null', 'null')
	}
}
