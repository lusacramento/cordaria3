<template>
	<div id="the-project" class="the-project">
		<LayoutsHeader>
			<template #center>
				<div class="d-flex justify-content-center align-items-center">
					<LayoutsBox :box="box" />
				</div>
			</template>
		</LayoutsHeader>
		<div class="container content d-flex align-items-center justify-content-center">
			<aside class="row d-flex justify-content-center">
				<div v-if="isMobile">
					<InstrumentsSelectorCarousel />
				</div>
				<div v-else>
					<InstrumentsSelectorInline />
				</div>
			</aside>
		</div>
	</div>
</template>

<script lang="ts" setup>
import { useScreenOrientation } from '@vueuse/core'
import { type Box } from '~/types/Box'
useHead({
	meta: [
		{
			hid: 'titleprojeto',
			name: 'title',
			content: 'Cordaria - Já praticou hoje?',
		},
		{
			hid: 'projeto',
			name: 'description',
			content:
				'O projeto Cordaria é resultado de uma pesquisa que vem para auxiliar, educandos e professores, a prática de violão e guitarra',
		},
		{
			hid: 'projetokeys',
			name: 'keywords',
			content: 'pesquisa, prática, música, projeto, violão, guitarra, método',
		},
	],
	link: [
		{
			rel: 'canonical',
			href: 'https://cordaria.com.br',
		},
	],
})

onBeforeMount(async () => {
	await loadSettings()
})

const { lockOrientation } = useScreenOrientation()

if (useMobile().isMobileDevice()) lockOrientation('portrait-primary')

const { isMobile } = useInstrumentSelector()

async function loadSettings() {
	const { getSession } = useAuth()
	// @ts-ignore
	const { user } = await getSession()

	if (user) {
		const { setId, setUserName, logIn } = useMyUserStore()
		// @ts-ignore
		setId(user._id)
		// @ts-ignore
		setUserName(user?.username)
		logIn()

		await useMySettingsStore().load()
	}
}

const box: Box = {
	content: '<h1>Já praticou hoje?<h1>',
	schema: 'index',
	leftLogo: true,
}
</script>
