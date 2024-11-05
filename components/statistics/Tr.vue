<template>
	<tr v-for="statistic in props.statistics" :key="statistic.number">
		<th scope="row">{{ statistic.number }}</th>
		<td>{{ statistic.level }}</td>
		<td>{{ statistic.bpm }}</td>
		<td>
			<button
				type="button"
				class="btn btn-success"
				@click.prevent="start(statistic.number)"
				:disabled="!statistic.isCompleted"
			>
				<font-awesome-icon class="fa fa-code" :icon="iconPlay" />
			</button>
		</td>
	</tr>
</template>

<script lang="ts" setup>
	import type { Statistic } from '~/types/Statistic.ts'
	import { library } from '@fortawesome/fontawesome-svg-core'
	import { faPlay } from '@fortawesome/free-solid-svg-icons'
	import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
	library.add(faPlay)

	const iconPlay = 'play'

	const props = defineProps({
		statistics: {
			type: Array<Statistic>,
			required: true,
		},
		toggleShowStatistics: { type: Function, required: true },
	})

	async function start(number?: number) {
		await useMyProgressStore().load(number)
		await useGameController().init()
		props.toggleShowStatistics()
	}
</script>

<style scoped>
	.btn {
		background-color: var(--bg-success);
	}
</style>
