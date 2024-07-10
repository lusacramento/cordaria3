import { Lesson } from '~/server/models/Lesson'
export default defineEventHandler(async (event) => {
	return await Lesson.find({})
})
