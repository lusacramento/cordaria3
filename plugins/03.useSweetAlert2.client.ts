import * as sweetAlert from 'sweetalert2'

export default defineNuxtPlugin(() => {
	return {
		provide: {
			sweetAlert: sweetAlert,
		},
	}
})
