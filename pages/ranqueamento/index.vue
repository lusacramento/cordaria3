<template>
	<div id="ranking" class="ranking">
		<LayoutsHeader>
			<template #center>
				<div class="row d-flex justify-content-center">
					<div class="col">
						<button
							type="button"
							class="btn btn-acoustic-guitar d-flex justify-content-center"
							:class="{ active: instrument === Instrument.ACOUSTICGUITAR }"
							@click.prevent="update(Instrument.ACOUSTICGUITAR)"
						>
							<img :src="acousticGuitarIcon" alt="" class="img" />
						</button>
					</div>
					<div class="col">
						<button
							type="button"
							class="btn btn-electric-guitar d-flex justify-content-center"
							:class="{ active: instrument === Instrument.ELECTRICGUITAR }"
							@click.prevent="update(Instrument.ELECTRICGUITAR)"
						>
							<img :src="electricGuitarIcon" alt="" class="img" />
						</button>
					</div>
					<div class="col">
						<button
							type="button"
							class="btn btn-bass d-flex justify-content-center"
							:class="{ active: instrument === Instrument.BASS }"
							@click.prevent="update(Instrument.BASS)"
						>
							<img :src="bassIcon" alt="" class="img" />
						</button>
					</div>
					<div class="col">
						<button
							type="button"
							class="btn btn-cavaco d-flex justify-content-center"
							:class="{ active: instrument === Instrument.CAVACO }"
							@click.prevent="update(Instrument.CAVACO)"
						>
							<img :src="cavacoIcon" alt="" class="img" />
						</button>
					</div>
				</div>
			</template>
		</LayoutsHeader>

		<div class="container content layer-center">
			<div class="row d-flex justify-content-center">
				<div class="col-11 col-lg-10">
					<RankingTable :ranking="ranking" />
				</div>
			</div>
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

	const instrument = ref(Instrument.BASS)
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
		width: 92.8px;
		height: 95px;
		border-radius: 50%;
	}

	.img {
		display: block;
		width: 140%;
	}

	.layer-center {
		height: 50vh;
	}

	.btn-acoustic-guitar.active,
	.btn-electric-guitar.active,
	.btn-bass.active,
	.btn-cavaco.active {
		border: none;
	}
	.btn-acoustic-guitar.active {
		background-color: var(--active-acoustic-guitar-color) !important;
	}
	.btn-electric-guitar.active {
		background-color: var(--active-electric-guitar-color) !important;
	}
	.btn-bass.active {
		background-color: var(--active-bass-color) !important;
	}
	.btn-cavaco.active {
		background-color: var(--active-cavaco-color) !important;
	}

	.btn-acoustic-guitar:not(.active):hover {
		background-color: var(--hover-acoustic-guitar-color);
	}
	.btn-electric-guitar:not(.active):hover {
		background-color: var(--hover-electric-guitar-color);
	}
	.btn-bass:not(.active):hover {
		background-color: var(--hover-bass-color);
	}
	.btn-cavaco:not(.active):hover {
		background-color: var(--hover-cavaco-color);
	}
</style>
