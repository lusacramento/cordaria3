<template>
	<div id="ranking" class="ranking">
		<div class="container-fluid">
			<LayoutsHeader>
				<template #center>
					<button
						type="button"
						class="btn btn-acoustic-guitar"
						@click.prevent="update(Instrument.ACOUSTICGUITAR)"
						:class="{ active: instrument === Instrument.ACOUSTICGUITAR }"
					>
						<img :src="acousticGuitarIcon" alt="" class="img-fluid" />
					</button>
					<button
						type="button"
						class="btn btn-electric-guitar"
						:class="{ active: instrument === Instrument.ELECTRICGUITAR }"
						@click.prevent="update(Instrument.ELECTRICGUITAR)"
					>
						<img :src="electricGuitarIcon" alt="" class="img-fluid" />
					</button>
					<button
						type="button"
						class="btn btn-bass"
						@click.prevent="update(Instrument.BASS)"
						:class="{ active: instrument === Instrument.BASS }"
					>
						<img :src="bassIcon" alt="" class="img-fluid" />
					</button>
					<button
						type="button"
						class="btn btn-cavaco"
						@click.prevent="update(Instrument.CAVACO)"
						:class="{ active: instrument === Instrument.CAVACO }"
					>
						<img :src="cavacoIcon" alt="" class="img-fluid" />
					</button>
				</template>
			</LayoutsHeader>
		</div>
		<div class="container layer-center">
			<RankingTable :ranking="ranking" />
		</div>
	</div>
</template>

<script lang="ts" setup>
	import { Instrument } from '~/types/Instrument'
	import type { Ranking } from '~/types/Ranking'
	import acousticGuitarIcon from '~/assets/imgs/instrument-list/acoustic-guitar-icon.png'
	import electricGuitarIcon from '~/assets/imgs/instrument-list/electric-guitar-icon.png'
	import bassIcon from '~/assets/imgs/instrument-list/bass-icon.png'
	import cavacoIcon from '~/assets/imgs/instrument-list/cavaco-icon.png'

	const { getInstrument } = useMySettingsStore()

	const instrument = ref(Instrument.ACOUSTICGUITAR)
	const ranking: Ref<Array<Ranking>> = ref([])

	onBeforeMount(async () => {
		if (getInstrument !== Instrument.NOT_SELECTED)
			instrument.value = await getInstrument

		await getRanking()
	})

	function update(newInstrument: Instrument) {
		instrument.value = newInstrument

		ranking.value = []

		getRanking()
	}

	async function getRanking() {
		const response = await useIRanking().getRanking(instrument.value)
		toRanking(response)
	}

	function toRanking(response: any[]) {
		return response.forEach((element, i) => {
			const position = {
				position: i + 1,
				userName: element.username,
				points: element.score,
				awards: element.awards,
			} as unknown as Ranking

			ranking.value.push(position)
		})
	}
</script>

<style scoped>
	a {
		font-size: 1.5em !important;
	}
	#ranking {
		text-align: center;
	}

	.large-line-height {
		line-height: 1.7;
	}

	.btn {
		margin: 5px;
		width: 100px;
		height: 100px;
		border-radius: 50%;
		border: none;
	}

	.layer-center {
		height: 50vh;
	}

	.btn-acoustic-guitar.active {
		background-color: var(--acoustic-guitar-color) !important;
	}
	.btn-electric-guitar.active {
		background-color: var(--electric-guitar-color) !important;
	}
	.btn-bass.active {
		background-color: var(--bass-color) !important;
	}
	.btn-cavaco.active {
		background-color: var(--cavaco-color) !important;
	}

	.btn-acoustic-guitar:not(.active):hover {
		background: transparent;
		border: 1px solid var(--acoustic-guitar-color);
	}
	.btn-electric-guitar:not(.active):hover {
		background: transparent;
		border: 1px solid var(--electric-guitar-color);
	}
	.btn-bass:not(.active):hover {
		background: transparent;
		border: 1px solid var(--bass-color);
	}
	.btn-cavaco:not(.active):hover {
		background: transparent;
		border: 1px solid var(--cavaco-color);
	}
</style>
