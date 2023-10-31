<template>
	<div
		:id="fragment.id"
		:key="fragment.id"
		class="card-fragment p-1"
		:class="{ highlight: fragment.isHighlight }"
	>
		{{ fragment.value }}
	</div>
</template>

<script lang="ts" setup>
	import 'animate.css'
	defineProps(['fragment'])
</script>

<style>
	div.card-fragment {
		display: inline;
	}

	.highlight {
		animation: bounce;
		animation-duration: 100ms;
		font-size: 1.5em;
	}
</style>
