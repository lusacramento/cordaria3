export const useMath = () => {
	return {
		convertBpmToMs: (bpm: number) => 60000 / bpm,

		// adjusting release (audio)
		calculateRelease: (tempo: number) => {
			const adjustSync = 1.1 // <-- ajust here the release duration for legattos notes
			return (tempo / 1000) * adjustSync
		},

		// auxiliary function to suffle cards
		sortIndex: (max: number) => {
			const min = Math.ceil(0)
			max = Math.floor(max)
			return Math.floor(Math.random() * (max - min + 1)) + min
		},
	}
}
