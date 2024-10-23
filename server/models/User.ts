import { required } from '@vee-validate/rules'
import { model, Schema } from 'mongoose'

export interface UserDocument extends Document {
	email: string
	userName: string
	password: string
	rescuePassword: {
		token: string
		expiresAt: Date
	}
}

const UserSchema = new Schema(
	{
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
			token: {
				type: String,
			},
			expiresAt: {
				type: Date,
				default: () => expiresAt(),
			},
		},
	},
	{ timestamps: true },
)

function expiresAt() {
	const more30min = 30 * 60 * 1000
	const more2min = 2 * 60 * 1000
	return new Date(Date.now() + more2min)
}

export const User = model<UserDocument>('User', UserSchema)
