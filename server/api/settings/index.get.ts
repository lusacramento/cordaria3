import { Settings } from '~/server/models/Settings'

export default defineEventHandler(async (event) => {
	const { userId } = await getQuery(event)

	if (!userId)
		throw createError({
			statusCode: 400,
			statusMessage: 'Bad Request',
			message: 'Id é obrigatório',
		})

	const settings = Settings.findOne({ userId })

	return settings
})
