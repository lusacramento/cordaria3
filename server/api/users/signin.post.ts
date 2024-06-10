import { users } from '../../dbModels'

export default defineEventHandler(async (event) => {
	const { email, password } = await readBody(event)
	// Check if email is passed.
	if (!email) {
		event.node.res.statusCode = 400
		return {
			code: 'EMAIL_REQUIRED',
			message: 'Email não informado.',
		}
	}
	// Check if password is passed.
	if (!password) {
		event.node.res.statusCode = 400
		return {
			code: 'PASSWORD_REQUIRED',
			message: 'Senha não informada.',
		}
	}
	try {
		const userData = await users.findOne({
			email: email.toLowerCase(),
		})
		if (userData) {
			const isPasswordValid = await userData.verifyPasswordSync(password)

			if (isPasswordValid) {
				// Generate token or create session here
				return {
					id: userData._id,
					name: userData.name,
				}
			} else {
				event.node.res.statusCode = 404
				return {
					code: 'USER_NOT_FOUND',
					message: 'Usuário com email e senha não existe.',
				}
			}
		} else {
			console.log('User not found')
			event.node.res.statusCode = 404
			return {
				code: 'USER_NOT_FOUND',
				message: 'Usuário com email e senha não existe.',
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
