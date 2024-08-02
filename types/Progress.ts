import { type ObjectId } from 'mongoose'
import { Instrument } from './Instrument'

export interface Progress {
	userId: ObjectId
	lesson: ObjectId
	isCompleted: boolean
	instrument: Instrument
	currentLesson: number
}
