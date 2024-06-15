import { model, Schema } from 'mongoose'

export interface UserDocument extends Document {
	email: string
	username: string
	password: string
}

const UserSchema = new Schema({
	email: {
		type: String,
		required: true,
		unique: true,
		lowercase: true,
		index: true,
	},

	username: {
		type: String,
		required: true,
		unique: true,
		lowercase: true,
	},

	password: {
		type: String,
		required: true,
		length: [9, 'Senha deve conter pelo menos 9 caracteres.'],
	},
})

export const User = model<UserDocument>('User', UserSchema)
