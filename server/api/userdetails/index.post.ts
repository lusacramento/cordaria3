import { UserDetails } from '~/server/models/UserDetails'

export default defineEventHandler(async (event) => {
	const body = await readBody(event)

	if (
		!body.userId ||
		!body.fullName ||
		!body.age ||
		!body.state ||
		!body.country ||
		!body.imageUrl
	) {
		throw createError({
			statusCode: 400,
			statusMessage: 'Bad Request',
			message: 'Todos os campos são requeridos.',
		})
	}

	try {
		const userDetails = await UserDetails.updateOne(
			{ userId: body.userId },
			body,
			{ upsert: true },
		)
		userDetails.matchedCount === 0
			? setResponseStatus(event, 201, 'created')
			: setResponseStatus(event, 200, 'ok')
	} catch (error) {
		return error
	}
})
