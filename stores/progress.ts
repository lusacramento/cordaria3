import { useMyUserStore } from './user'
import { type ObjectId } from 'mongoose'
import { defineStore } from 'pinia'
import { type Progress } from '~/types/Progress'
import { type Lesson } from '~/types/Lesson'
import type { Score } from '~/types/Score'

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

		async loadScore() {
			const score = (await useIScore().getScore(
				useMyUserStore().getId,
				useMySettingsStore().getInstrument,
			)) as Score

			if (score) this.score = score.score
		},

		generateProgress() {
			this.progress.userId = useMyUserStore().getId as unknown as ObjectId
			this.progress.lesson = this.lesson._id as unknown as ObjectId
			this.progress.isCompleted = false
			this.progress.instrument = useMySettingsStore().getInstrument
			this.progress.currentLesson = this.lesson.number
		},

		async updateProgress() {
			this.progress.isCompleted = true
			await useIProgress().setProgress(this.progress)
		},

		updateScore() {
			this.score += !this.progress.isCompleted
				? this.lesson.points
				: this.lesson.points / 2

			this.postScore()
		},

		async postScore() {
			const score = this.generateScore() as unknown as Score
			await useIScore().postScore(score)
		},

		generateScore() {
			return {
				userId: useMyUserStore().getId as unknown as ObjectId,
				instrument: useMySettingsStore().getInstrument,
				score: this.score,
			}
		},
	},
})
