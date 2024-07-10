import { Lesson } from '~/server/models/Lesson'

export default defineEventHandler(async (event) => {
	try {
		Lesson.deleteMany({})
		event.node.res.statusCode = 204

		return
	} catch (error) {
		return error
	}
})
