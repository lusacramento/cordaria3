<template>
	<div class="container-fluid">
		<div class="row d-flex justify-content-center align-items-center">
			<div class="col-lg-12 col-md-9 col-12">
				<div class="row justify-content-around">
					<button
						type="button"
						class="btn col-4"
						@click.prevent="joinGame(Instrument.CAVACO)"
						@mouseover="mouseHover(Instrument.CAVACO)"
						@mouseleave="mouseLeave"
					>
						<img :src="instruments.cavaco.url" alt="" class="img-fluid" />
					</button>
					<button
						type="button"
						class="btn col-4"
						@click.prevent="joinGame(Instrument.ACOUSTICGUITAR)"
						@mouseover="mouseHover(Instrument.ACOUSTICGUITAR)"
						@mouseleave="mouseLeave"
					>
						<img
							:src="instruments.acousticGuitar.url"
							alt=""
							class="img-fluid"
						/>
					</button>
					<button
						type="button"
						class="btn col-4"
						@click.prevent="joinGame(Instrument.ELECTRICGUITAR)"
						@mouseover="mouseHover(Instrument.ELECTRICGUITAR)"
						@mouseleave="mouseLeave"
					>
						<img
							:src="instruments.electricGuitar.url"
							alt=""
							class="img-fluid"
						/>
					</button>
					<button
						type="button"
						class="btn col-4"
						@click.prevent="joinGame(Instrument.BASS)"
						@mouseover="mouseHover(Instrument.BASS)"
						@mouseleave="mouseLeave"
					>
						<img :src="instruments.bass.url" alt="" class="img-fluid" />
					</button>
				</div>
			</div>
		</div>
	</div>
</template>

<script lang="ts" setup>
	import { Instrument } from '~/types/Instrument'

	const { instruments, joinGame, mouseHover, mouseLeave } =
		useInstrumentSelector()
</script>

<style scoped>
	.btn {
		width: 260px;
		border: transparent;
	}
</style>
