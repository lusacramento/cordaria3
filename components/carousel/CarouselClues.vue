<template>
	<div class="carousel-wrapper">
		<Splide :options="{ rewind: true }" aria-label="My Favorite Images">
			<SplideSlide v-for="slide in slides" :key="slide.id" class="">
				<div v-show="slide.isImage">
					<img v-if="slide.isImage" :src="slide.img" :alt="slide.altText" class="img img-fluid" />
				</div>
				<div v-if="slide.isVideo">
					<video class="video img img-fluid" controls preload="auto">
						<source class="img img-fluid" :src="slide.src" type="video/mp4" />
					</video>
				</div>
				<div v-html="slide.text" />
				<div class="my-carousel-progress">
					<div class="my-carousel-progress-bar"></div>
				</div>
			</SplideSlide>
		</Splide>
	</div>
</template>

<script lang="ts" setup>
import tutorialPasso1 from '@/assets/imgs/tutorial-cordaria-passo-1.gif'
import tutorialPasso2 from '@/assets/imgs/tutorial-cordaria-passo-2.gif'
import tutorialPasso3 from '@/assets/imgs/tutorial-cordaria-passo-3.png'
import tutorialPasso4 from '@/assets/imgs/tutorial-cordaria-passo-4.mp4'

import { Splide, SplideSlide } from '@splidejs/vue-splide'
import '@splidejs/splide/css/sea-green'

const carouselSettings = {
	dots: true,
	dotsClass: 'slick-dots custom-dot-class',
	edgeFriction: 0.35,
	infinite: false,
	speed: 500,
	slidesToShow: 1,
	slidesToScroll: 1,
	responsive: [
		{
			breakpoint: 576,
			settings: {
				vertical: true,
				slidesToShow: 2,
				slidesToScroll: 2,
			},
		},
	],
}
const slides = [
	{
		id: 0,
		isImage: true,
		isVideo: false,
		img: tutorialPasso1,
		altText: 'Tutorial Passo 1',

		text: `<p>Entrar no link <strong>A prática</strong>;<br />
	         Selecione o modo de <strong>visualização</strong> de sua preferência:<br />
	         3 Cartas: modo  dinâmico; Todas as Cartas: modo clássico.`,
	},
	{
		id: 1,
		isImage: true,
		isVideo: false,
		img: tutorialPasso2,
		altText: 'Tutorial Passo 2',
		text: `<p>
	          Selecione uma lição pré-determinada ou personalizada.<br />
	          Para lições personalizadas, selecione o <strong>primeiro dedo</strong>,
	          a <strong>corda</strong>
	          e o <strong>andamento</strong> de acordo com seu ritmo.<p />`,
	},
	{
		id: 2,
		isImage: true,
		isVideo: false,
		img: tutorialPasso3,
		altText: 'Tutorial Passo 3',
		text: `<p>Aperte o botão <strong>play</strong>. Aproveite o tempo da pré-contagem para se posicionar:
	           Alinhe os dedos <strong>1, 2, 3 e 4</strong> nas respectivas casas
	           da corda selecionada.</p>`,
	},
	{
		id: 3,
		isImage: false,
		isVideo: true,
		src: tutorialPasso4,
		title: 'Cordaria - Tutorial',
		description: 'Passo 4',
		text: '<p>Toque as notas realçadas apresentadas na carta amarela no <strong>momento informado</strong>.</p>',
	},
]
</script>
<style>
.carousel-wrapper {
	height: 100%;
}

.splide__arrow>svg,
.splide__arrow--next>svg {
	fill: var(--bg-layer-top) !important;
}

.splide__pagination__page {
	width: 40px;
	height: 2px;
	margin: 15px;
	background-color: var(--bg-layer-top);
}

.splide__pagination__page.is-active {
	background-color: var(--the-tutorial-color) !important;
}
</style>
