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

		async addProgress(progress: Progress, lesson: Lesson) {
			// this.progress.push(progress)
			// this.setLesson(lesson)
		},

		setLesson(lesson: Lesson) {
			this.lesson = lesson
		},

		setIsCompleted(status: boolean) {
			// const indexProgress = this.progress.length - 1
			// const lastProgress = this.progress[indexProgress]
			// lastProgress.isCompleted = true
		},

		setScore() {
			// if (!this.lesson) return
			// if (this.progress[this.progress.length - 1].isCompleted) {
			// 	this.score += this.lesson?.points / 2
			// } else this.score += this.lesson?.points
		},
	},
})
