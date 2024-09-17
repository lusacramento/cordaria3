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
		getProgress(state) {
			return state.progress
		},

		getCurrentLesson(state) {
			return state.lesson
		},

		getScore(state) {
			return state.score
		},
	},

	actions: {
		generateProgress() {
			return {
				userId: useMyUserStore().getId as unknown as ObjectId,
				lesson: this.lesson._id as unknown as ObjectId,
				isCompleted: false,
				instrument: useMySettingsStore().getInstrument,
				currentLesson: this.lesson.number,
			} as Progress
		},

		async loadProgress() {
			const progress = (await useIProgress().getProgress(
				useMyUserStore().getId,
				useMySettingsStore().getInstrument,
			)) as Progress

			if (!progress) {
				const firstLessonNumber = 1
				await this.getLesson(firstLessonNumber)
				const progress = this.generateProgress()
				this.postProgress(progress)

				this.progress = progress
				return
			}

			this.progress = progress
			this.getLessonById()
		},

		async loadNextProgress() {
			const nextLessonNumber = this.progress.currentLesson + 1
			await this.getLesson(nextLessonNumber)

			const progress = await this.generateProgress()

			await this.postProgress(progress)

			this.progress = progress
		},

		async postProgress(progress: Progress) {
			useIProgress().postProgress(progress)
		},

		async updateProgress() {
			this.progress.isCompleted = true
			await useIProgress().setProgress(this.progress)
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

		generateScore() {
			return {
				userId: useMyUserStore().getId as unknown as ObjectId,
				instrument: useMySettingsStore().getInstrument,
				score: this.score,
			} as unknown as Score
		},

		async loadScore() {
			const score = (await useIScore().getScore(
				useMyUserStore().getId,
				useMySettingsStore().getInstrument,
			)) as Score

			if (score) {
				this.score = score.score
				return
			}
			await this.postScore()
		},

		async postScore() {
			const score = this.generateScore() as unknown as Score
			await useIScore().postScore(score)
		},

		updateScore() {
			this.score += !this.progress.isCompleted
				? this.lesson.points
				: this.lesson.points / 2

			this.postScore()
		},
	},
})
