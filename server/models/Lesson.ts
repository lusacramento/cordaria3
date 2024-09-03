import { model, Schema } from 'mongoose'

export interface LessonDocument extends Document {
	number: number
	level: string
	firstFinger: number
	stringNumber: string
	bpm: number
	messageIcon: string
	messageTitle: string
	message: string
	quantityOfStrings: string
	points: number
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

	messageIcon: {
		type: String,
	},

	messageTitle: {
		type: String,
	},

	message: {
		type: String,
	},

	quantityOfStrings: {
		type: Number,
		required: true,
	},

	points: {
		type: Number,
		required: true,
	},
})

export const Lesson = model<LessonDocument>('Lesson', LessonSchema)
