export default defineNuxtRouteMiddleware(async (to, from) => {
	const { status, getSession } = useAuth()

	const session = await getSession()
	// @ts-ignore
	const name = session.user.username
	console.log(name)

	if (status.value !== 'authenticated' && name !== 'admin') {
		return navigateTo({
			name: 'index',
		})
	}
})
