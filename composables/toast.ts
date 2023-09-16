import { useToast } from 'vue-toastification'
import { POSITION } from 'vue-toastification'
const toast = useToast()

export const useTt = (message: string, type: string, timeout: number) => {
	const options = {
		position: POSITION.BOTTOM_RIGHT,
		timeout: timeout,
		closeOnClick: true,
		pauseOnFocusLoss: true,
		pauseOnHover: true,
	}

	switch (type) {
		case 'success':
			toast.success(message, options)
			break
		case 'info':
			toast.info(message, options)
			break
		case 'error':
			toast.error(message, options)
			break
		case 'warning':
			toast.warning(message, options)
			break

		default:
			toast(message, options)
			break
	}
}
