import { User } from '~/server/models/User'

export default defineEventHandler(async (event) => {
	const query = await getQuery(event)

	const user = await User.findOne(query, { _id: 1, email: 1, username: 1 })
	return user
})
