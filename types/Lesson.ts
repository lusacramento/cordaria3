import type { LessonMessage } from './LessonMessage'

export interface Lesson {
	_id?: string
	number: number
	quantityOfStrings: number
	level: string
	firstFinger: number
	stringNumber: string
	bpm: number
	message: LessonMessage
	points: number
}
