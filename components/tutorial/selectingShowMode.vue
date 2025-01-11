<template>
	<div class="selecting-show-mode">
		<div class="container text-center">

			<div class="row">
				<div class="col">
					<h2>Selecionando o modo de exibição de tela</h2>
				</div>
			</div>
			<div class="row">
				<div class="col">
					<p>Há <strong>três tipos</strong> de modos de <strong>exibição</strong> de tela:</p>
				</div>
			</div>
			<div class="row">
				<div class="col-12 col-md-6 col-lg-4">
					<p><strong>02</strong> Cartas</p>
					<img :src="viewMode2" alt="imagem da tela com 2 cartas" class="img img-fluid">
				</div>
				<div class="col-12 col-md-6 col-lg-4">
					<p><strong>03</strong> Cartas</p>
					<img :src="viewMode3" alt="imagem da tela com 3 cartas" class="img img-fluid">
				</div>
				<div class="col-12 col-md-6 col-lg-4">
					<p><strong>Todas</strong> Cartas</p>
					<img :src="viewModeAll" alt="imagem da tela com todas as cartas" class="img img-fluid">
				</div>
			</div>
			<div class="row mt-3">
				<div class="col">
					<p>
						Atavés do menu <strong>preferências</strong>, você pode selecionar o modo que mais te agrada!
					</p>

					<img :src="changingMode"
						alt="imagem do menu de preferências realçando local onde se troca o modo de visualização"
						class="img img-fluid changing-mode">

				</div>
			</div>
		</div>
	</div>
</template>

<script lang="ts" setup>
import viewMode2 from '~/assets/imgs/tutorial/view-mode-2.png'
import viewMode3 from '~/assets/imgs/tutorial/view-mode-3.png'
import viewModeAll from '~/assets/imgs/tutorial/view-mode-all.png'
import changingMode from '~/assets/imgs/tutorial/changing-mode.png'
</script>

<style scoped>
.selecting-show-mode {
	text-align: justify;
}

img {
	width: 250px;
}

.changing-mode {
	width: 180px;
}
</style>
