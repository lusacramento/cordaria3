import { Progress } from '~/server/models/progress'

export default defineEventHandler(async (event) => {
	const body = await readBody(event)

	if (!body._id) {
		throw createError({
			statusCode: 400,
			statusMessage: 'Bad Request',
			message: 'Missing required fields',
		})
	} else {
		const progress = await Progress.findByIdAndUpdate(
			body._id,
			{ isCompleted: body.isCompleted },
			{
				upsert: false,
				new: false,
				returnDocument: 'after',
			},
		)

		return progress
	}
})
