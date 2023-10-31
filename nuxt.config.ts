// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
	devtools: { enabled: false },

	devServer: {
		port: 8000,
	},

	sourcemap: true,

	debug: true,

	css: ['~/assets/styles/main.scss'],

	imports: {
		dirs: ['composables/**'],
	},
})
