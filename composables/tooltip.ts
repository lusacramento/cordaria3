export const useTooltip = () => {
	const bootstrap = () => import('bootstrap')

	function createTooltip(el: Element) {
		bootstrap().then((response) => {
			return new response.Tooltip(el, {
				fallbackPlacements: ['right'],
				trigger: 'hover focus',
			})
		})
	}
	return {
		createTooltip,
	}
}
