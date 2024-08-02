import { Lesson } from '~/server/models/Lesson'
import { Lesson as LessonType } from '~/composables/model/lesson'

export default defineEventHandler(async (event) => {
	const body: LessonType[] = await readBody(event)

	// body.forEach(element: any => {
	// 	console.log(element)

	// });

	body.forEach(async (element: LessonType, index: number) => {
		await console.log(element.number, ' - ', element.quantityOfStrings)
		if (
			!element.hasOwnProperty('number') ||
			!element.hasOwnProperty('level') ||
			!element.hasOwnProperty('firstFinger') ||
			!element.hasOwnProperty('stringNumber') ||
			!element.hasOwnProperty('bpm') ||
			!element.hasOwnProperty('message') ||
			!element.hasOwnProperty('quantityOfStrings')
		)
			throw createError({
				statusCode: 400,
				statusMessage: 'Bad Request',
				message: 'Missing required fields',
			})
	})

	try {
		const lessons = await Lesson.insertMany(body)

		return { ...lessons }
	} catch (error) {
		console.log(error)
	}
	return
})
