export const useIUser = () => {
	async function createUser(values: any) {
		return await useFetch('/api/auth/register', {
			method: 'post',
			body: values,
		})
	}

	return { createUser }
}
