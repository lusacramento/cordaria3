<template>
	<tr v-for="statistic in statistics" :key="statistic.number">
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

	defineProps({
		statistics: {
			type: Array<Statistic>,
			required: true,
		},
	})

	function start(number?: number) {
		useGameController().payload(number)
	}
</script>

<style></style>
