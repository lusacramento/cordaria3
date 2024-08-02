<template>
	<header>
		<div class="layer-top row d-flex align-items-center justify-content-center">
			<div class="col">
				<slot name="left" class=""></slot>
			</div>
			<div class="col">
				<slot name="center" class=""></slot>
			</div>
			<div class="col">
				<slot name="right" class=""></slot>
			</div>
		</div>
	</header>
</template>

<script lang="ts" setup>
	const props = defineProps({
		title: { type: String, required: false },
	})
</script>

<style scoped>
	.layer-top {
		height: 120px;
	}

	.slot {
		display: flex;
	}
</style>
