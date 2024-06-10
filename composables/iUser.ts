export const useIUser = () => {
	async function createUser(values: any) {
		return await useFetch('/api/users', {
			method: 'post',
			body: values,
		})
	}
}
