import type { SweetAlertIcon } from 'sweetalert2'

export interface LessonMessage {
	title: 'string'
	description: 'string'
	icon: SweetAlertIcon
	isAwarded: boolean
}
