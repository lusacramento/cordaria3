import { model, Schema } from 'mongoose'

export interface UserDocument extends Document {
	email: string
	userName: string
	password: string
	rescuePassword: string
}

const UserSchema = new Schema({
	email: {
		type: String,
		required: true,
		unique: true,
		lowercase: true,
		index: true,
	},

	userName: {
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
	rescuePassword: {
		type: String,
		required: false,
	},
})

export const User = model<UserDocument>('User', UserSchema)
