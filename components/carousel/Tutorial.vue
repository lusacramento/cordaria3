<template>
	<div id="carousel" class="carousel slide carousel-fade">
		<div class="carousel-indicators">
			<button v-for="(slide, index) in props.slides" :key="slide.id" type="button" data-bs-target="#carousel"
				:data-bs-slide-to="index" :class="slide.class" aria-current="true" :aria-label="`Slide ${index + 1}`" />
		</div>
		<div class="row justify-content-center">
			<div class="col-9">
				<div class="carousel-inner">
					<div v-for="slide in props.slides" :key="slide.id" class="carousel-item text-center"
						:class="slide.class">
						<div class="row justify-content-center">
							<div class="col">
								<component v-if="slide.component" :is="slide.component" />
							</div>
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
const props = defineProps({ slides: { type: Object, required: true } })

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
	position: fixed;
}
</style>
