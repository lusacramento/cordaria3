export const useILesson = () => {
	async function postMany(values: any) {
		return await useFetch('/api/lessons/lessons', {
			method: 'post',
			body: values,
		})
	}

	async function getAll() {
		const LessonsCached = useNuxtData('findAllLessons').data.value
		if (LessonsCached) return LessonsCached

		const { data } = await useFetch('/api/lessons/lessons', {
			key: 'findAllLessons',
		})

		refreshNuxtData('findAllLessons')

		return data
	}

	async function getLesson(queryLesson: Object) {
		return await $fetch('/api/lessons/lesson/', {
			method: 'get',
			query: queryLesson,
		})
	}

	async function getLessonById(id: string) {
		return await $fetch('/api/lessons/' + id, {
			method: 'get',
		})
	}

	async function deleteAll() {
		return await useFetch('/api/lessons/lessons', {
			method: 'delete',
		})
	}

	return { postMany, getAll, deleteAll, getLesson, getLessonById }
}
