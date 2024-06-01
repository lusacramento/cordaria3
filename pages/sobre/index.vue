<template>
	<div id="the-project" class="the-project">
		<div class="container-fluid">
			<LayoutsHeader :title="title" />
		</div>
		<div class="container layer-center">
			<div class="row justify-content-around">
				<div class="col-md-4 col-12">
					<Box
						:title-text="boxes.what.text"
						:schema="boxes.what.schema"
						:left-logo="boxes.what.leftLogo"
						:right-logo="boxes.what.rightLogo"
					/>
					<p class="large-line-height">
						Destinado à pessoas interessadas em iniciar o estudo do violão e
						guitarra e professores dessa arte, o projeto
						<strong>Cordaria</strong>
						é um aplicativo
						<i>web</i>
						com intuito de auxiliar a prática ao instrumento.
					</p>
					<p class="large-line-height">
						Desenvolvido pelo músico e programador
						<strong>Lu Sacramento</strong>, o projeto é fruto de uma pesquisa
						sobre novas metodologias e abordagens ao ensino à distância de
						música.
					</p>
				</div>
				<div class="col-md-4 col-12">
					<Box
						:title-text="boxes.doing.text"
						:schema="boxes.doing.schema"
						:left-logo="boxes.doing.leftLogo"
						:right-logo="boxes.doing.rightLogo"
					/>
					<p>
						Sua função é gerar exercícios básicos de digitação com foco na
						técnica. Tais exercícios vem para
						<strong>auxiliar o educando</strong> a executar as notas dadas
						através de uma escrita de tablatura, cuja a linguagem é de fácil
						entendimento comparado a escrita de partitura.
					</p>
					<p>
						Desta forma, o aluno poderá praticar junto ao auxílio de um
						<strong>“correpetidor” virtual</strong>, em qualquer momento e
						lugar!
					</p>
				</div>
			</div>
			<aside class="row d-flex justify-content-center mt-4">
				<div class="col-lg-6 col-md-9 col-12">
					<Box
						:title-text="boxes.callInAction.text"
						:schema="boxes.callInAction.schema"
						:left-logo="boxes.callInAction.leftLogo"
						:right-logo="boxes.callInAction.rightLogo"
					/>
				</div>
			</aside>
		</div>
        <div class="container layer-center">
			<div class="row justify-content-around">
				<section class="col-md-5">
					<Box
						:title-text="boxes.aboutResearch.text"
						:schema="boxes.aboutResearch.schema"
						:is-logo="boxes.aboutResearch.isLogo"
					/>

					<p class="justify">
						A pesquisa
						<strong>
							“Cordaria – Desenvolvimento de aplicação web para iniciação à
							prática do violão e guitarra”
						</strong>
						surge em um momento delicado da história mundial: a pandemia do
						Coronavírus – COVID 19. Compelidos a este problema, os profissionais
						da área da educação, sobre tudo com atuação na área da música
						enfrentam grandes desafios para conseguir adequar suas atividades
						para o ensino a distância. Parte deste desafio é devido a escassez
						de recursos tecnológicos que fogem da metodologia tradicional de
						ensino, muito das vezes, limitado a vídeos, textos, imagens e de
						forma repetida. Os problemas se amplificam com usuários oriundos da
						classe baixa, que tem uma limitação considerável de hardware e/ou
						baixa conexão de internet.
					</p>
				</section>
				<div class="col-md-5">
					<aside class="row justify-content-center">
						<a :href="pdf" target="_blank">
							<Box
								:title-text="boxes.downloadResearch.text"
								:schema="boxes.downloadResearch.schema"
								:left-logo="boxes.downloadResearch.leftLogo"
								:right-logo="boxes.downloadResearch.rightLogo"
							/>
						</a>
					</aside>
					<section class="row">
						<div class="col">
							<p class="justify large-line-height">
								Utilizando meus conhecimentos de uma década como professor e
								alguns anos de desenvolvedor web, implementei uma aplicação para
								prática de exercícios básicos de violão e guitarra baseada em
								alguns métodos já experienciados por mim enquanto discente e
								docente. Com isso, Cordaria pretende
								<strong
									>ampliar as possibilidades metodológicas do ensino
									prático</strong
								>
								destes instrumentos num cenário EAD e oferecer uma oportunidade
								diferente para iniciação da arte do fazer musical, além de
								incentivar programadores e professores a pensar novas formas de
								aprendizagem.
							</p>
						</div>
					</section>
				</div>
			</div>
		</div>
		<aside class="row justify-content-center mt-3 m-3">
			<div class="col-9">
				<p id="credit-text" class="text-center">
					Esta pesquisa foi possível devido ao apoio da Lei Emergencial de
					Incentivo à Cultura – Lei Aldir Blanc, Governo Federal, Ministério do
					Turismo e Secretaria Especial de Cultura, através da aprovação no
					Edital LAB no 14/2020 – “Seleção de Bolsistas para as Áreas Artísticas
					Técnicas e de Produção Cultural” promovido pela Secretaria de Cultura
					e Turismo de Minas Gerais – SECULT.
				</p>
			</div>
		</aside>
	</div>
</template>

<script>
	import Box from '@/components/box/Box.vue'
    import Pdf from '@/assets/pdfs/SACRAMENTO-Luciano-Cordaria-desenvolvimento-de-aplicacao-web-para-violao-e-guitarra.pdf'


	export default {
		components: { Box },

		data() {
			return {
				title: 'SOBRE',
                pdf: Pdf,

				boxes: {
					what: {
						text: '<h2>O que é?</h2>',
						schema: 'the-project',
						leftLogo: false,
						rightLogo: false,
					},
					doing: {
						text: '<h2>O que faz?</h2>',
						schema: 'the-project',
						leftLogo: false,
						rightLogo: false,
					},
					callInAction: {
						text: '<main><a style="font-size:1.5em" class="no-text-decoration" href="/a-pratica">Inicie agora seu treinamento!</a></main>',
						schema: 'the-project',
						leftLogo: true,
						rightLogo: false,
					},
                    aboutResearch: {
						text: '<h2>Como surgiu?</h2>',
						schema: 'the-research',
						leftLogo: false,
						rightLogo: false,
					},
					downloadResearch: {
						text: `
                           <div
                    class="
                      col
                      download-research
                      d-flex
                      align-items-center
                      justify-content-around
                      small-line-height
                      text-center
                    "
                  >
                    <div>A Pesquisa<br />Na íntegra</div>
                    <div>&nbsp;|&nbsp;<br />&nbsp;|&nbsp;</div>
                    <div>Baixe<br /><span class="font-bold">Aqui</span></div>
                    <div>
                      
                        <img
                          @mouseover="icon.url = imageMouseOver(icon)"
                          @mouseleave="icon.url = imageMouseLeave(icon)"
                          class="img img-fluid icon"
                          :src="icon.url"
                          :alt="icon.altText"
                        />
                    </div>
                  </div>
                `,
						schema: 'the-research',
						leftLogo: false,
						rightLogo: true,
					},
				},
                researchUrl: '/files/pdf/pesquisa.pdf',

			}
		},
		head() {
			return {
				title: 'Cordaria - O Projeto',
				meta: [
					{
						hid: 'titleprojeto',
						name: 'title',
						content: 'Cordaria - Já praticou hoje?',
					},
					{
						hid: 'projeto',
						name: 'description',
						content:
							'O projeto Cordaria é resultado de uma pesquisa que vem para auxiliar, educandos e professores, a prática de violão e guitarra',
					},
					{
						hid: 'projetokeys',
						name: 'keywords',
						content:
							'pesquisa, prática, música, projeto, violão, guitarra, método',
					},
				],
				link: [
					{
						rel: 'canonical',
						href: 'https://cordaria.com.br',
					},
				],
			}
		},
	}
</script>

<style scoped>
	a {
		font-size: 1.5em !important;
	}
	#the-project {
		text-align: center;
	}

	.large-line-height {
		line-height: 1.7;
	}

    #credit-text {
		font-family: var(--font-light);
		font-size: var(--font-size-light) !important;
	}

	.the-research p {
		font-size: 0.83em;
	}

	#credit-text {
		font-size: 0.67em !important;
		font-family: 'Encode Sans';
		font-weight: var(--font-light);
	}

	.download-research {
		font-family: 'Encode Sans';
		font-weight: var(--font-regular);
		font-size: 0.95em;
	}
	.font-bold {
		font-family: 'Encode Sans';
		font-weight: var(--font-bold);
	}

	.small-line-height {
		line-height: 1.3;
	}
</style>
