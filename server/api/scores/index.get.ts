import { Score } from '~/server/models/score'

export default defineEventHandler(async (event) => {
	const query = await getQuery(event)

	if (!query.userId || !query.instrument)
		throw createError({
			statusCode: 400,
			statusMessage: 'Bad Request',
			message: 'Campos obrigatórios ausentes',
		})

	try {
		const score = await Score.findOne({ ...query })

		return score
	} catch (error) {
		return error
	}
})
