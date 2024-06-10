import { users } from '../../dbModels'

export default defineEventHandler(async (event) => {
	const { email, password, userName } = await readBody(event)

	try {
		const userData = await users.findOne({
			email,
		})
		if (userData) {
			event.node.res.statusCode = 409
			return {
				code: 'USER_EXISTS',
				message: `Usuário com email "${email}" já existe.`,
			}
		} else {
			const newUserData = await users.create({
				email,
				password,
				userName,
			})

			return {
				id: newUserData._id,
				userName: newUserData.userName,
			}
		}
	} catch (err) {
		console.dir(err)
		event.node.res.statusCode = 500
		return {
			code: 'ERROR',
			message: 'algo deu errado.',
		}
	}
})
