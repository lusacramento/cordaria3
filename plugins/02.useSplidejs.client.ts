import Splide from '@splidejs/vue-splide'
export default defineNuxtPlugin((nuxtApp) => {
	return {
		provide: {
			Splide: Splide,
		},
	}
})
