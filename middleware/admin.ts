export default defineNuxtRouteMiddleware(async (to, from) => {
	const { status, getSession } = useAuth()

	try {
		const session = await getSession()

		// @ts-ignore
		const name = session.user.userName

		if (name === 'admin' && status.value === 'authenticated') return

		await alert('Você não tem permissão para acessar esta página')
		useRouter().push('/')
	} catch (error) {
		return navigateTo({
			name: 'index',
		})
	}
})
