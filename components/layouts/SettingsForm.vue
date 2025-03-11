<template>
	<div class="container">
		<div class="row mb-4">
			<div class="col">
				<label class="form-label" for="instrument-list">Instrumento</label>
			</div>
		</div>
		<div class="row mb-4">
			<div class="col">
				<InstrumentList />
			</div>
		</div>
		<div class="row mb-4">
			<div class="col">
				<label for="select-view-mode" class="form-label">Visualização</label>
			</div>
		</div>
		<div class="row mb-4 justify-content-center d-flex text-center">
			<div class="col-4"><label for="">2 cartas</label></div>
			<div class="col-4"><label for="">3 cartas</label></div>
			<div class="col-4"><label for="">todas cartas</label></div>
		</div>
		<div class="row mb-4 justify-content-center d-flex">
			<div class="col-4 img-view-mode d-flex" :class="{ 'enabled-view-mode': viewMode == ViewMode.CARDS2 }">
				<img :src="img2Cards" alt="" height="40px" @click.prevent="alterViewMode(ViewMode.CARDS2)" />
			</div>
			<div class="col-4 img-view-mode d-flex" :class="{ 'enabled-view-mode': viewMode == ViewMode.CARDS3 }">
				<img :src="img3Cards" alt="" height="40px" @click.prevent="alterViewMode(ViewMode.CARDS3)" />
			</div>
			<div class="col-4 img-view-mode justify-content-center d-flex"
				:class="{ 'enabled-view-mode': viewMode == ViewMode.CARDSALL }">
				<img :src="imgAllCards" alt="" height="40px" @click.prevent="alterViewMode(ViewMode.CARDSALL)" />
			</div>
		</div>
		<div class="row mb-4 justify-content-center">
			<div class="col-8">
				<label for="range" class="form-label">Contador</label>
			</div>
			<div class="row mb-4">
				<div class="col">
					<input v-model="counter" type="range" class="form-range" min="4" max="10" id="range" />
				</div>
				<div class="col-4">
					<span class="d-flex justify-content-center">{{ counter }}</span>
				</div>
			</div>
		</div>
	</div>
</template>

<script lang="ts" setup>
import img3Cards from '~/public/imgs/cards/img-3-cards.png'
import img2Cards from '~/public/imgs/cards/img-2-cards.png'
import imgAllCards from '~/public/imgs/cards/img-all-cards.png'
import { ViewMode } from '~/types/ViewMode'

const { viewMode, counter } = storeToRefs(useMySettingsStore())
const { setViewMode } = useMySettingsStore()

/**
 * Watches the `counter` variable for changes and triggers the `update` method
 * from the `useMySettingsStore` store whenever `counter` changes.
 */
watch(counter, () => {
	useMySettingsStore().update()
})

/**
 * Alters the current view mode and updates the settings store.
 *
 * @param {ViewMode} newViewMode - The new view mode to be set.
 */
function alterViewMode(newViewMode: ViewMode) {
	setViewMode(newViewMode)
	useMySettingsStore().update()
}
</script>

<style scoped>
label {
	font-family: 'Encode Sans';
	font-weight: var(--font-regular);
	font-size: 0.9em;
}

.form-check-input {
	float: none;
}

.form-check {
	padding-left: 0;
}

span {
	font-family: 'Encode Sans';
	font-weight: var(--font-regular);
	font-size: 0.9em;
}

.img-view-mode {
	opacity: 0.3;
}

.img-view-mode:hover,
.enabled-view-mode {
	opacity: 1;
}
</style>
