import { defineStore } from 'pinia'
import { type Progress } from '~/types/Progress'
import { type Lesson } from '~/types/Lesson'

export const useMyProgressStore = defineStore({
	id: 'myProgressStore',
	state: () => ({
		progress: [] as Progress[],
		lesson: null as Lesson | null,
	}),

	getters: {
		getCurrentLesson(state) {
			return state.lesson
		},

		getLastProgress(state) {
			const lastIndex = state.progress.length - 1
			return state.progress[lastIndex]
		},
	},

	actions: {
		async setProgress(progress: Progress[]) {
			this.progress = progress
		},

		async addProgress(progress: Progress, lesson: Lesson) {
			this.progress.push(progress)
			this.setLesson(lesson)
		},

		setLesson(lesson: Lesson) {
			this.lesson = lesson
		},

		setIsCompleted(status: boolean) {
			const indexProgress = this.progress.length - 1
			const lastProgress = this.progress[indexProgress]
			lastProgress.isCompleted = true
		},
	},
})
