	function getLesson(id: number) {
		const lesson = lessons.find((lesson) => lesson.id === id)
		return lesson ? lesson : getEmptyLesson()
	}

	function getEmptyLesson() {
		return { id: 0, name: '', firstFinger: 0, stringNumber: '', bpm: 0 }
	}

const getLessons = () => lessons

export const useLessons = () => {
	return {
		getLessons,
		getLesson,
		getEmptyLesson,
	}
}
