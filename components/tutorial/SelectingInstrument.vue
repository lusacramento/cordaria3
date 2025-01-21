<template>
	<div ref="si" class="selecting-instrument">
		<div class="row">
			<div class="col">
				<h2>Selecionando outro instrumento</h2>
			</div>
		</div>
		<div class="row">
			<div class="col">
				<p>
					Caso você tenha <strong>outro instrumento</strong> e deseja <strong>praticá-lo</strong>,<br />
					você pode <strong>alterar de duas formas:</strong>

				</p>
			</div>
		</div>
		<div class="row">
			<div class="col-12 col-md-6 col-lg-6">
				<img :src="selectingInstrumentOnHome" alt="print da tela home" class="img img-fluid">
				<p>
					Através do <strong>botão voltar</strong>, e selecionando<br />
					o novo instrumento na <strong>página inicial</strong> ou;
				</p>
			</div>
			<div class="col-12 col-md-6 col-lg-6">
				<img :src="selectingInstrumentOnPreferences" alt="print da tela preferências" class="img img-fluid">

				<p>
					Através do menu <strong>"preferências"</strong><br />
					clicando no botão do <strong>instrumento</strong>.
				</p>
			</div>
			<div class="row">
				<div class="col">
					<p>
						<strong>Observação:</strong> Cada instrumento tem sua <strong>pontuação e lições</strong>
						separadas.
					</p>
				</div>
			</div>
		</div>
	</div>
</template>

<script lang="ts" setup>
import selectingInstrumentOnHome from '~/assets/imgs/tutorial/selecting-instrument-on-home.png'
import selectingInstrumentOnPreferences from '~/assets/imgs/tutorial/selecting-instrument-on-preferences.png'
</script>

<style scoped>
selecting-instrument {
	text-align: justify !important;
}

img {
	width: 250px;
}
</style>
