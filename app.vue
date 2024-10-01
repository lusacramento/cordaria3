<template>
	<div class="">
		<div class="color-mode-picker">
			<LayoutsColorModePicker />
		</div>
		<div class="layout">
			<NuxtLayout>
				<NuxtPage />
			</NuxtLayout>
		</div>
	</div>
</template>
<script lang="ts" setup>
	definePageMeta({
		colorMode: 'light',
	})
</script>

<style>
	.page-enter-active,
	.page-leave-active {
		transition: all 0.4s;
	}
	.page-enter-from,
	.page-leave-to {
		opacity: 0;
		filter: blur(1rem);
	}

	.color-mode-picker {
		display: flex;
		position: absolute;
		justify-content: end;
	}
</style>
