<template>
	<div id="ranking" class="ranking">
		<div class="container-fluid">
			<LayoutsHeader>
				<template #center>
					<button
						type="button"
						class="btn btn-outline-success"
						@click.prevent="update(Instrument.ACOUSTICGUITAR)"
						:class="{ active: instrument === Instrument.ACOUSTICGUITAR }"
					>
						Violão
					</button>
					<button
						type="button"
						class="btn btn-outline-danger"
						:class="{ active: instrument === Instrument.ELECTRICGUITAR }"
						@click.prevent="update(Instrument.ELECTRICGUITAR)"
					>
						Guitarra
					</button>
					<button
						type="button"
						class="btn btn-outline-warning"
						@click.prevent="update(Instrument.BASS)"
						:class="{ active: instrument === Instrument.BASS }"
					>
						Baixo
					</button>
					<button
						type="button"
						class="btn btn-outline-info"
						@click.prevent="update(Instrument.CAVACO)"
						:class="{ active: instrument === Instrument.CAVACO }"
					>
						Cavaquinho
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
				awards: 0,
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
		width: 150px;
	}
</style>
