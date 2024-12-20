let mongoUrl
let authOrigin

if (process.env.NODE_ENV === 'production') {
	mongoUrl = process.env.MONGODB_URI
	authOrigin = process.env.AUTH_ORIGIN
} else {
	mongoUrl = process.env.MONGODB_URI_DEV
	authOrigin = process.env.AUTH_ORIGIN_DEV
}

export default defineNuxtConfig({
	experimental: {
		asyncContext: true,
		renderJsonPayloads: false,
	},
	ssr: false,

	runtimeConfig: {
		authSecret: process.env.AUTH_SECRET,
		mongorUrl: mongoUrl,
	},

	nitro: {
		plugins: ['~/server/index.ts'],
	},

	devtools: { enabled: true },

	devServer: {
		port: 8000,
	},

	app: {
		pageTransition: { name: 'page', mode: 'out-in' },
	},

	modules: [
		[
			'nuxt-file-storage',
			{
				mount: process.env.STORAGE_LOCAL_DIR,
			},
		],
		'@pinia/nuxt',
		['@sidebase/nuxt-auth', { auth: { baseURL: authOrigin } }],
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
		'nuxt-mongoose',
		[
			'@nuxtjs/color-mode',
			{
				preference: 'dark', // default value of $colorMode.preference
				fallback: 'dark', // fallback value if not system preference found
				hid: 'nuxt-color-mode-script',
				globalName: '__NUXT_COLOR_MODE__',
				componentName: 'ColorScheme',
				classPrefix: '',
				classSuffix: '-mode',
				storage: 'localStorage', // or 'sessionStorage' or 'cookie'
				storageKey: 'nuxt-color-mode',
			},
		],
		[
			'@vite-pwa/nuxt',
			{
				devOptions: {
					enabled: true,
					suppressWarnings: true,
					navigateFallback: '/',
					navigateFallbackAllowlist: [/^\/$/],
					type: 'module',
				},
				registerWebManifestInRouteRules: true,
				registerType: 'autoUpdate',
				manifest: {
					name: 'Cordaria App',
					short_name: 'CordariaApp',
					description:
						'Cordaria é um método de treinamento para a prática de instrumentos de cordas',
					lang: 'pt',
					display: 'fullscreen',
					orientation: 'portrait-primary',
					theme_color: '#1c1f26',
					background_color: '#1c1f26',
					icons: [
						{
							src: '/imgs/icons/icon-192x192.png',
							sizes: '192x192',
							type: 'image/png',
						},
					],
					screenshots: [
						{
							src: 'imgs/screenshots/desktop.png',
							sizes: '1914x1004',
							type: 'image/png',
							form_factor: 'wide',
							label: 'Cordaria App Desktop',
							platform: 'desktop',
						},
						{
							src: 'imgs/screenshots/mobile.png',
							sizes: '939x431',
							type: 'image/png',
							form_factor: 'narrow',
							label: 'Cordaria App Mobile',
						},
					],
				},

				client: {
					installPrompt: true,
				},
				workbox: {
					globPatterns: ['**/*.{js,css,html,png,svg,ico,jpg}'],
				},
				injectManifest: {
					globPatterns: ['**/*.{js,css,html,png,svg,ico,jpg}'],
				},
			},
		],
	],

	// sourcemap: true,

	debug: true,

	css: [
		'~/assets/styles/main.scss',
		'~/assets/styles/themes.css',
		'~/assets/styles/fonts.css',
	],

	imports: {
		dirs: ['composables/**'],
	},

	compatibilityDate: '2024-08-15',
})
