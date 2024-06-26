export const useIUser = () => {
	async function createUser(values: any) {
		return await useFetch('/api/auth/register', {
			method: 'post',
			body: values,
		})
	}

	async function getUserDetails(id: string | null) {
		return await useFetch('/api/userdetails', {
			method: 'get',
			params: { id: id },
		})
	}

	async function postUserDetails(values: any) {
		return await useFetch('/api/userdetails', {
			method: 'post',
			body: values,
		})
	}

	return { createUser, getUserDetails, postUserDetails }
}
