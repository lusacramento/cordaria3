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
		await UserDetails.create(body)
		setResponseStatus(event, 201, 'created')
		return
	} catch (error) {
		return error
	}
})
