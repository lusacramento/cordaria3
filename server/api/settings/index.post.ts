import { Settings } from '~/server/models/Settings'

export default defineEventHandler(async (event) => {
	const body = await readBody(event)

	if (!body.userId || !body.instrument || !body.viewMode || !body.counter)
		throw createError({
			statusCode: 400,
			statusMessage: 'Bad Request',
			message: 'Campos obrigatórios ausentes',
		})

	const settings = await Settings.create({ ...body })

	return settings
})
