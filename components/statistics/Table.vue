<template>
	<div class="">
		<table class="table table-striped table-dark table-hover mt-5">
			<thead>
				<tr>
					<th scope="col">Lição</th>
					<th scope="col">Primeiro Dedo</th>
					<th scope="col">Corda</th>
					<th scope="col">Batidas Por Minuto</th>
					<th scope="col">Repetir Lição?</th>
				</tr>
			</thead>
			<tbody>
				<Tr :lessons="lessonsTable" />
			</tbody>
		</table>
		<nav aria-label="..." class="d-flex">
			<ul
				v-for="page in pages"
				:key="page"
				class="pagination pagination-sm d-flex"
			>
				<li class="page-link d-flex active">
					<a
						@click.prevent="updateDataTable(page)"
						class="page-link"
						href="#"
						>{{ page }}</a
					>
				</li>
			</ul>
		</nav>
	</div>
</template>

<script lang="ts" setup>
	import Tr from './Tr.vue'

	const lessons = useLessons().getLessons()

	const lessonPerPage = 5

	const lessonsTable = ref(lessons.slice(0, lessonPerPage))

	const pagesNumber =
		lessons.length % lessonPerPage === 0
			? lessons.length / lessonPerPage
			: lessons.length / lessonPerPage + 1

	const pages: number[] = []

	createPages()

	function createPages() {
		for (let i = 1; i <= pagesNumber; i++) {
			pages.push(i)
		}
	}

	function updateDataTable(numberPage: number) {
		const index = numberPage - 1
		const start = lessonPerPage * index
		const end = start + lessonPerPage
		lessonsTable.value = lessons.slice(start, end)
	}
</script>

<style>
	ul,
	li {
		display: flex !important;
	}
</style>
