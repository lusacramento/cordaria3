// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
	experimental: {
		asyncContext: true,
		renderJsonPayloads: false,
	},
	ssr: false,

	runtimeConfig: {
		authSecret: process.env.AUTH_SECRET,
		mongorUrl: process.env.MONGODB_URI,
	},

	nitro: {
		plugins: ['~/server/index.ts'],
	},

	devtools: { enabled: true },

	devServer: {
		port: 8000,
	},

	modules: [
		[
			'nuxt-file-storage',
			{
				mount: process.env.STORAGE_LOCAL_DIR,
			},
		],
		'@pinia/nuxt',
		[
			'nuxt-server-utils',
			{
				enabled: true, // default
				enableDevTools: true, // default
				mongodbUri: process.env.MONGODB_URI,
			},
		],

		['@sidebase/nuxt-auth', { auth: { baseURL: process.env.AUTH_ORIGIN } }],
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

	// sourcemap: true,

	debug: true,

	css: ['~/assets/styles/main.scss'],

	imports: {
		dirs: ['composables/**'],
	},

	compatibilityDate: '2024-08-15',
})
