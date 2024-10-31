<template>
	<ul id="instrument-list" class="justify-content-center d-flex">
		<div class="row">
			<div class="col">
				<button
					type="button"
					class="btn btn-acoustic-guitar"
					:class="{
						active: instrument === Instrument.ACOUSTICGUITAR,
					}"
					@click.prevent="changeInstrument(Instrument.ACOUSTICGUITAR)"
				>
					<img
						:src="acousticGuitarImage"
						alt="Violão"
						class="img img-fluid acoustic-guitar-image"
					/>
					<!-- <input
						type="radio"
						class="btn-check"
						name="options-outlined"
						id="success-outlined"
						v-model="instrument"
						:value="instruments.acousticGuitar.value"
						autocomplete="off"
					/>
					<label class="btn btn-outline-success" for="success-outlined">{{
						instruments.acousticGuitar.label
					}}</label> -->
				</button>
			</div>
			<div class="col">
				<button
					type="button"
					class="btn btn-electric-guitar"
					:class="{ active: instrument === Instrument.ELECTRICGUITAR }"
					@click.prevent="changeInstrument(Instrument.ELECTRICGUITAR)"
				>
					<img
						:src="electricGuitarImage"
						class="img img-fluid"
						alt="Guitarra"
					/>

					<!-- <input
						type="radio"
						class="btn-check"
						name="options-outlined"
						id="danger-outlined"
						v-model="instrument"
						:value="instruments.electricGuitar.value"
						autocomplete="off"
					/>
					<label class="btn btn-outline-danger" for="danger-outlined">{{
						instruments.electricGuitar.label
					}}</label>
				</li> -->
				</button>
			</div>

			<div class="col">
				<button
					type="button"
					class="btn btn-bass"
					:class="{ active: instrument === Instrument.BASS }"
					@click.prevent="changeInstrument(Instrument.BASS)"
				>
					<img :src="bassImage" class="img img-fluid" alt="Violão" />

					<!-- <input
						type="radio"
						class="btn-check"
						name="options-outlined"
						id="danger2-outlined"
						v-model="instrument"
						:value="instruments.bass.value"
						autocomplete="off"
					/>
					<label class="btn btn-outline-warning" for="danger2-outlined">{{
						instruments.bass.label
					}}</label> -->
				</button>
			</div>
			<div class="col">
				<button
					type="button"
					class="btn btn-cavaco"
					:class="{ active: instrument === Instrument.CAVACO }"
					@click.prevent="changeInstrument(Instrument.CAVACO)"
				>
					<img :src="cavacoImage" class="img img-fluid" alt="Violão" />

					<!-- <input
						type="radio"
						class="btn-check"
						name="options-outlined"
						id="danger3-outlined"
						v-model="instrument"
						:value="instruments.cavaco.value"
						autocomplete="off"
					/>
					<label class="btn btn-outline-info" for="danger3-outlined">{{
						instruments.cavaco.label
					}}</label> -->
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
	const instruments = ref({
		default: ref(),
		acousticGuitar: {
			label: 'violao',
			value: Instrument.ACOUSTICGUITAR,
		},
		electricGuitar: {
			label: 'guitarra',
			value: Instrument.ELECTRICGUITAR,
		},
		bass: {
			label: 'baixo',
			value: Instrument.BASS,
		},
		cavaco: {
			label: 'cavaco',
			value: Instrument.CAVACO,
		},
	})

	watch(instrument, async (newValue, oldValue, on) => {
		console.log(instrument.value)
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
