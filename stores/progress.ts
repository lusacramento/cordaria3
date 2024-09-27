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

		async load(currentLesson?: number) {
			const progress: Ref<any> = ref()
			try {
				progress.value = !currentLesson
					? ((await useIProgress().getLastProgress(
							useMyUserStore().getId,
							useMySettingsStore().getInstrument,
					  )) as Progress)
					: ((await useIProgress().getProgress(
							useMyUserStore().getId,
							useMySettingsStore().getInstrument,
							currentLesson,
					  )) as Progress)
			} catch (error) {
				console.error(error)
			}

			if (!progress.value) {
				const firstLessonNumber = 1
				await this.getLesson(firstLessonNumber)
				const progress = this.generate()
				this.post(progress)
				return
			}

			this.progress = progress as unknown as Progress

			await this.getLessonById()
		},

		async loadNext() {
			const nextLessonNumber = this.progress.currentLesson + 1
			await this.getLesson(nextLessonNumber)

			const progress = await this.generate()

			await this.post(progress)
		},

		async post(progress: Progress) {
			this.progress = (await useIProgress().postProgress(progress)) as Progress
		},

		async update() {
			this.progress.isCompleted = true
			this.progress = (await useIProgress().setProgress(
				this.progress,
			)) as Progress
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
			this.clearStore()
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
				: Math.round(this.lesson.points / 2)
		},

		clearStore() {
			this.score = 0
		},

		verifyIfAwarded() {
			if (this.lesson.message.isAwarded) this.awards++
		},
	},
})
