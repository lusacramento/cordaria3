<template>
	<div id="the-project" class="the-project">
		<LayoutsHeader>
			<template #center>
				<div class="d-flex justify-content-center align-items-center">
					<LayoutsBox
						:title-text="box.titleText"
						:schema="box.schema"
						:left-logo="box.leftLogo"
					/>
				</div>
			</template>
		</LayoutsHeader>
		<div
			class="container content d-flex align-items-center justify-content-center"
		>
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
	lockOrientation('portrait-primary')

	const { isMobile } = useInstrumentSelector()

	async function loadSettings() {
		const { getSession } = useAuth()
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

	const box = {
		titleText: '<h1>Já praticou hoje?<h1>',
		schema: 'index',
		leftLogo: true,
	}
</script>

<style scoped>
	a {
		font-size: 1.5em !important;
	}
	#the-project {
		text-align: center;
	}

	.large-line-height {
		line-height: 1.7;
	}

	.btn {
		width: 260px;
		border: transparent;
	}

	.content {
		width: 80vw;
		height: 55vh;
	}
</style>
