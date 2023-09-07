<template>
	<div id="app" class="app container-fluid">
		<div id="nav" class="d-flex justify-content-center">
			<LayoutsNav />
		</div>
		<main id="main">
			<slot />
		</main>
		<div id="footer">
			<LayoutsFooter />
		</div>
	</div>
</template>

<script lang="ts" setup></script>

<style>
	@media (min-width: 991.98px) {
		div.app {
			grid-template-rows: 17vh 70vh 11vh;
		}
	}
	div.app {
		display: grid;
		padding: 0;
		margin: 0;

		color: white;
		background-color: var(--bg-app);

		grid-template-areas:
			'nav'
			'main'
			'foot';
	}

	#nav {
		grid-area: nav;
		background-color: var(--bg-nav);
		border-top: var(--borders-nav);
		border-bottom: var(--borders-nav);
	}
	#main {
		grid-area: main;
		border-top: var(--border-main);
	}

	#footer {
		grid-area: foot;
		background-color: var(--bg-app) !important;
	}

	.hideFooter {
		display: none;
	}

	.layer-top {
		background-color: var(--bg-layer-top);
	}

	.layer-center {
		width: 80% !important;
		background: var(--bg-layer-center);
		background: var(--bg-degrade-layer-center);
	}
	.justify {
		text-align: justify;
	}

	.no-text-decoration {
		text-decoration: none;
	}
</style>
