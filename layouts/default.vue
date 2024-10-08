<template>
	<div id="app" class="app container-fluid">
		<div id="nav" class="d-flex">
			<LayoutsNav />
		</div>
		<main id="main">
			<slot />
		</main>
		<div id="footer container-fluid"></div>
	</div>
</template>

<script lang="ts" setup>
	onMounted(() => {
		inicializeStores()
	})

	function inicializeStores() {
		useMyUserStore()
		useMySettingsStore()
	}
</script>

<style scoped>
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

		grid-template-areas:
			'nav'
			'main'
			'foot';
	}

	#nav {
		grid-area: nav;
	}
	#main {
		grid-area: main;
		border-top: var(--border-main);
	}

	#footer {
		grid-area: foot;
	}

	.hideFooter {
		display: none;
	}

	.justify {
		text-align: justify;
	}

	.no-text-decoration {
		text-decoration: none;
	}
</style>
