import { Score } from '~/server/models/score'

export default defineEventHandler(async (event) => {
	const query = await getQuery(event)

	if (!query.userId || !query.instrument)
		throw createError({
			statusCode: 400,
			statusMessage: 'Bad Request',
			message: 'Campos obrigatórios ausentes',
		})

	const score = await Score.findOne({ ...query })

	if (!score)
		throw createError({
			statusCode: 404,
			statusMessage: 'Not Found',
			message: 'Dados não encontrados',
		})

	return score
})
