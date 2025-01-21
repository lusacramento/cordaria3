import { model, ObjectId, Schema } from 'mongoose'

export interface UserDetailsDocument extends Document {
	userId: ObjectId
	fullName: string
	age: number
	state: string
	country: string
	avatar: string
}

const UserDetailsSchema = new Schema({
	userId: {
		type: Schema.ObjectId,
		required: true,
		unique: true,
		index: true,
	},

	fullName: {
		type: String,
		required: true,
	},

	age: {
		type: Number,
		required: true,
	},

	state: {
		type: String,
		required: true,
	},

	country: {
		type: String,
		required: true,
	},

	avatar: {
		type: String,
		required: true,
	},
})

export const UserDetails = model<UserDetailsDocument>(
	'UserDetails',
	UserDetailsSchema,
)
