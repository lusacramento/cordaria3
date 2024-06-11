import { users } from '../../dbModels'

export default defineEventHandler(async (event) => {
	const { email, password } = await readBody(event)
	// Check if email and password is passed.
	if (!email || !password) {
		event.node.res.statusCode = 400
		return {
			code: 'EMAIL_REQUIRED',
			message: 'Email e senha são requeridos.',
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
				event.node.res.statusCode = 401
				return {
					code: 'USER_NOT_AUTHORIZED',
					message: 'Usuário ou senha incorreta.',
				}
			}
		} else {
			event.node.res.statusCode = 404
			return {
				code: 'USER_NOT_FOUND',
				message: 'Usuário com este email não existe.',
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
