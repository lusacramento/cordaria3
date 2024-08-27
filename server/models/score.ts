import { model, Schema, ObjectId } from 'mongoose'
import { Instrument } from '~/types/Instrument'

export interface ScoreDocument extends Document {
	userId: ObjectId
	instrument: Instrument
	score: number
}

const ScoreSchema = new Schema({
	userId: {
		type: Schema.Types.ObjectId,
		required: true,
	},

	instrument: {
		type: String,
		required: true,
		enum: Object.values(Instrument),
		unique: false,
		index: false,
	},

	score: {
		type: Number,
		required: true,
	},
})

export const Score = model<ScoreDocument>('Score', ScoreSchema)