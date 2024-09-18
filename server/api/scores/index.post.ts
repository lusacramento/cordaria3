import { Score } from '~/server/models/score'
import { Score as ScoreType } from '~/types/Score'

export default defineEventHandler(async (event) => {
	const body = (await readBody(event)) as ScoreType

	try {
		if (!body.userId || !body.instrument) {
			throw createError({
				statusCode: 400,
				statusMessage: 'Bad Request',
				message: 'Campos obrigatórios ausentes',
			})
		}

		const score = await Score.findOneAndUpdate(
			{
				userId: body.userId,
				instrument: body.instrument,
			},
			{ ...body },
			{ upsert: true, returnDocument: 'after' },
		)

		return { ...score?.toObject() }
	} catch (error) {
		return error
	}
})
