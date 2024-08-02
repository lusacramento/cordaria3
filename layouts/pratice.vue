<template>
	<main id="main-pratice">
		<slot />
	</main>
</template>

<script lang="ts" setup></script>

<style>
	#main-pratice {
		height: 100vh;
		color: rgba(255, 255, 255, 0.9);
		background-color: var(--bg-layer-center);
	}
</style>
