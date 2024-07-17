import { Progress } from '~/server/models/progress'

export default defineEventHandler(async (event) => {
	const { userId } = getQuery(event)

	if (!userId)
		throw createError({
			statusCode: 400,
			statusMessage: 'Bad Request',
			message: 'O campo  do Usuário está vazio.',
		})

	try {
		const response = await Progress.find({ userId: userId })
		if (!response)
			throw createError({
				statusCode: 404,
				statusMessage: 'Not Found',
				message: `Id do usuário ${{ userId }} não encontrado!`,
			})

		return response
	} catch (error) {
		console.log(error)
		return error
	}
})
