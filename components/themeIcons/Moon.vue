<template>
	<svg
		xmlns="http://www.w3.org/2000/svg"
		id="dark-icon"
		:width="20"
		:height="20"
		viewBox="0 0 24 24"
		:fill="props.mode.fill"
		:stroke="props.mode.stroke"
		stroke-width="2"
		stroke-linecap="round"
		stroke-linejoin="round"
		class="feather feather-moon"
	>
		<path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"></path>
	</svg>
</template>
<script lang="ts" setup>
	const props = defineProps({
		mode: {
			type: Object,
			required: true,
			fill: { type: String, required: false, default: () => 'none' },
			stroke: { type: String, required: false, default: () => 'currentColor' },
		},
	})
</script>
