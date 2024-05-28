import { users } from '../../dbModels'

export default defineEventHandler(async (event) => {
	if (event.context.params !== undefined) {
		const userId = event.context.params.id
		console.log(`GET /api/users/${userId}`)
		try {
			console.log('Find user')
			const userData = await users.findOne({
				_id: userId,
			})
			if (userData) {
				console.log('User found')
				return {
					id: userData._id,
					name: userData.name,
				}
			} else {
				console.log('User not found')
				event.node.res.statusCode = 404
				return {
					code: 'USER_NOT_FOUND',
					message: `User with id ${userId} doesn't exists.`,
				}
			}
		} catch (err) {
			console.dir(err)
			event.node.res.statusCode = 500
			return {
				code: 'ERROR',
				message: 'Something went wrong.',
			}
		}
	} else {
		console.error('id not provided')
	}
})
