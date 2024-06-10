import { useAuthUser } from '~/composables/authUser'

export default defineNuxtRouteMiddleware((to, from) => {
	const user = useAuthUser()

	if (!user.value) return navigateTo({ name: 'index' })
})
