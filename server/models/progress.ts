import { model, ObjectId, Schema } from 'mongoose'
import { Instrument } from '~/types/Instrument'

export interface ProgressDocument extends Document {
	userId: ObjectId
	lesson: ObjectId
	isCompleted: boolean
	instrument: Instrument
	currentLesson: number
}

const ProgressSchema = new Schema({
	userId: {
		type: Schema.Types.ObjectId,
		required: true,
	},

	lesson: {
		type: Schema.Types.ObjectId,
		required: true,
	},

	isCompleted: {
		type: Boolean,
		required: true,
		default: false,
	},

	instrument: {
		type: String,
		required: true,
	},

	currentLesson: {
		type: Number,
		required: true,
	},
})

export const Progress = model<ProgressDocument>('Progress', ProgressSchema)
