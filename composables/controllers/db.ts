import type { ObjectId } from 'mongoose'
import type { Instrument } from '~/types/Instrument'
import type { Lesson } from '~/types/Lesson'
import type { Progress } from '~/types/Progress'
import type { Score } from '~/types/Score'

export const useDbController = () => {
	const userStore = useMyUserStore()
	const userDetailsStore = useMyUserDetailsStore()
	const progressStore = useMyProgressStore()
	const iUser = useIUser()
	const iLesson = useILesson()
	const iProgress = useIProgress()

	const iScore = useIScore()
	const helpers = useHelpers()

	// functions

	// user
	async function getUserDetails() {
		return await iUser.getUserDetails(userStore.getId)
	}

	async function postUserDetails() {
		const userDetails = {
			userId: userStore.getId,
			...useMyUserDetailsStore().getAll,
		}
		await iUser.postUserDetails(userDetails)
	}

	async function updateUserDetails(instrument: Instrument) {
		await iUser.setUserDetails({
			userId: userDetailsStore.userId,
			instrument: instrument,
		})
	}

	// lesson
	async function getLesson(number: number) {
		const quantityOfStrings = helpers.getQuantityOfStrings(
			userDetailsStore.getInstrument,
		)

		const lessonQuery = {
			number: number,
			quantityOfStrings: quantityOfStrings,
		}
		const response = await iLesson.getLesson(lessonQuery)

		if (response?.lesson) {
			const lesson = response.lesson as Lesson
			progressStore.setLesson(lesson)
			return lesson
		}
		return null
	}

	async function getLessonById(id: string) {
		return await iLesson.getLessonById(id)
	}
	// progress
	function generateProgress(lesson: Lesson) {
		return {
			userId: userStore.getId as unknown as ObjectId,
			lesson: lesson._id as unknown as ObjectId,
			isCompleted: false,
			instrument: userDetailsStore.getInstrument,
			currentLesson: lesson.number,
		}
	}

	async function getProgress() {
		return await iProgress.getProgress(
			userStore.getId,
			userDetailsStore.getInstrument,
		)
	}

	async function postProgress(progress: Progress) {
		return await iProgress.postProgress(progress)
	}

	async function updateProgress() {
		await iProgress.setProgress(progressStore.getProgress)
	}
	// score
	async function getScore() {
		const score = (await iScore.getScore(
			userStore.getId,
			userDetailsStore.getInstrument,
		)) as Score

		return score.score as number
	}

	async function postScore() {
		const score = {
			userId: userStore.getId as unknown as ObjectId,
			instrument: userDetailsStore.getInstrument,
			score: progressStore.getScore,
		} as unknown as Score
		await iScore.postScore(score)
	}

	async function updateScore() {
		const lessonPoints = progressStore.getCurrentLesson?.points
		if (lessonPoints) {
			const points = !progressStore.getProgress.isCompleted
				? lessonPoints
				: lessonPoints / 2
			progressStore.setScore(points)
		}
	}
	return {
		getUserDetails,
		postUserDetails,
		updateUserDetails,
		getLesson,
		getLessonById,
		generateProgress,
		getProgress,
		postProgress,
		updateProgress,
		getScore,
		postScore,
		updateScore,
	}
}
