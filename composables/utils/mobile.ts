export const useMobile = () => {
	function isMobileDevice() {
		return navigator.userAgent.match(/iPhone/i) ||
			navigator.userAgent.match(/iPad/i) ||
			navigator.userAgent.match(/Android/i)
			? true
			: false
	}
	return { isMobileDevice }
}
