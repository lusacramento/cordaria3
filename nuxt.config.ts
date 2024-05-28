// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
	// experimental: {
	// 	asyncContext: true,
	// 	renderJsonPayloads: false,
	// },

	runtimeConfig: {
		mongorUrl: process.env.MONGODB_URI,
	},

	nitro: {
		plugins: ['~/server/index.ts'],
	},

	devtools: { enabled: false },

	devServer: {
		port: 8000,
	},

	modules: ['@pinia/nuxt'],

	sourcemap: true,

	// debug: true,

	css: ['~/assets/styles/main.scss'],

	imports: {
		dirs: ['composables/**'],
	},
})
