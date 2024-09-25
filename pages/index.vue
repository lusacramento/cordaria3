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
			<aside class="row d-flex justify-content-center">
				<div class="col-lg-12 col-md-9 col-12">
					<button
						type="button"
						class="btn"
						@click.prevent="loadInstrument(Instrument.CAVACO)"
						@mouseover="enableInstrumentImage(Instrument.CAVACO)"
						@mouseleave="disableInstrumentImage"
					>
						<img :src="instrumentImage.cavaco" alt="" class="img-fluid" />
					</button>
					<button
						type="button"
						class="btn"
						@click.prevent="loadInstrument(Instrument.ACOUSTICGUITAR)"
						@mouseover="enableInstrumentImage(Instrument.ACOUSTICGUITAR)"
						@mouseleave="disableInstrumentImage"
					>
						<img
							:src="instrumentImage.acousticGuitar"
							alt=""
							class="img-fluid"
						/>
					</button>
					<button
						type="button"
						class="btn"
						@click.prevent="loadInstrument(Instrument.ELECTRICGUITAR)"
						@mouseover="enableInstrumentImage(Instrument.ELECTRICGUITAR)"
						@mouseleave="disableInstrumentImage"
					>
						<img
							:src="instrumentImage.electricGuitar"
							alt=""
							class="img-fluid"
						/>
					</button>
					<button
						type="button"
						class="btn"
						@click.prevent="loadInstrument(Instrument.BASS)"
						@mouseover="enableInstrumentImage(Instrument.BASS)"
						@mouseleave="disableInstrumentImage"
					>
						<img :src="instrumentImage.bass" alt="" class="img-fluid" />
					</button>
				</div>
			</aside>
		</div>
	</div>
</template>

<script lang="ts" setup>
	import acousticGuitarDisabled from '~/public/imgs/instruments/index/acoustic-guitar-disabled.png'
	import acousticGuitarEnabled from '~/public/imgs/instruments/index/acoustic-guitar-enabled.png'
	import electricGuitarDisabled from '~/public/imgs/instruments/index/electric-guitar-disabled.png'
	import electricGuitarEnabled from '~/public/imgs/instruments/index/electric-guitar-enabled.png'
	import bassDisabled from '~/public/imgs/instruments/index/bass-disabled.png'
	import bassEnabled from '~/public/imgs/instruments/index/bass-enabled.png'
	import cavacoDisabled from '~/public/imgs/instruments/index/cavaco-disabled.png'
	import cavacoEnabled from '~/public/imgs/instruments/index/cavaco-enabled.png'

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

	onBeforeMount(async () => {
		await loadSettings()
	})

	const title = 'Já praticou hoje?'

	const instrument = ref(Instrument.NOT_SELECTED)

	const instrumentImage = ref({
		acousticGuitar: acousticGuitarDisabled,
		electricGuitar: electricGuitarDisabled,
		bass: bassDisabled,
		cavaco: cavacoDisabled,
	})

	function enableInstrumentImage(instrument: Instrument) {
		switch (instrument) {
			case Instrument.CAVACO:
				instrumentImage.value.cavaco = cavacoEnabled
				break
			case Instrument.ACOUSTICGUITAR:
				instrumentImage.value.acousticGuitar = acousticGuitarEnabled
				break
			case Instrument.ELECTRICGUITAR:
				instrumentImage.value.electricGuitar = electricGuitarEnabled
				break
			case Instrument.BASS:
				instrumentImage.value.bass = bassEnabled
				break
		}
	}

	function disableInstrumentImage() {
		if (instrument.value !== Instrument.CAVACO)
			instrumentImage.value.cavaco = cavacoDisabled

		if (instrument.value !== Instrument.ACOUSTICGUITAR)
			instrumentImage.value.acousticGuitar = acousticGuitarDisabled

		if (instrument.value !== Instrument.ELECTRICGUITAR)
			instrumentImage.value.electricGuitar = electricGuitarDisabled

		if (instrument.value !== Instrument.BASS)
			instrumentImage.value.bass = bassDisabled
	}

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
			instrument.value = await useMySettingsStore().getInstrument
			enableInstrumentImage(instrument.value)
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
		width: 260px;
		border: transparent;
	}
</style>
