<template>
	<div class="container">
		<InstrumentList />
		<table
			class="table table-striped table-dark table-hover mt-5 align-middle text-center"
		>
			<thead>
				<tr>
					<th scope="col">Lição</th>
					<th scope="col">Nível</th>
					<th scope="col">Batidas Por Minuto</th>
					<th scope="col">Repetir Lição?</th>
				</tr>
			</thead>
			<tbody>
				<Tr
					:statistics="statisticsTable"
					:toggle-show-statistics="props.toggleShowStatistics"
				/>
			</tbody>
		</table>
		<nav aria-label="..." class="d-flex justify-content-center">
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
	import type { Statistic } from '~/types/Statistic'
	import Tr from './Tr.vue'

	const props = defineProps({
		toggleShowStatistics: { type: Function, required: true },
	})

	onBeforeMount(() => {
		getStatistics()
	})

	const statistics: Ref<Array<Statistic>> = ref([])
	const statisticsTable: Ref<Array<Statistic>> = ref([])

	const pages: Ref<Array<number>> = ref([])
	const lessonsPerPage = 4
	const numberOfPages = ref(0)

	const { instrument } = storeToRefs(useMySettingsStore())

	async function getStatistics() {
		statistics.value = await useIStatistics().getStatistics(
			useMyUserStore().getId,
			instrument.value,
		)
	}

	watch(statistics, (newValue) => {
		statisticsTable.value = statistics.value.slice(0, lessonsPerPage)
		getPageNumber()
		createPages()
	})

	watch(instrument, () => {
		clearData()
		getStatistics()
		updateDataTable(1)
	})

	function getPageNumber() {
		numberOfPages.value =
			statistics.value.length % lessonsPerPage === 0
				? statistics.value.length / lessonsPerPage
				: statistics.value.length / lessonsPerPage + 1
	}

	function createPages() {
		for (
			let i = 1;
			i <= numberOfPages.value && statistics.value.length > lessonsPerPage;
			i++
		) {
			pages.value.push(i)
		}
	}

	function updateDataTable(numberPage: number) {
		const index = numberPage - 1
		const start = lessonsPerPage * index
		const end = start + lessonsPerPage
		statisticsTable.value = statistics.value.slice(start, end)
	}

	function clearData() {
		statistics.value = []
		statisticsTable.value = []
		pages.value = []
		numberOfPages.value = 0
	}
</script>

<style>
	ul,
	li {
		display: flex !important;
	}
</style>
