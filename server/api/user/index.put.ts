import { User } from '~/server/models/User'
import bcrypt from 'bcrypt'

export default defineEventHandler(async (event) => {
	const { id } = await getQuery(event)
	const body = await readBody(event)

	if (body.password) {
		const hashedPassword = await bcrypt.hash(body.password, 10)
		body.password = hashedPassword
	}

	const user = await User.findByIdAndUpdate(id, body, {
		returnDocument: 'after',
	})

	return user
})
