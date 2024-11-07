<template>
	<div id="tutorial" class="tutorial">
		<div class="container-fluid">
			<LayoutsHeader>
				<template #center>
					<div class="d-flex justify-content-center align-items-center">
						<LayoutsBox :box="box" />
					</div>
				</template>
			</LayoutsHeader>
			<div class="container content">
				<aside class="row d-flex justify-content-center">
					<div class="col-lg-11 col-md-9 col-12">
						<h2 class="h2">Para que seve?</h2>
						<p>
							Cordaria é um método para auxiliar pessoas a prática de
							instrumentos de corda.
						</p>
						<h2 class="h2">Pra quem serve?</h2>
						<p>
							Cordaria é destinado à pessoas interessadas em aprender violão,
							guitarra, baixo e cavaquinho bem como auxiliar professores como
							recurso didático.
						</p>
						<h2 class="h2">Inciando</h2>
						<h3 class="h3">Faça seu cadastro</h3>
						<p>
							para iniciar seu cadastro, basta selecionar o instrumento
							preterido na página inicial e preencher o formulário. Após
							preencher os dados do usuário, você será redirecionado para o
							formulário detalhes do usuário, do qual poderá também, inserir uma
							foto para o seu perfil. Após isso, você poderá acessar o sistema e
							iniciar sua prática!
						</p>
						<h3 class="h3">Mecânica do jogo</h3>
						<p>
							O jogo possui 190 lições, que vão de 30 à 200 batidas por minuto.
							Cada lição consiste em executar a prática com auxílio deste
							correpetidor virtual. Em formtado de baralho, cada carta contém 5
							movimentos que são relacionados com os 4 dedos da mão de digitar
							mais corda, solta.
						</p>
						<h3 class="h3">As cartas</h3>
						<h4 class="h4">Cartas verdes</h4>
						<p>São as cartas futuras a serem tocadas.</p>
						<h4 class="h4">Cartas amarelas</h4>
						<p>São as cartas que estão sendo tocadas.</p>
						<h4 class="h4">Cartas vermelhas</h4>
						<p>São as cartas que já foram tocadas.</p>
						<h2>Preferências</h2>
						<p>
							O botão de preferência poderá ser acessado na botão localizado na
							parte superior esquerda da tela
						</p>
						<h3 class="h3">Instrumento</h3>
						<p>
							Caso possua algum outro instrumento da lista e deseja praticar
							também, você poderá trocar seu instrumento padrão. Quando isso
							acontece, um novo placar será gerado do início. Você poderá
							continuar de onde parou caso retorne ao instrumento anterior. Você
							também poderá trocar de instrumento a partir da tela inicial.
						</p>
						<h3 class="h3">Modo de visualização</h3>
						Aqui, você encontra 3 modos:
						<h4 class="h4">Todas as cartas</h4>
						<h4 class="h4">3 cartas</h4>
						<h4 class="h4">2 cartas</h4>
						<h3 class="h3">Contador</h3>
					</div>
				</aside>
			</div>
		</div>
	</div>
</template>

<script lang="ts" setup>
	const box = {
		content: '<h1>TUTORIAL<h1>',
		schema: 'index',
	}
</script>

<style scoped>
	.layer-center {
		height: 70vh;
	}
	.tutorial {
		color: var(--text-color);
	}
</style>
