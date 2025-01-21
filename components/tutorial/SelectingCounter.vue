<template>
	<div class="selecting-counter">
		<div class="container justify-content-center text-center">

			<div class="row">
				<div class="col">
					<h2>Alterando pré-contador</h2>
				</div>
			</div>
			<div class="row">
				<div class="col">
					<p>
						Você pode aumentar o <strong>número de batidas</strong> do<br />
						<strong>pré-contador</strong> através do menu <strong>preferências</strong>.
					</p>
				</div>
			</div>
			<div class="row">
				<div class="col">
					<img :src="tutorialGif" alt="Animação do pré-contador" class="img img-fluid" />
				</div>
			</div>
			<div class="row">
				<div class="col">
					<p>Escolha entre <strong>4</strong> até <strong>9</strong> batidas</p>
				</div>
			</div>
			<div class="row">
				<div class="col">
					<p>
						Este recurso é <strong>muito útil</strong> caso você precise de <strong>mais tempo</strong> para
						<strong>se preparar</strong><br />
						antes do início da lição, bem como para <strong>executar lições</strong> mais avançadas e
						rápidas!
					</p>
				</div>
			</div>
		</div>
	</div>
</template>

<script lang="ts" setup>
import tutorialGif from '~/assets/imgs/tutorial/pre-counter.gif'
</script>

<style scoped>
.selecting-counter {
	text-align: justify;
}

img {
	width: 40%;
}
</style>
