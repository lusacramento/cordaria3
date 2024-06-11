import { users } from '../../dbModels'

export default defineEventHandler(async (event) => {
	const { email, password, userName } = await readBody(event)

	try {
		const userByName = await users.findOne({
			userName,
		})

		// verify if exists user with this name
		if (userByName) {
			event.node.res.statusCode = 409
			return {
				code: 'USER_EXISTS',
				message: `Usuário com o nome "${userName}" já existe.`,
			}
		}

		// verify if exists user with this email
		const userByEmail = await users.findOne({
			email,
		})
		if (userByEmail) {
			event.node.res.statusCode = 409
			return {
				code: 'USER_EXISTS',
				message: `Usuário com email "${email}" já existe.`,
			}
		}

		// add user on database
		const newUserData = await users.create({
			email,
			password,
			userName,
		})

		return {
			id: newUserData._id,
			userName: newUserData.userName,
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
