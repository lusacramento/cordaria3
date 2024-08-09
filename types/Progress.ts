import { type ObjectId } from 'mongoose'
import { Instrument } from './Instrument'

export interface Progress {
	_id?: ObjectId
	userId: ObjectId
	lesson: ObjectId
	isCompleted: boolean
	instrument: Instrument
	currentLesson: number
}
