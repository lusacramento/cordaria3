import { User } from '~/server/models/User'

export default defineEventHandler(async (event) => {
	const query = await getQuery(event)

	const user = await User.findOne(query, { password: 0 })
	return user
})
