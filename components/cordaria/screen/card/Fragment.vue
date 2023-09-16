<template>
	<div
		:id="id"
		:key="id"
		class="card-fragment p-1"
		:class="{ highlight: isHighlight }"
	>
		{{ fragment }}
	</div>
</template>

<script lang="ts" setup>
	//	import '@/assets/animate/animate.min.css'
	defineProps({
		id: String,
		fragment: String,
		isHighlight: Boolean,
	})
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
