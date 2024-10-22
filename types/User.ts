export interface User {
	_id?: string
	email: string
	userName: string
	password: string
	confirmPassword?: string
	acceptTerms?: boolean
	rescuePassword?: string
}
