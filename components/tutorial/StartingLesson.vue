<template>
	<div class="starting-lesson">
		<div class="container text-center ">

			<div class="row">
				<div class="col">
					<h2>Iniciando uma lição</h2>
				</div>
			</div>
			<div v-if="isMobile">
				<div class="row">
					<div class="col-12">
						<p>
							Antes de iniciar, <strong>verifique</strong> na imagem qual o <strong>primeiro dedo</strong>
							e
							qual
							<strong>corda</strong>
							inicia cada carta
						</p>
						<div class="col"> <img :src="lessonOneString" alt="" class="img img-fluid"></div>
						<p>Estas opções estão destacadas na cor <strong>verde</strong>.</p>
						<hr />


					</div>
					<div class="col-12">
						<p>
							Caso haja alguma <strong>seta</strong> onde estão as informações das cordas, isto significa
							que cada carta será <strong>executada em uma corda</strong> iniciando na direção que a seta
							aponta.
						</p>
						<div class="col"> <img :src="lessonAllString" alt="" class="img img-fluid"></div>
						<p>
							Quando chegar na última corda, continue o exercício voltando para
							a corda inicial e repetindo esta lógica até o final da lição.
						</p>
						<hr />
					</div>
					<div class="col-12">
						<p>
							Enquanto o pré-contador está tocando, se <strong>posicione</strong> e se
							<strong>concentre</strong>.
						</p>
						<p>
							Ao iniciar, <strong>toque as notas</strong> destacadas da <strong>carta amarela</strong>.
						</p>
						<div class="col"> <img :src="cardsDetail" alt="" class="img img-fluid"></div>
						<p>
							O <strong>círculo abaixo</strong> das notas indicam a <strong>corda que você tocará</strong>
							em
							todas notas <strong>daquela carta</strong>.

						</p>

					</div>
				</div>
				<div class="row">
					<div class="col">
						<p>Feito isso, Clique no botão JOGAR.</p>
					</div>
				</div>
			</div>
			<div v-else>
				<div class="row">
					<div class="col">
						<p>
							Antes de iniciar, <strong>verifique</strong>na imagem qual o <strong>primeiro dedo</strong>
							e
							qual
							<strong>corda</strong>
							inicia cada carta.
						</p>
					</div>
					<div class="col">
						<p>
							Caso haja alguma <strong>seta</strong> onde estão as informações das cordas, isto significa
							que cada carta será <strong>executada em uma corda</strong> iniciando na direção que a seta
							aponta.
						</p>
					</div>
					<div class="col">
						<p>
							Enquanto o pré-contador está tocando, se <strong>posicione</strong> e se
							<strong>concentre</strong>.
						</p>
						<p>
							Ao iniciar, <strong>toque as notas</strong> destacadas da <strong>carta amarela</strong>.
						</p>
					</div>
				</div>
				<div class="row">
					<div class="col"> <img :src="lessonOneString" alt="" class="img img-fluid"></div>
					<div class="col"> <img :src="lessonAllString" alt="" class="img img-fluid"></div>
					<div class="col"> <img :src="cardsDetail" alt="" class="img img-fluid"></div>
				</div>
				<div class="row">
					<div class="col">
						<p>Estas opções estão destacadas na cor <strong>verde</strong>.</p>
					</div>
					<div class="col">
						<p>
							Quando chegar na última corda, continue o exercício voltando para
							a corda inicial e repetindo esta lógica até o final da lição.
						</p>
					</div>
					<div class="col">
						<p>
							O <strong>círculo abaixo</strong> das notas indicam a <strong>corda que você tocará</strong>
							em
							todas notas <strong>daquela carta</strong>.

						</p>
					</div>
				</div>
				<div class="row">
					<div class="col">
						<p>Feito isso, Clique no botão JOGAR.</p>
					</div>
				</div>
			</div>

		</div>
	</div>
</template>

<script lang="ts" setup>
import lessonOneString from '~/assets/imgs/tutorial/lesson-one-string.png'
import lessonAllString from '~/assets/imgs/tutorial/lesson-all-strings.png'
import cardsDetail from '~/assets/imgs/tutorial/cards-detail.png'

const isMobile = window.innerWidth < 768
</script>

<style scoped>
.starting-lesson {
	text-align: justify;
}

.img {
	width: 200px;
}
</style>
