import { faTruckMonster } from '@fortawesome/free-solid-svg-icons'

export const useValidations = () => {
	function validateEmail(email: string) {
		var re = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/g
		return re.test(email)
	}

	function validateUserName(name: string) {
		if (name.length > 3 && name.length <= 16) return true

		return false
	}

	function validatePassword(password: string) {
		if (password.length >= 9) return true
		return false
	}

	function validateConfirmPassword(password: string, confirmPassword: string) {
		if (password === confirmPassword && confirmPassword !== '') return true
		return false
	}

	return {
		validateEmail,
		validateUserName,
		validatePassword,
		validateConfirmPassword,
	}
}