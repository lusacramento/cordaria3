import { Lesson } from '~/server/models/Lesson'

export default defineEventHandler(async (event) => {
	try {
		const response = await Lesson.deleteMany({})

		if (response.deletedCount === 0) {
			throw new Error('Nenhuma lição cadastrada')
		}

		return `${response.deletedCount} lições apagadas com sucesso!`
	} catch (error) {
		return error
	}
})
