import { useHead } from 'nuxt/app'
import { Score } from '~/server/models/score'

export default defineEventHandler(async (event) => {
	const params = await getQuery(event)

	if (!params)
		throw createError({
			statusCode: 400,
			statusMessage: 'Bad Request',
			message: 'Missing required fields',
		})

	const scores = await Score.aggregate([
		{
			$match: { instrument: params.instrument },
		},
		{
			$lookup: {
				from: 'users', // Name of the users collection
				localField: 'userId',
				foreignField: '_id',
				as: 'user',
			},
		},
		{
			$sort: { score: -1 },
		},
		{
			$project: {
				_id: 0,
				score: 1,
				awards: 1,
				username: { $arrayElemAt: ['$user.username', 0] }, // Extract the username
			},
		},
	])

	return scores
})
