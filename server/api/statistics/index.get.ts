import { Progress } from '~/server/models/progress'
import { Lesson } from '~/server/models/Lesson'
import { Statistic } from '~/types/Statistic'
export default defineEventHandler(async (event) => {
	const { userId, instrument } = await getQuery(event)

	const progress = await Progress.find(
		{ userId: userId, instrument: instrument },
		{ lesson: 1, isCompleted: 1 },
	)

	const map = progress.map((progress) => progress.lesson)

	const lessons = await Lesson.find(
		{ _id: map },
		{ number: 1, level: 1, bpm: 1 },
	)

	const statistics: any[] = []

	progress.forEach(async (progressElement) => {
		const lesson = lessons.find((lesson) =>
			isMatched(progressElement.lesson.toString(), lesson.id.toString()),
		)
		statistics.push({
			number: lesson?.number,
			level: lesson?.level,
			bpm: lesson?.bpm,
			isCompleted: progressElement.isCompleted,
		})
	})

	function isMatched(progressLessonId: string, lessonId: string) {
		return progressLessonId === lessonId
	}

	return statistics as Statistic[]
})
