export const useIUser = () => {
	const registerUrl = '/api/auth/register'
	const userDetailsUrl = '/api/userdetails'

	async function createUser(values: any) {
		return await $fetch(registerUrl, {
			method: 'post',
			body: values,
		})
	}

	async function getUserDetails(id: string | null) {
		return await useFetch(userDetailsUrl, {
			method: 'get',
			params: { id: id },
		})
	}

	async function postUserDetails(values: any) {
		return await useFetch(userDetailsUrl, {
			method: 'post',
			body: values,
		})
	}

	async function setUserDetails(body: {}) {
		return await $fetch(userDetailsUrl, {
			method: 'put',
			body: body,
		})
	}

	return { createUser, getUserDetails, postUserDetails, setUserDetails }
}
