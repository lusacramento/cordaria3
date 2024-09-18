<template>
	<div id="the-project" class="the-project">
		<div class="container-fluid">
			<LayoutsHeader>
				<template #center>
					<div class="d-flex justify-content-center">
						<h1>{{ title }}</h1>
					</div>
				</template>
			</LayoutsHeader>
		</div>
		<div class="container layer-center">
			<aside class="row d-flex justify-content-center mt-4">
				<div class="col-lg-12 col-md-9 col-12">
					<button
						type="button"
						class="btn btn-outline-success"
						@click.prevent="loadInstrument(Instrument.ACOUSTICGUITAR)"
						:class="{ active: instrument === Instrument.ACOUSTICGUITAR }"
					>
						Violão
					</button>
					<button
						type="button"
						class="btn btn-outline-danger"
						:class="{ active: instrument === Instrument.ELECTRICGUITAR }"
						@click.prevent="loadInstrument(Instrument.ELECTRICGUITAR)"
					>
						Guitarra
					</button>
					<button
						type="button"
						class="btn btn-outline-warning"
						@click.prevent="loadInstrument(Instrument.BASS)"
						:class="{ active: instrument === Instrument.BASS }"
					>
						Baixo
					</button>
					<button
						type="button"
						class="btn btn-outline-info"
						@click.prevent="loadInstrument(Instrument.CAVACO)"
						:class="{ active: instrument === Instrument.CAVACO }"
					>
						Cavaquinho
					</button>
				</div>
			</aside>
		</div>
	</div>
</template>

<script lang="ts" setup>
	onBeforeMount(async () => {
		await loadSettings()
	})

	const instrument = ref(Instrument.NOT_SELECTED)
	import { Instrument } from '~/types/Instrument'

	useHead({
		title: 'Cordaria - O Projeto',
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
	const title = 'Selecione o seu instrumento e comece a jogar!'

	async function loadSettings() {
		const { getSession } = useAuth()
		const { user } = await getSession()

		if (user) {
			const { setId, setUserName, logIn } = useMyUserStore()
			// @ts-ignore
			setId(user._id)
			// @ts-ignore
			setUserName(user?.username)
			// @ts-ignore
			setId(user._id)
			logIn()

			await useMySettingsStore().load()
			instrument.value = useMySettingsStore().getInstrument
		}
	}

	async function loadInstrument(instrument: Instrument) {
		if (useMySettingsStore().getInstrument !== instrument) {
			await useMySettingsStore().setInstrument(instrument)
			await useMySettingsStore().update()
		} else {
			await useMySettingsStore().setInstrument(instrument)
		}

		redirectToPracticePage()
	}

	function redirectToPracticePage() {
		useRouter().push('/entrar')
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
		width: 170px;
		height: 400px;
		margin: 10px;
	}
</style>
