export const useIUser = () => {
	async function createUser(values: any) {
		return await useFetch('/api/users', {
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
