<template>
	<tr v-for="(rank, i) in props.ranking" :key="rank.position">
		<th scope="row">{{ rank.position }}</th>
		<td>@{{ rank.userName }}</td>
		<td>{{ rank.points }}</td>
		<td>{{ rank.awards }}</td>
	</tr>
</template>

<script lang="ts" setup>
	import { type Ranking } from '~/types/Ranking'

	const props = defineProps({
		ranking: { type: Array<Ranking>, required: true },
	})
</script>

<style></style>
