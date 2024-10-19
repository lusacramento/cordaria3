<template>
	<div class="container-fluid d-flex justify-content-center">
		<div id="carouselExample" class="carousel slide">
			<div class="carousel-inner">
				<div
					class="carousel-item"
					:class="{ active: instrument === Instrument.ACOUSTICGUITAR }"
				>
					<img
						:src="instrumentsImage.acousticGuitar"
						class="d-block"
						alt="Violão"
						@click.prevent="joinGame(Instrument.ACOUSTICGUITAR)"
					/>
				</div>
				<div
					class="carousel-item"
					:class="{ active: instrument === Instrument.ELECTRICGUITAR }"
				>
					<img
						:src="instrumentsImage.electricGuitar"
						class="d-block"
						alt="Guitarra"
						@click.prevent="joinGame(Instrument.ELECTRICGUITAR)"
					/>
				</div>
				<div
					class="carousel-item"
					:class="{ active: instrument === Instrument.BASS }"
				>
					<img
						:src="instrumentsImage.bass"
						class="d-block"
						alt="Baixo"
						@click.prevent="joinGame(Instrument.BASS)"
					/>
				</div>
				<div
					class="carousel-item"
					:class="{ active: instrument === Instrument.CAVACO }"
				>
					<img
						:src="instrumentsImage.cavaco"
						class="d-block"
						alt="Cavaquinho"
						@click.prevent="joinGame(Instrument.CAVACO)"
					/>
				</div>
			</div>
			<button
				class="carousel-control-prev"
				type="button"
				data-bs-target="#carouselExample"
				data-bs-slide="prev"
			>
				<span class="carousel-control-prev-icon" aria-hidden="true"></span>
				<span class="visually-hidden">Anterior</span>
			</button>
			<button
				class="carousel-control-next"
				type="button"
				data-bs-target="#carouselExample"
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

	const { instrumentsImage } = useInstrumentSelector()
	const { updateThemeImages, joinGame } = useInstrumentSelector()

	onBeforeMount(async () => {
		await updateThemeImages()
	})

	const { instrument } = storeToRefs(useMySettingsStore())
</script>

<style scoped>
	img {
		cursor: pointer;
	}
</style>
