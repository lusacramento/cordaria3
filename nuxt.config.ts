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

	modules: [
		'@pinia/nuxt',
		[
			'@vee-validate/nuxt',
			{
				autoImports: true,

				componentNames: {
					Form: 'VeeForm',
					Field: 'VeeField',
					FieldArray: 'VeeFieldArray',
					ErrorMessage: 'VeeErrorMessage',
				},
			},
		],
		[
			'@nuxtjs/google-fonts',
			{
				families: {
					'Encode+Sans': true,
					wght: [100, 200, 300, 400, 500, 600, 700, 800, 900],
				},
				download: true,
			},
		],
	],

	sourcemap: true,

	// debug: true,

	css: ['~/assets/styles/main.scss'],

	imports: {
		dirs: ['composables/**'],
	},
})
