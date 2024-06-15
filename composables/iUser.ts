const { signIn } = useAuth()

export const useIUser = () => {
	async function createUser(values: any) {
		return await useFetch('/api/auth/register', {
			method: 'post',
			body: values,
		})
	}

	async function authenticate(values: any) {
		return await useFetch('/api/users/signin', {
			method: 'post',
			body: values,
		})
	}
	return { createUser, authenticate }
}
