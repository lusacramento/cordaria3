<template>
	<div>
		<table class="table table-dark table-striped">
			<thead>
				<tr>
					<th scope="col">#</th>
					<th scope="col">Usuário</th>
					<th scope="col">Pontos</th>
					<th scope="col">Troféus</th>
				</tr>
			</thead>
			<tbody>
				<RankingTr :ranking="props.ranking" />
			</tbody>
		</table>
	</div>
</template>

<script lang="ts" setup>
	import type { Ranking } from '~/types/Ranking'

	const props = defineProps({
		ranking: { type: Array<Ranking>, required: true },
	})
</script>

<style></style>
