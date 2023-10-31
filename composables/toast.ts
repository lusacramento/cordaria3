import { useToast } from 'vue-toastification'
import { POSITION } from 'vue-toastification'
const toast = useToast()

export const useTt = (
	id: string,
	message: string,
	type: string,
	timeout: number,
) => {
	const options = {
		id: id,
		position: POSITION.TOP_RIGHT,
		timeout: timeout,
		closeOnClick: false,
		pauseOnFocusLoss: false,
		pauseOnHover: false,
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
		case 'update':
			toast.update(options.id, { options })

		default:
			toast(message, options)
			break
	}
}
