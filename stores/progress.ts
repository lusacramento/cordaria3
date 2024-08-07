import { defineStore } from 'pinia'
import { type Progress } from '~/types/Progress'
import { type Lesson } from '~/types/Lesson'

export const useMyProgressStore = defineStore({
	id: 'myProgressStore',
	state: () => ({
		progress: [] as Progress[] | [],
		lesson: null as Lesson | null,
	}),

	getters: {
		getCurrentLesson(state) {
			return state.lesson
		},
	},

	actions: {
		async setProgress(progress: Progress[]) {
			this.progress = progress
		},

		setLesson(lesson: Lesson) {
			this.lesson = lesson
		},
	},
})
