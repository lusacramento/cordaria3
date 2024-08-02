import { model, Schema } from 'mongoose'

export interface LessonDocument extends Document {
	number: number
	level: string
	firstFinger: number
	stringNumber: string
	bpm: number
	message: string
	quantityOfStrings: string
}

const LessonSchema = new Schema({
	number: {
		type: Number,
		required: true,
	},

	level: {
		type: String,
		required: true,
	},

	firstFinger: {
		type: Number,
		required: true,
	},

	stringNumber: {
		type: String,
		required: true,
	},

	bpm: {
		type: Number,
		required: true,
	},

	message: {
		type: String,
	},

	quantityOfStrings: {
		type: Number,
		required: true,
	},
})

export const Lesson = model<LessonDocument>('Lesson', LessonSchema)
