<template>
	<nav
		class="nav navbar navbar-expand-lg container-fluid align-items-center d-flex"
	>
		<div class="col-lg-3 align-items-center d-flex">
			<nuxt-link
				id="link-principal"
				to="/"
				class="navbar-brand logo-cordaria"
				:class="{ active: links.theProject.isLight }"
				aria-current="page"
			>
				<img
					:src="icons.cordaria.url"
					:alt="icons.cordaria.altText"
					class="img img-fluid"
					@mouseover="icons.cordaria.url = icons.cordaria.toLight()"
					@mouseleave="icons.cordaria.url = icons.cordaria.toDark()"
				/>
			</nuxt-link>
		</div>
		<div class="col-lg-9 align-items-center d-flex">
			<div
				id="navbarSupportedContent"
				class="navbar-collapse justify-content-end me-5"
				:class="{ collapse: isCollapse }"
			>
				<ul class="navbar-nav" :class="{ collapseColor: !isCollapse }">
					<li class="nav-item">
						<nuxt-link
							to="/"
							class="nav-link the-project-link"
							:class="{
								theProjectLinkActive: links.theProject.isLight,
							}"
							aria-current="page"
							><span>O Projeto</span></nuxt-link
						>
					</li>
					<li class="nav-item">
						<nuxt-link
							to="/a-pesquisa"
							class="nav-link the-research-link"
							:class="{ theResearchLinkActive: links.theResearch.isLight }"
							aria-current="page"
						>
							<span>A Pesquisa</span></nuxt-link
						>
					</li>
					<!-- <li class="nav-item">
						<nuxt-link
							to="/a-pratica"
							class="nav-link the-pratice-link"
							:class="{ thePraticeLinkActive: links.thePratice.isLight }"
							><span>A Prática</span></nuxt-link
						>
					</li> -->
					<li class="nav-item">
						<nuxt-link
							to="/o-tutorial"
							class="nav-link the-tutorial-link"
							:class="{ theTutorialLinkActive: links.theTutorial.isLight }"
							><span>O Tutorial</span></nuxt-link
						>
					</li>
					<li class="nav-item">
						<nuxt-link
							to="/dicas"
							class="nav-link clues-link"
							:class="{ cluesLinkActive: links.clues.isLight }"
							><span>Dicas</span></nuxt-link
						>
					</li>
					<li class="nav-item">
						<nuxt-link
							to="/dicas"
							class="nav-link the-pratice-link"
							:class="{ thePraticeLinkActive: links.thePratice.isLight }"
							data-bs-toggle="modal"
							data-bs-target="#exampleModal"
							><span>Entrar</span></nuxt-link
						>
					</li>
					<li class="nav-item">
						<a class="nav-link email-link" :href="icons.email.href">
							<img
								class="img img-fluid"
								:src="icons.email.url"
								:alt="icons.email.altText"
								@mouseover="icons.email.url = icons.email.toLight()"
								@mouseleave="icons.email.url = icons.email.toDark()"
							/>
						</a>
					</li>
					<li class="nav-item">
						<a
							class="nav-link insta-link"
							href="https://instagram.com/cordaria.app"
							target="_blank"
						>
							<img
								class="img img-fluid"
								:src="icons.insta.url"
								:alt="icons.insta.altText"
								@mouseover="icons.insta.url = icons.insta.toLight()"
								@mouseleave="icons.insta.url = icons.insta.toDark()"
							/>
						</a>
					</li>
				</ul>
			</div>
		</div>
		<!-- <div class="container-fluid">
				<div>
					<nuxt-link
						id="link-principal"
						to="/"
						class="navbar-brand logo-cordaria"
						:class="{ active: links.theProject.isLight }"
						aria-current="page"
					>
						<img
							:src="icons.cordaria.url"
							:alt="icons.cordaria.altText"
							class="img img-fluid"
							@mouseover="icons.cordaria.url = icons.cordaria.toLight()"
							@mouseleave="icons.cordaria.url = icons.cordaria.toDark()"
						/>
					</nuxt-link>
				</div>
				<button
					class="navbar-dark navbar-toggler"
					type="button"
					data-bs-toggle="collapse"
					data-bs-target="#navbarSupportedContent"
					aria-controls="navbarSupportedContent"
					aria-expanded="false"
					aria-label="Toggle navigation"
					@click="showMenu()"
				>
					<span class="navbar-toggler-icon"></span>
				</button>
				<div
					id="navbarSupportedContent"
					class="navbar-collapse"
					:class="{ collapse: isCollapse }"
				>
					<div class="container-fluid">
						<ul class="navbar-nav" :class="{ collapseColor: !isCollapse }">
							<li class="nav-item">
								<nuxt-link
									to="/"
									class="nav-link the-project-link"
									:class="{
										theProjectLinkActive: links.theProject.isLight,
									}"
									aria-current="page"
									><span>O Projeto</span></nuxt-link
								>
							</li>
							<li class="nav-item">
								<nuxt-link
									to="/a-pesquisa"
									class="nav-link the-research-link"
									:class="{ theResearchLinkActive: links.theResearch.isLight }"
									aria-current="page"
								>
									<span>A Pesquisa</span></nuxt-link
								>
							</li>
							<li class="nav-item">
								<nuxt-link
									to="/a-pratica"
									class="nav-link the-pratice-link"
									:class="{ thePraticeLinkActive: links.thePratice.isLight }"
									><span>A Prática</span></nuxt-link
								>
							</li>
							<li class="nav-item">
								<nuxt-link
									to="/o-tutorial"
									class="nav-link the-tutorial-link"
									:class="{ theTutorialLinkActive: links.theTutorial.isLight }"
									><span>O Tutorial</span></nuxt-link
								>
							</li>
							<li class="nav-item">
								<nuxt-link
									to="/dicas"
									class="nav-link clues-link"
									:class="{ cluesLinkActive: links.clues.isLight }"
									><span>Dicas</span></nuxt-link
								>
							</li>
							<li class="nav-item">
								<a class="nav-link email-link" :href="icons.email.href">
									<img
										class="img img-fluid"
										:src="icons.email.url"
										:alt="icons.email.altText"
										@mouseover="icons.email.url = icons.email.toLight()"
										@mouseleave="icons.email.url = icons.email.toDark()"
									/>
								</a>
							</li>
							<li class="nav-item">
								<a
									class="nav-link insta-link"
									href="https://instagram.com/cordaria.app"
									target="_blank"
								>
									<img
										class="img img-fluid"
										:src="icons.insta.url"
										:alt="icons.insta.altText"
										@mouseover="icons.insta.url = icons.insta.toLight()"
										@mouseleave="icons.insta.url = icons.insta.toDark()"
									/>
								</a>
							</li>
						</ul>
					</div>
				</div>
			</div> -->
	</nav>
</template>

<script>
	import cordariaIconDisabled from '@/assets/imgs/logo-cordaria-disabled.png'
	import cordariaIconEnabled from '@/assets/imgs/logo-cordaria-enabled.png'

	import emailIconDisabled from '@/assets/imgs/email-icon-disabled.png'
	import emailIconEnabled from '@/assets/imgs/email-icon-enabled.png'

	import instaIconDisabled from '@/assets/imgs/logo-insta-disabled.png'
	import instaIconEnabled from '@/assets/imgs/logo-insta-enabled.png'
	export default {
		data() {
			return {
				icons: {
					cordaria: {
						url: cordariaIconDisabled,
						altText: 'Logotipo do Cordaria',
						toLight: () => cordariaIconEnabled,
						toDark: () => cordariaIconDisabled,
					},

					email: {
						href: 'mailto:japraticouhoje@cordaria.com.br',
						url: emailIconDisabled,
						altText: 'Ícone contato',
						toLight: () => emailIconEnabled,
						toDark: () => emailIconDisabled,
					},

					insta: {
						url: instaIconDisabled,
						altText: 'Ícone Instagram',
						toLight: () => instaIconEnabled,
						toDark: () => instaIconDisabled,
					},
				},

				links: {
					theProject: {
						isLight: false,
					},
					theResearch: {
						isLight: false,
					},
					thePratice: {
						isLight: false,
					},
					theTutorial: {
						isLight: false,
					},
					clues: {
						isLight: false,
					},
				},

				isCollapse: true,
			}
		},
		async mounted() {
			await this.iniciateActive()
		},

		watch: {
			$route() {
				this.iniciateActive()
			},
		},

		methods: {
			getUrl: function async() {
				return window.location.href
			},

			showMenu() {
				this.isCollapse = !this.isCollapse
			},

			removeAllActive() {
				this.links.theProject.isLight = false
				this.links.theResearch.isLight = false
				this.links.thePratice.isLight = false
				this.links.theTutorial.isLight = false
				this.links.clues.isLight = false
				this.isOverIconMenu = false
			},

			iniciateActive() {
				this.removeAllActive()
				const url = window.location.href
				const baseUrl = window.location.origin

				switch (url) {
					case `${baseUrl}/`:
						this.links.theProject.isLight = true
						break
					case `${baseUrl}/a-pesquisa`:
						this.links.theResearch.isLight = true
						break
					case `${baseUrl}/a-pratica`:
						this.links.thePratice.isLight = true
						break
					case `${baseUrl}/o-tutorial`:
						this.links.theTutorial.isLight = true
						break
					case `${baseUrl}/dicas`:
						this.links.clues.isLight = true
					default:
						break
				}
			},
		},
	}
</script>

<style>
	.nav {
		font-size: var(--font-size-nav);
		font-family: var(--font-semibold);
		margin-left: 5px;
		margin-right: 5px;
	}

	.collapseColor {
		background-color: var(--bg-nav-collapse) !important;
		display: block;
		padding: 10px;
		width: 200px !important;
		border-radius: 15pt;
		color: rgba(255, 255, 255, 1) !important;
	}

	.nav-link {
		color: var(--font-color-nav) !important;
		margin: 0 10px;
	}

	.theProjectLinkActive {
		color: var(--the-project-color) !important;
	}
	.the-project-link:hover {
		color: var(--the-project-color) !important;
	}

	.theResearchLinkActive {
		color: var(--the-research-color) !important;
	}
	.the-research-link:hover {
		color: var(--the-research-color) !important;
	}

	.thePraticeLinkActive {
		color: var(--the-pratice-color) !important;
	}
	.the-pratice-link:hover {
		color: var(--the-pratice-color) !important;
	}

	.theTutorialLinkActive {
		color: var(--the-tutorial-color) !important;
	}
	.the-tutorial-link:hover {
		color: var(--the-tutorial-color) !important;
	}

	.cluesLinkActive {
		color: var(--clues-color) !important;
	}
	.clues-link:hover {
		color: var(--clues-color) !important;
	}

	button:hover {
		background-color: rgba(255, 255, 255, 0.089);
	}

	@media (min-width: 991.98px) {
		.logo-cordaria {
			margin-left: 115px;
		}
	}

	@media (max-width: 576px) {
		.logo-cordaria {
			margin-left: 28px;
		}
	}
</style>
