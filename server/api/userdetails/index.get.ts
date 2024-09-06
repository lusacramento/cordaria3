import { UserDetails } from '~/server/models/UserDetails'
export default defineEventHandler(async (event) => {
	const { id } = getQuery(event)
	if (!id)
		throw createError({
			statusCode: 400,
			statusMessage: 'Bad Request',
			message: 'O campo Id está vazio.',
		})

	try {
		const response = await UserDetails.findOne({ userId: id })
		if (!response)
			throw createError({
				statusCode: 404,
				statusMessage: 'Not Found',
				message: `Id ${{ id }} não encontrado!`,
			})

		return response
	} catch (error) {
		return error
	}
})
