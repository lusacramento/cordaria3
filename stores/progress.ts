import { useMyUserStore } from './user'
import { type ObjectId } from 'mongoose'
import { defineStore } from 'pinia'
import { type Progress } from '~/types/Progress'
import { type Lesson } from '~/types/Lesson'

export const useMyProgressStore = defineStore({
	id: 'myProgressStore',
	state: () => ({
		progress: {} as Progress,
		lesson: {} as Lesson,
		score: 0 as number,
	}),

	getters: {
		getCurrentLesson(state) {
			return state.lesson
		},

		getProgress(state) {
			return state.progress
		},

		getScore(state) {
			return state.score
		},
	},

	actions: {
		async setProgress(progress: Progress) {
			this.progress = progress
		},

		setLesson(lesson: Lesson) {
			this.lesson = lesson
		},

		setIsCompletedProgress(status: boolean) {
			this.progress.isCompleted = true
		},

		setScore(score: number) {
			this.score += score
		},

		async postProgress() {
			useIProgress().postProgress(this.progress)
		},

		async loadProgress() {
			const progress = (await useIProgress().getProgress(
				useMyUserStore().getId,
				useMySettingsStore().getInstrument,
			)) as Progress

			if (!progress) {
				const firstLessonNumber = 1
				await this.getLesson(firstLessonNumber)
				this.generateProgress()
				this.postProgress()
				return
			}

			this.progress = progress
			this.getLessonById()
		},

		async getLesson(number: number) {
			const quantityOfStrings = useHelpers().getQuantityOfStrings(
				useMySettingsStore().getInstrument,
			)

			const lessonQuery = {
				number: number,
				quantityOfStrings: quantityOfStrings,
			}

			const lesson = await useILesson().getLesson(lessonQuery)
			if (lesson?.lesson) this.lesson = lesson.lesson as Lesson
		},

		async getLessonById() {
			this.lesson = (await useILesson().getLessonById(
				this.progress.lesson as unknown as string,
			)) as Lesson
		},

		generateProgress() {
			this.progress.userId = useMyUserStore().getId as unknown as ObjectId
			this.progress.lesson = this.lesson._id as unknown as ObjectId
			this.progress.isCompleted = false
			this.progress.instrument = useMySettingsStore().getInstrument
			this.progress.currentLesson = this.lesson.number
		},
	},
})
