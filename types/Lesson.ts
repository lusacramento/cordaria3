import type { SweetAlertIcon } from 'sweetalert2'

export interface Lesson {
	_id?: string
	number: number
	quantityOfStrings: number
	level: string
	firstFinger: number
	stringNumber: string
	bpm: number
	messageIcon: SweetAlertIcon
	messageTitle: string
	message: string
	points: number
}
