<template>
	<div class="container">
		<InstrumentList />
		<table class="table table-striped table-dark table-hover mt-5 align-middle text-center">
			<thead>
				<tr>
					<th scope="col">Lição</th>
					<th scope="col">Nível</th>
					<th scope="col">Batidas Por Minuto</th>
					<th scope="col">Repetir Lição?</th>
				</tr>
			</thead>
			<tbody>
				<Tr :statistics="statisticsTable" :toggle-show-statistics="props.toggleShowStatistics" />
			</tbody>
		</table>
		<nav aria-label="..." class="d-flex justify-content-center">
			<ul v-for="page in pages" :key="page" class="pagination pagination-sm d-flex">
				<li class="page-link d-flex active">
					<a @click.prevent="updateDataTable(page)" class="page-link" href="#">{{ page }}</a>
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

/**
 * Fetches statistics data and updates the statistics value.
 * 
 * This function asynchronously retrieves statistics data using the `useIStatistics` 
 * composable and updates the `statistics` reactive variable with the fetched data.
 * The statistics are fetched based on the current user's ID and the selected instrument.
 * 
 * @async
 * @function getStatistics
 * @returns {Promise<void>} A promise that resolves when the statistics data has been fetched and updated.
 */
async function getStatistics() {
	statistics.value = await useIStatistics().getStatistics(
		useMyUserStore().getId,
		instrument.value,
	)
}

/**
 * Watches for changes in the `statistics` reactive property.
 * When `statistics` changes, it updates `statisticsTable` with a slice of the new `statistics` value,
 * limited to the number of items specified by `lessonsPerPage`.
 * It then calls `getPageNumber` and `createPages` functions to update the pagination state.
 *
 * @param {Array} newValue - The new value of the `statistics` property.
 */
watch(statistics, (newValue) => {
	statisticsTable.value = statistics.value.slice(0, lessonsPerPage)
	getPageNumber()
	createPages()
})

/**
 * Watches for changes in the `instrument` property.
 * When `instrument` changes, it performs the following actions:
 * 1. Clears existing data by calling `clearData()`.
 * 2. Fetches new statistics by calling `getStatistics()`.
 * 3. Updates the data table by calling `updateDataTable(1)`.
 */
watch(instrument, () => {
	clearData()
	getStatistics()
	updateDataTable(1)
})

/**
 * Calculates the total number of pages based on the length of the statistics array
 * and the number of lessons per page. Updates the `numberOfPages` reactive variable.
 *
 * The total number of pages is determined by dividing the length of the statistics array
 * by the number of lessons per page. If the length of the statistics array is not a multiple
 * of the number of lessons per page, an additional page is added to accommodate the remaining lessons.
 */
function getPageNumber() {
	numberOfPages.value =
		statistics.value.length % lessonsPerPage === 0
			? statistics.value.length / lessonsPerPage
			: statistics.value.length / lessonsPerPage + 1
}

/**
 * Creates pages for the statistics table.
 * Iterates from 1 to the total number of pages and pushes each page number
 * into the `pages` array if the number of statistics exceeds the lessons per page.
 * 
 * @function createPages
 * @returns {void}
 */
function createPages() {
	for (
		let i = 1;
		i <= numberOfPages.value && statistics.value.length > lessonsPerPage;
		i++
	) {
		pages.value.push(i)
	}
}

/**
 * Updates the statistics table with data for the specified page number.
 *
 * @param {number} numberPage - The page number to display in the table.
 * @returns {void}
 */
function updateDataTable(numberPage: number) {
	const index = numberPage - 1
	const start = lessonsPerPage * index
	const end = start + lessonsPerPage
	statisticsTable.value = statistics.value.slice(start, end)
}

/**
 * Clears all the data in the statistics, statisticsTable, pages, and numberOfPages.
 * This function resets the values of these reactive properties to their initial states.
 */
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
