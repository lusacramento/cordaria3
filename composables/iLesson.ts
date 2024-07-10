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

	async function getLessonByNumber(queryLesson: Object) {
		return await $fetch('/api/lessons/lesson/', {
			method: 'get',
			query: queryLesson,
		})
	}

	async function deleteAll() {}
	return { postMany, getAll, deleteAll, getLessonByNumber }
}
