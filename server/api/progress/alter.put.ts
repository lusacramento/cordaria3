import { Progress } from '~/server/models/progress'

export default defineEventHandler(async (event) => {
	const { _id, isCompleted } = await readBody(event)

	if (!_id) {
		throw createError({
			statusCode: 400,
			statusMessage: 'Bad Request',
			message: 'Missing required fields',
		})
	} else {
		const progress = await Progress.findByIdAndUpdate(
			_id,
			{ isCompleted: isCompleted },
			{
				upsert: false,
				new: false,
			},
		)

		return progress
	}
})
