import { Lesson } from '~/server/models/Lesson'

export default defineEventHandler(async (event) => {
	const queryLesson = await getQuery(event)

	if (!queryLesson.number || !queryLesson.quantityOfStrings)
		throw createError({
			statusCode: 400,
			statusMessage: 'Bad Request',
			message: 'Missing required fields',
		})

	if (
		typeof queryLesson.number === 'string' &&
		typeof queryLesson.quantityOfStrings === 'string'
	) {
		const lesson = await Lesson.findOne({
			number: parseInt(queryLesson.number),
			quantityOfStrings: parseInt(queryLesson.quantityOfStrings),
		})
		return { lesson }
	}
	return
})
