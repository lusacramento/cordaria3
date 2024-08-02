<template>
	<div id="the-project" class="the-project">
		<div class="container-fluid">
			<LayoutsHeader :title="title" />
		</div>
		<div class="container layer-center">

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
	</div>
</template>

<script>
	import Box from '@/components/box/Box.vue'

	export default {
		components: { Box },

		data() {
			return {
				title: 'O PROJETO',
				boxes: {
					
					callInAction: {
						text: '<main><a style="font-size:1.5em" class="no-text-decoration" href="/a-pratica">Inicie agora seu treinamento!</a></main>',
						schema: 'the-project',
						leftLogo: true,
						rightLogo: false,
					},
				},
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
</style>
