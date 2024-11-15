<template>
	<div>
		<table class="table table-striped table-dark">
			<thead>
				<tr>
					<th scope="col" class="col-1">#</th>
					<th scope="col" class="col-5">Usuário</th>
					<th scope="col" class="col-2">Pontos</th>
					<th scope="col" class="col-auto">Troféus</th>
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
