<template>
	<div class="container table-responsive">
		<table
			class="table table-striped table-dark table-hover align-middle text-center align-middle"
		>
			<thead>
				<tr class="align-middle">
					<th scope="col">Quantidade<br />de<br />Cordas</th>
					<th scope="col">Número</th>
					<th scope="col">Nível</th>

					<th scope="col">Primeiro<br />Dedo</th>
					<th scope="col">Corda</th>
					<th scope="col">Batidas<br />Por<br />Minuto</th>
					<th scope="col">Mensagem</th>
					<th scope="col">Pontos</th>
					<th scope="col">Ações</th>
				</tr>
			</thead>
			<tbody>
				<LessonsTr :lessons="lessons" />
			</tbody>
		</table>
	</div>
</template>

<script lang="ts" setup>
	defineProps({
		lessons: {
			type: Object,
			required: true,
		},
	})
</script>

<style>
	ul,
	li {
		display: flex !important;
	}

	table {
		vertical-align: middle !important;
	}
</style>
