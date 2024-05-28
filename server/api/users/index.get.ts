import { users } from '../../dbModels'

export default defineEventHandler(async (event) => {
	console.log('GET /api/users')
	try {
		console.log('Find users')
		const usersData = await users.find()
		return usersData.map((user: any) => ({
			id: user._id,
			name: user.name,
			email: user.email,
			password: user.password,
		}))
	} catch (err) {
		console.dir(err)
		event.node.res.statusCode = 500
		return {
			code: 'ERROR',
			message: 'Something went wrong.',
		}
	}
})
