export default defineNuxtRouteMiddleware(async (to, from) => {
	const { status, getSession } = useAuth()

	console.log(status.value)
	try {
		const session = await getSession()

		console.log(session)

		// @ts-ignore
		const name = session.user.username
		console.log(name)

		if (status.value === 'authenticated' && name === 'admin') {
			return
		}
	} catch (error) {
		return navigateTo({
			name: 'index',
		})
	}
})
