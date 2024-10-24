import { User } from '~/server/models/User'

export default defineEventHandler(async (event) => {
	const { token } = await getQuery(event)

	try {
		const user = await User.findOne(
			{ 'rescuePassword.token': token },
			{ _id: 1, email: 1, rescuePassword: 1 },
		)
		return user
	} catch (error) {
		console.log(error)
		return error
	}
})
