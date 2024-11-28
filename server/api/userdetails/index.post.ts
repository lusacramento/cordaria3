import { UserDetails } from '~/server/models/UserDetails'

export default defineEventHandler(async (event) => {
	const body = await readBody(event)
	const avatar = '/imgs/avatar/default-avatar.png'

	if (!body.userId || !body.fullName || !body.state || !body.country) {
		throw createError({
			statusCode: 400,
			statusMessage: 'Bad Request',
			message: 'Todos os campos são requeridos.',
		})
	}

	try {
		if (body.avatar === '') body.avatar = avatar
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
