import * as Tone from 'tone'

function selectInstrument(instrument: string) {
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
}

// function getaudios() {
// 	if (Tone.context.state !== 'running') {
// 		Tone.context.resume()
// 	}

// 	const urls = {}

// 	for (const iString in instrumentMap) {
// 	}
// }
export const useAudio = (instrument: string) => {
	return selectInstrument(instrument)
}
