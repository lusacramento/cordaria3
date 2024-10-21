<template>
	<div class="container-fluid d-flex justify-content-center">
		<div id="instrument-carousel" class="carousel slide">
			<div class="carousel-inner">
				<div
					class="carousel-item"
					:class="{ active: instrument === Instrument.ACOUSTICGUITAR }"
				>
					<img
						:src="instruments.acousticGuitar.url"
						class="d-block img img-fluid"
						:alt="instruments.acousticGuitar.id"
						@click.prevent="joinGame(Instrument.ACOUSTICGUITAR)"
					/>
				</div>
				<div
					class="carousel-item"
					:class="{ active: instrument === Instrument.ELECTRICGUITAR }"
				>
					<img
						:src="instruments.electricGuitar.url"
						class="d-block img img-fluid"
						:alt="instruments.electricGuitar.id"
						@click.prevent="joinGame(Instrument.ELECTRICGUITAR)"
					/>
				</div>
				<div
					class="carousel-item"
					:class="{ active: instrument === Instrument.BASS }"
				>
					<img
						:src="instruments.bass.url"
						class="d-block img img-fluid"
						:alt="instruments.bass.id"
						@click.prevent="joinGame(Instrument.BASS)"
					/>
				</div>
				<div
					class="carousel-item"
					:class="{ active: instrument === Instrument.CAVACO }"
				>
					<img
						:src="instruments.cavaco.url"
						class="d-block img img-fluid"
						:alt="instruments.cavaco.id"
						@click.prevent="joinGame(Instrument.CAVACO)"
					/>
				</div>
			</div>
			<button
				class="carousel-control-prev"
				type="button"
				data-bs-target="#instrument-carousel"
				data-bs-slide="prev"
			>
				<span class="carousel-control-prev-icon" aria-hidden="true"></span>
				<span class="visually-hidden">Anterior</span>
			</button>
			<button
				class="carousel-control-next"
				type="button"
				data-bs-target="#instrument-carousel"
				data-bs-slide="next"
			>
				<span class="carousel-control-next-icon" aria-hidden="true"></span>
				<span class="visually-hidden">Próximo</span>
			</button>
		</div>
	</div>
</template>

<script lang="ts" setup>
	import { Instrument } from '~/types/Instrument'

	const { instruments, updateThemeImages, joinGame } = useInstrumentSelector()

	onBeforeMount(async () => {
		await updateThemeImages()
	})

	const { instrument } = storeToRefs(useMySettingsStore())
</script>

<style scoped>
	.img {
		cursor: pointer;
		width: 70vw;
	}
</style>
