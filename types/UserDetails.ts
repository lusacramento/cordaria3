import { type ObjectId } from 'mongoose'
export interface UserDetails {
	_id: ObjectId
	userId: ObjectId
	fullName: string
	age: number
	state: string
	country: string
	imageUrl: string
}
