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
		awards: 0 as number,
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
		generate() {
			return {
				userId: useMyUserStore().getId as unknown as ObjectId,
				lesson: this.lesson._id as unknown as ObjectId,
				isCompleted: false,
				instrument: useMySettingsStore().getInstrument,
				currentLesson: this.lesson.number,
			} as Progress
		},

		async load() {
			const progress = (await useIProgress().getProgress(
				useMyUserStore().getId,
				useMySettingsStore().getInstrument,
			)) as Progress

			if (!progress) {
				const firstLessonNumber = 1
				await this.getLesson(firstLessonNumber)
				const progress = this.generate()
				this.post(progress)

				this.progress = progress
				return
			}

			this.progress = progress
			this.getLessonById()
		},

		async loadNext() {
			const nextLessonNumber = this.progress.currentLesson + 1
			await this.getLesson(nextLessonNumber)

			const progress = await this.generate()

			await this.post(progress)

			this.progress = progress
		},

		async post(progress: Progress) {
			useIProgress().postProgress(progress)
		},

		async update() {
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
				awards: this.awards,
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
			this.calculateScore()

			this.verifyIfAwarded()

			this.postScore()
		},

		calculateScore() {
			this.score += !this.progress.isCompleted
				? this.lesson.points
				: this.lesson.points / 2
		},

		verifyIfAwarded() {
			if (this.lesson.message.isAwarded) this.awards++
		},
	},
})
