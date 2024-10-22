import { User } from '~/server/models/User'
import bcrypt from 'bcrypt'
import { useValidations } from '~/composables/utils/validations'

const validations = useValidations()

export default defineEventHandler(async (event) => {
	const body = await readBody(event)

	try {
		if (
			!body.email ||
			!body.userName ||
			!body.password ||
			!body.confirmPassword ||
			!body.acceptTerms
		)
			throw createError({
				statusCode: 400,
				statusMessage: 'Bad Request',
				message: 'Missing required fields',
			})

		if (!validations.validateEmail(body.email))
			throw createError({
				statusCode: 400,
				statusMessage: 'Bad Request',
				message: 'O email não tem o formato válido',
			})

		if (!validations.validateUserName(body.userName))
			throw createError({
				statusCode: 400,
				statusMessage: 'Bad Request',
				message:
					'O nome deve conter somente caracteres alphas e ser maior que 3 caracteres.',
			})

		if (!validations.validatePassword(body.password))
			throw createError({
				statusCode: 400,
				statusMessage: 'Bad Request',
				message: 'O senha deve conter pelo menos 9 caracteres.',
			})

		if (
			!validations.validateConfirmPassword(body.password, body.confirmPassword)
		)
			throw createError({
				statusCode: 400,
				statusMessage: 'Bad Request',
				message: 'O senha e confirma senha devem conter valores iguais.',
			})

		if (!body.acceptTerms)
			throw createError({
				statusCode: 400,
				statusMessage: 'Bad Request',
				message: 'É obrigatório o aceite dos termos e condições de uso.',
			})

		const salt = await bcrypt.genSalt(10)
		const hasedPassword = await bcrypt.hash(body.password, salt)
		const user = await User.create({ ...body, password: hasedPassword })
		return { ...user.toObject(), password: undefined }
	} catch (error: any) {
		return error?.code === 11000
			? new Error('Nome de usuário ou senha já cadastrado!')
			: new Error(error?.message)
	}
})
