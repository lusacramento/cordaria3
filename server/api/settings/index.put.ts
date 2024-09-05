import { Settings } from '~/server/models/Settings'

export default defineEventHandler(async (event) => {
	const { userId } = await getQuery(event)
	if (!userId)
		throw createError({
			statusCode: 400,
			statusMessage: 'Bad Request',
			message: 'Id do Usuário é obrigatório',
		})

	const body = await readBody(event)
	if (!body)
		throw createError({
			statusCode: 400,
			statusMessage: 'Bad Request',
			message: 'Campos obrigatórios ausentes',
		})

	const settings = Settings.findOneAndUpdate({ userId: userId }, body, {
		upsert: true,
		returnDocument: 'after',
	})

	return settings
})
