import { Progress } from '~/server/models/progress'

export default defineEventHandler(async (event) => {
	const body = await readBody(event)

	if (!body.userId || !body.lesson || !body.instrument || !body.currentLesson)
		throw createError({
			statusCode: 400,
			statusMessage: 'Bad Request',
			message: 'Missing required fields',
		})

	const progress = await Progress.create(body)

	return progress
})
