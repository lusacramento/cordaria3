import { defineStore } from 'pinia'
import { type Progress } from '~/types/Progress'
import { type Lesson } from '~/types/Lesson'

export const useMyProgressStore = defineStore({
	id: 'myProgressStore',
	state: () => ({
		progress: {} as Progress,
		lesson: null as Lesson | null,
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
	},
})
