import { model, Schema, ObjectId } from 'mongoose'
import { Instrument } from '~/types/Instrument'
import { ViewMode } from '~/types/ViewMode'

export interface SettingsDocument extends Document {
	userId: ObjectId
	instrument: Instrument
	viewMode: ViewMode
	counter: number
}

const SettingsSchema = new Schema({
	userId: {
		type: Schema.Types.ObjectId,
		ref: 'User',
		required: true,
		unique: true,
	},

	instrument: {
		type: String,
		required: true,
		enum: Object.values(Instrument),
		unique: false,
		index: false,
	},

	viewMode: {
		type: String,
		required: true,
		enum: Object.values(ViewMode),
	},

	counter: {
		type: Number,
		required: true,
	},
})

export const Settings = model<SettingsDocument>('Settings', SettingsSchema)
