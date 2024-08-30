import { ObjectId } from 'mongoose'
import { UserDetails } from '~/server/models/UserDetails'

export default defineEventHandler(async (event) => {
	const body = await readBody(event)

	body.userId = body.userId as ObjectId

	try {
		if (!body.userId)
			throw createError({
				statusCode: 400,
				statusMessage: 'Bad Request',
				message: 'Id não informado.',
			})

		const userDetails = await UserDetails.findOneAndUpdate(
			{ userId: body.userId },
			{
				...body,
			},
		)
		console.log(userDetails)

		return userDetails
	} catch (error) {
		return error
	}
})
