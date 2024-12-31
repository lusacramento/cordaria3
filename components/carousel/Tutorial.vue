<template>
	<div id="carousel" class="carousel slide carousel-fade">
		<div class="carousel-indicators">
			<button v-for="(slide, index) in slides" :key="slide.id" type="button" data-bs-target="#carousel"
				:data-bs-slide-to="index" :class="slide.class" aria-current="true" :aria-label="`Slide ${index + 1}`" />
		</div>
		<div class="row justify-content-center">
			<div class="col-9">
				<div class="carousel-inner">
					<div v-for="slide in slides" :key="slide.id" class="carousel-item text-center" :class="slide.class">
						<div class="row justify-content-center">
							<div class="col">
								<component v-if="slide.component" :is="slide.component" />
							</div>
							<!-- <div class="col-lg-6 col">
								<div class="container-video mb-3">
									<iframe class="video" width="560" height="315" :src="slide.src"
										title="YouTube video player" frameborder="0"
										allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
										referrerpolicy="strict-origin-when-cross-origin" allowfullscreen />
								</div>
							</div> -->
						</div>
					</div>
				</div>
			</div>
		</div>

		<button class="carousel-control-prev" type="button" data-bs-target="#carousel" data-bs-slide="prev">
			<span class="carousel-control-prev-icon" aria-hidden="true"></span>
			<span class="visually-hidden">Previous</span>
		</button>
		<button class="carousel-control-next" type="button" data-bs-target="#carousel" data-bs-slide="next">
			<span class="carousel-control-next-icon" aria-hidden="true"></span>
			<span class="visually-hidden">Next</span>
		</button>
	</div>
</template>

<script lang="ts" setup>
import acousticGuitar from '~/assets/imgs/instruments/index/dark/disabled/acoustic-guitar.png'
import electricGuitar from '~/assets/imgs/instruments/index/dark/disabled/electric-guitar.png'
import bass from '~/assets/imgs/instruments/index/dark/disabled/bass.png'
import cavaco from '~/assets/imgs/instruments/index/dark/disabled/cavaco.png'
const props = defineProps({ slides: { type: Object, required: true } })

const data2 = [
	{
		id: 'carousel1',
		src: acousticGuitar,
		class: 'active',
		content: '<h2>Violão</h2>',
	},
	{
		id: 'carousel2',
		src: electricGuitar,
		class: '',
		content: '<h2>Guitarra</h2>',
	},
	{ id: 'carousel3', src: bass, class: '', content: '<h2>Baixo</h2>' },
	{ id: 'carousel4', src: cavaco, class: '', content: '<h2>Cavaco</h2>' },
]
</script>

<style scoped>
.container-video {
	position: relative;
	width: 100%;
	height: 0;
	padding-bottom: 56.25%;
}

.video {
	position: absolute;
	top: 0;
	left: 0;
	width: 100%;
	height: 100%;
}

.carousel-indicators {
	position: relative;
	bottom: -500px;
}
</style>
