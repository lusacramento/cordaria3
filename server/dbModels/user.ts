import mongoose from 'mongoose'
import bcrypt from 'mongoose-bcrypt'
const schema: any = new mongoose.Schema(
	{
		email: { type: String, unique: true },
		password: { type: String, bcrypt: true },
		userName: { type: String },
	},
	{ timestamps: true, strict: true, strictQuery: true },
)
schema.plugin(bcrypt)
export default mongoose.model('User', schema, 'user')
