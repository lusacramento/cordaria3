import { Progress } from '~/server/models/progress'

export default defineEventHandler(async (event) => {
	const query = getQuery(event)

	if (!query.userId || !query.instrument)
		throw createError({
			statusCode: 400,
			statusMessage: 'Bad Request',
			message: 'O campo  do Usuário e/ou  instrumento está vazio.',
		})

	try {
		const response = await Progress.findOne(query).sort({ $natural: -1 })

		return response
	} catch (error) {
		return error
	}
})
