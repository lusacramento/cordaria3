<template>
	<footer class="footer container-fluid justify-content-center">
		<div class="row justify-content-center align-items-center">
			<div class="col">
				<div id="credits" class="">
					<p class="d-block text-center">
						Developer:
						<a :href="team.author.link" rel="nofollow" target="_blank">{{
							team.author.name
						}}</a>

						<br />
						Designer: &nbsp;
						<a :href="team.design.link" rel="nofollow" target="_blank">{{
							team.design.name
						}}</a>
					</p>
				</div>
			</div>
			<div class="col">
				<div class="copyright text-center">
					<p>
						Todos os Direitos Reservados
						<br />
						Versão {{ version }}
					</p>
				</div>
			</div>
			<div class="col">
				<div class="sponsed text-center">
					Espaço reservado para patrocinador.<br />Divulgue sua marca aqui!
				</div>
			</div>
		</div>
	</footer>
</template>

<script lang="ts" setup>
const team = {
	author: {
		name: 'Lu Sacramento',
		link: 'https://github.com/lusacramento',
	},
	design: {
		name: 'Gabriel Barreto',
		link: 'https://mixeldesign.com.br/',
	},
}
const isDisabledfoot = false
const version = 'beta 3.0.0 - 2023'
</script>

<style>
.footer {
	border-top: 2px solid rgba(255, 255, 255, 0.3);
}

.credits,
.copyright,
.sponsed {
	font-family: 'Encode Sans';
	font-weight: var(--font-light);
}

.credits,
.sponsed {
	font-size: 0.8em;
}

.copyright {
	font-size: 0.7em;
}

.disable-footer {
	display: none;
}

@media (min-width: 991.96px) {
	.footer {
		width: 80% !important;
	}
}

@media (max-width: 991.98px) {
	.credits {
		text-align: center !important;
	}
}
</style>
