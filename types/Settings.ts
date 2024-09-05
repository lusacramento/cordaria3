import { ViewMode } from './ViewMode'
import { type ObjectId } from 'mongoose'
import type { Instrument } from './Instrument'

export interface Settings {
	_id?: ObjectId
	userId: ObjectId
	instrument: Instrument
	viewMode: ViewMode
	counter: number
}
