export const useValidations = () => {
	function validateEmail(email: string) {
		var re = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/g
		return re.test(email)
	}

	function validateUserName(name: string) {
		if (name.length >= 3 && name.length <= 16 && sanitize(name)) return true

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

	function validateFullName(fullName: string) {
		if (
			fullName.length >= 3 &&
			fullName.length <= 50 &&
			fullName !== ' ' &&
			sanitize(fullName)
		)
			return true
		return false
	}

	function validateAge(age: number) {
		if (age >= 5 && age <= 120) return true
		return false
	}

	function validateState(state: string) {
		if (state.length >= 2 && state.length <= 30 && sanitize(state)) return true
		return false
	}


	return {
		validateEmail,
		validateUserName,
		validatePassword,
		validateConfirmPassword,
	}
}
