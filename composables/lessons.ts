	function getEmptyLesson() {
		return { id: 0, name: '', firstFinger: 0, stringNumber: '', bpm: 0 }
	}

const getLessons = () => lessons

export const useLessons = () => {
	return {
		getLessons,
		getEmptyLesson,
	}
}
