import * as Tone from 'tone'

export const useAudio = () => {
	return {
		selectInstrument: function (instrument: string) {
			let instrumentMap = {}
			switch (instrument) {
				case 'acoustic-guitar':
					instrumentMap = useGuitar().getMap()
					break
				case 'eletric-guitar':
					instrumentMap = useGuitar().getMap()
					break
				case 'cavaco':
					instrumentMap = useCavaco().getMap()
					break
				case 'bass':
					instrumentMap = useBass().getMap()
					break
				default:
					break
			}
			return instrumentMap
		},
	}
}
