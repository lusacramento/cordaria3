export const useHelpers = () => {
	function translate(direction: string | number) {
		switch (direction) {
			case 'downToUp':
				return 'Todas (início do grave)'
			case 'upToDown':
				return 'Todas (ínicio do agudo)'

			default:
				return direction
		}
	}

	return {
		translate,
	}
}
