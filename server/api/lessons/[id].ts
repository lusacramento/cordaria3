import { Lesson } from '~/server/models/Lesson'

export default defineEventHandler(async (event) => {
	const id = getRouterParam(event, 'id') as string

	return Lesson.findById(id)
})
