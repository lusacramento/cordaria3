<template>
	<ul id="instrument-list" class="justify-content-center d-flex">
		<div class="row">
			<div class="col">
				<button type="button" class="btn btn-acoustic-guitar" :class="{
					active: instrument === Instrument.ACOUSTICGUITAR,
				}" @click.prevent="changeInstrument(Instrument.ACOUSTICGUITAR)">
					<img :src="acousticGuitarImage" alt="Violão" class="img img-fluid acoustic-guitar-image" />
				</button>
			</div>
			<div class="col">
				<button type="button" class="btn btn-electric-guitar"
					:class="{ active: instrument === Instrument.ELECTRICGUITAR }"
					@click.prevent="changeInstrument(Instrument.ELECTRICGUITAR)">
					<img :src="electricGuitarImage" class="img img-fluid" alt="Guitarra" />
				</button>
			</div>

			<div class="col">
				<button type="button" class="btn btn-bass" :class="{ active: instrument === Instrument.BASS }"
					@click.prevent="changeInstrument(Instrument.BASS)">
					<img :src="bassImage" class="img img-fluid" alt="Violão" />
				</button>
			</div>
			<div class="col">
				<button type="button" class="btn btn-cavaco" :class="{ active: instrument === Instrument.CAVACO }"
					@click.prevent="changeInstrument(Instrument.CAVACO)">
					<img :src="cavacoImage" class="img img-fluid" alt="Violão" />
				</button>
			</div>
		</div>
	</ul>
</template>

<script lang="ts" setup>
import { Instrument } from '~/types/Instrument'

import acousticGuitarImage from '~/assets/imgs/instruments/settings/acoustic-guitar.png'
import electricGuitarImage from '~/assets/imgs/instruments/settings/electric-guitar.png'
import bassImage from '~/assets/imgs/instruments/settings/bass.png'
import cavacoImage from '~/assets/imgs/instruments/settings/cavaco.png'

const { instrument } = storeToRefs(useMySettingsStore())


watch(instrument, async (newValue, oldValue, on) => {
	if (oldValue === Instrument.NOT_SELECTED) return

	await useMySettingsStore().update()
	await useMyProgressStore().load()
	await useMyProgressStore().loadScore()
	await useGameController().init()
})

function changeInstrument(newInstrument: Instrument) {
	instrument.value = newInstrument
}
</script>

<style scoped>
.btn {
	margin: 5px;
	width: 92.8px;
	height: 95px;
	border-radius: 50%;
}

.btn-acoustic-guitar.active,
.btn-electric-guitar.active,
.btn-bass.active,
.btn-cavaco.active {
	border: none;
}

.btn-acoustic-guitar.active {
	background-color: var(--active-acoustic-guitar-color) !important;
}

.btn-electric-guitar.active {
	background-color: var(--active-electric-guitar-color) !important;
}

.btn-bass.active {
	background-color: var(--active-bass-color) !important;
}

.btn-cavaco.active {
	background-color: var(--active-cavaco-color) !important;
}

.btn-acoustic-guitar:not(.active):hover {
	background-color: var(--hover-acoustic-guitar-color);
}

.btn-electric-guitar:not(.active):hover {
	background-color: var(--hover-electric-guitar-color);
}

.btn-bass:not(.active):hover {
	background-color: var(--hover-bass-color);
}

.btn-cavaco:not(.active):hover {
	background-color: var(--hover-cavaco-color);
}

img {
	width: 100px;
}
</style>
