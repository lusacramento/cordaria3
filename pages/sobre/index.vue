<template>
	<div id="the-project" class="the-project">
		<div class="container-fluid">
			<LayoutsHeader>
				<template #center>
					<LayoutsBox :box="boxes.title" />
				</template>
			</LayoutsHeader>
		</div>
		<div class="container layer-center content">
			<div class="row justify-content-around">
				<div class="col-md-4 col-12 mt-4">
					<LayoutsBox :box="boxes.what" />
					<p class="text-justify">
						Destinado à pessoas interessadas em iniciar o estudo do violão,
						guitarra, cavaquinho e baixo, e também professores dessa arte, o
						projeto Cordaria é um aplicativo web com intuito de auxiliar a
						prática ao instrumento.
					</p>
					<p class="text-justify">
						Desenvolvido pelo músico e programador Lu Sacramento, o projeto é
						fruto de uma pesquisa sobre novas metodologias e abordagens ao
						ensino à distância de música.
					</p>
				</div>
				<div class="col-md-4 col-12 mt-4">
					<LayoutsBox :box="boxes.doing" class="" />
					<p class="text-justify">
						Sua função é gerar exercícios básicos de digitação com foco na
						técnica. Tais exercícios vem para auxiliar o educando a executar as
						notas dadas através de uma escrita de tablatura, com uma linguagem
						de fácil entendimento comparado a escrita de partitura.
					</p>
					<p class="text-justify">
						Desta forma, o aluno poderá praticar junto ao auxílio de um
						“correpetidor” virtual, em qualquer momento e lugar!
					</p>
				</div>
			</div>
			<hr />
			<aside class="row d-flex justify-content-center mt-5 mb-5">
				<div class="col-lg-6 col-md-9 col-12">
					<LayoutsBox :box="boxes.callInAction" class="call-in-action" />
				</div>
			</aside>
			<hr />
		</div>
		<div class="container mt-5">
			<div class="row justify-content-around">
				<section class="col-md-5">
					<LayoutsBox :box="boxes.research" class="mb-4" />

					<p class="text-justify">
						A pesquisa “Cordaria – Desenvolvimento de aplicação web para
						iniciação à prática do violão e guitarra” surge em um momento
						delicado da história mundial: a pandemia do Coronavírus – COVID 19.
						Compelidos a este problema, os profissionais da área da educação,
						sobre tudo com atuação na área da música enfrentam grandes desafios
						para conseguir adequar suas atividades para o ensino a distância.
						Parte deste desafio é devido a escassez de recursos tecnológicos que
						fogem da metodologia tradicional de ensino, muito das vezes,
						limitado a vídeos, textos, imagens e de forma repetida. Os problemas
						se amplificam com usuários oriundos da classe baixa, que tem uma
						limitação considerável de hardware e/ou baixa conexão de internet.
					</p>
					<p class="text-justify">
						Acesse a pesquisa na íntegra
						<a :href="pdf" target="_blank">aqui</a>.
					</p>
				</section>
				<div class="col-md-5">
					<aside class="row justify-content-center">
						<LayoutsBox :box="boxes.idea" class="mb-4" />
					</aside>
					<section class="row">
						<div class="col">
							<p class="text-justify">
								Utilizando meus conhecimentos de uma década como professor e
								alguns anos de desenvolvedor web, implementei uma aplicação para
								prática de exercícios básicos de violão e guitarra baseada em
								alguns métodos já experienciados por mim enquanto discente e
								docente. Com isso, Cordaria pretende ampliar as possibilidades
								metodológicas do ensino prático destes instrumentos num cenário
								EAD e oferecer uma oportunidade diferente para iniciação da arte
								do fazer musical, além de incentivar programadores e professores
								a pensar novas formas de aprendizagem.
							</p>
						</div>
					</section>
				</div>
			</div>
		</div>
		<div class="container mt-5">
			<div class="row justify-content-around">
				<section class="col-md-5">
					<LayoutsBox :box="boxes.release" class="mb-4" />

					<div class="accordion accordion-flush" id="accordionExample">
						<div class="accordion-item">
							<h2 class="accordion-header">
								<button class="accordion-button collapsed" type="button" data-bs-toggle="collapse"
									data-bs-target="#collapseOne" aria-expanded="false" aria-controls="collapseOne">
									<h3>Versão 3.0</h3>
								</button>
							</h2>
							<div id="collapseOne" class="accordion-collapse collapse"
								data-bs-parent="#accordionExample">
								<div class="accordion-body">
									<ul class="text-justify">
										<li>
											Ampliação de novos instrumentos: cavaquinho e baixo;
										</li>
										<li>
											Sistema de cadastro e criação de perfil de usuários;
										</li>
										<li>Sistema de ranqueamento dos usuários;</li>
										<li>Premiação de medalhas virtuais;</li>
										<li>Atualização do tutorial;</li>
										<li>Adição de tema claro;</li>
										<li>Correções de bugs e melhorias de performance.</li>
									</ul>
									<p class="small">
										Edital de Seleção Lei Paulo Gustavo - Nº 004/2023 - Fomento
										Ao Audiovisual de Contagem, categoria I - Apoio a Produções
										Audiovisuais, subcategoria 9 – Game, promovido pela
										Secretaria Municipal de Cultura.
									</p>
								</div>
							</div>
						</div>
						<div class="accordion-item">
							<h2 class="accordion-header">
								<button class="accordion-button collapsed" type="button" data-bs-toggle="collapse"
									data-bs-target="#collapseTwo" aria-expanded="false" aria-controls="collapseTwo">
									<h3>Versão 2.0</h3>
								</button>
							</h2>
							<div id="collapseTwo" class="accordion-collapse collapse"
								data-bs-parent="#accordionExample">
								<div class="accordion-body">
									<ul class="text-justify">
										<li>Melhorias de performance;</li>
										<li>Implementação de novos exercícios.</li>
									</ul>
									<p class="small">Desenvolvido de forma autônoma.</p>
								</div>
							</div>
						</div>
						<div class="accordion-item">
							<h2 class="accordion-header">
								<button class="accordion-button collapsed" type="button" data-bs-toggle="collapse"
									data-bs-target="#collapseThree" aria-expanded="false" aria-controls="collapseThree">
									<h3>Versão 1.0</h3>
								</button>
							</h2>
							<div id="collapseThree" class="accordion-collapse collapse"
								data-bs-parent="#accordionExample">
								<div class="accordion-body">
									<ul class="text-justify">
										<li>
											Implementação do sistema com exercícios para violão e
											guitarra.
										</li>
										<li>
											Modo de visualização de três cartas e todas as cartas.
										</li>
									</ul>

									<p class="small">
										A pesquisa foi possível devido ao apoio da Lei Emergencial
										de Incentivo à Cultura – Lei Aldir Blanc, Governo Federal,
										Ministério do Turismo e Secretaria Especial de Cultura,
										através da aprovação no Edital LAB no 14/2020 – “Seleção de
										Bolsistas para as Áreas Artísticas Técnicas e de Produção
										Cultural” promovido pela Secretaria de Cultura e Turismo de
										Minas Gerais – SECULT.
									</p>
								</div>
							</div>
						</div>
					</div>
				</section>
				<div class="col-md-5">
					<aside class="row justify-content-center">
						<LayoutsBox :box="boxes.expedient" class="mb-4" />
					</aside>
					<section class="row">
						<div class="col">
							<h4>Direção e Desenvolvimento</h4>
							<p>
								<strong><a href="">Lu Sacramento</a></strong>
							</p>
							<h4>Design</h4>
							<p>
								<strong><a href="">Gabriel Barreto</a></strong>
							</p>
						</div>
					</section>
				</div>
			</div>
		</div>
		<hr />
		<aside class="row justify-content-center mt-5 m-3">
			<div class="col-9 mb-3">
				<p id="credit-text" class="text-center">
					O projeto Cordaria 3.0 foi possível devido ao apoio da
					<strong>Lei Paulo Gustavo</strong>, Governo Federal,
					<a href="https://www.gov.br/turismo/pt-br" rel="nofollow">Ministério do Turismo</a>
					e
					<a href="https://portal.contagem.mg.gov.br/" rel="nofollow">Secretaria Municipal de Cultura do
						município de
						Contagem</a>, através da aprovação no EDITAL DE SELEÇÃO LEI PAULO GUSTAVO - Nº
					004/2023 - FOMENTO AO AUDIOVISUAL DE CONTAGEM, sob nº 249364.
				</p>
			</div>
			<div class="col-9 mb-5">
				<div class="row justify-content-center">

					<div class="row justify-content-center">
						<div class="col-3">
							<div class="seal">Apoio</div>
						</div>
						<div class="col-6">
							<div class="seal">Realização</div>
						</div>
					</div>
					<div class="row align-items-center justify-content-center">
						<div class="col-3">
							<img :src="barracaoDasIdeiaLogo" alt="Logotipo do Barracão das Ideia"
								class="img support-logos">
						</div>
						<div class="col-6">
							<img :src="sponsorLogos" alt="Logotipos dos Patrocinadores" class="img  sponsor-logos" />

						</div>
					</div>
				</div>
			</div>
		</aside>
	</div>
</template>

<script lang="ts" setup>
import pdf from '@/assets/pdfs/SACRAMENTO-Luciano-Cordaria-desenvolvimento-de-aplicacao-web-para-violao-e-guitarra.pdf'
import darkSponsorLogos from '~/assets/imgs/sponsors/sponsor-logos-contrast.png'
import lightSponsorLogos from '~/assets/imgs/sponsors/sponsor-logos.png'
import darkBarracaoDasIdeiaLogo from '~/assets/imgs/logotipo-barracao-das-ideia-contrast-350x197px.png'
import lightBarracaoDasIdeiaLogo from '~/assets/imgs/logotipo-barracao-das-ideia-transparent-350x197px.png'

const colorMode = useColorMode()
const barracaoDasIdeiaLogo = ref()
const sponsorLogos = ref()


watch(colorMode, (newColorMode) => {
	getLogos(newColorMode.value)
})

onBeforeMount(() => {
	getLogos(colorMode.value)
})

function getLogos(mode: string) {
	barracaoDasIdeiaLogo.value = (mode === 'dark') ? darkBarracaoDasIdeiaLogo : lightBarracaoDasIdeiaLogo
	sponsorLogos.value = mode === 'dark' ? darkSponsorLogos : lightSponsorLogos
}

const boxes = {
	title: {
		content: '<h1>SOBRE</h1>',
		schema: 'index',
		leftLogo: true,
	},
	what: {
		content: '<h2>O que é?</h2>',
		schema: 'index',
	},
	doing: {
		content: '<h2>O que faz?</h2>',
		schema: 'index',
	},
	research: {
		content: '<h2>A Pesquisa</h2>',
		schema: 'index',
	},
	idea: {
		content: `<h2>Como surgiu?</h2>`,
		schema: 'index',
	},
	release: {
		content: `<h2>Lançamentos</h2>`,
		schema: 'index',
	},
	expedient: {
		content: `<h2>Expediente</h2>`,
		schema: 'index',
	},
	callInAction: {
		content: '<h2><NuxtLink to>JÁ PRATICOU HOJE?</NuxtLink></h2>',
		schema: 'index',
		leftLogo: true,
	},
}
useHead({
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
			content: 'pesquisa, prática, música, projeto, violão, guitarra, método',
		},
	],
	link: [
		{
			rel: 'canonical',
			href: 'https://cordaria.com.br',
		},
	],
})

</script>

<style scoped>
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

.seal {
	color: var(--color-extreme);
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

.sponsor-logos {
	height: 110px !important;

}

.support-logos {
	height: 80px;
}


.call-in-action {
	font-size: 1.3em !important;
}

.text-justify {
	text-align: justify;
}
</style>
