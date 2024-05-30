<template>
	<header>
		<div class="row layer-top d-flex align-items-center">
			<div class="col">
				<slot name="left"></slot>
			</div>
			<div class="col justify-content-center text-center">
				<h1 v-html="$props.title" class="title mt-3 mb-4" />
			</div>
			<div class="col">
				<slot name="right"><UserAuth /> </slot>
			</div>
		</div>
	</header>
</template>

<script lang="ts" setup>
	const props = defineProps({
		title: { type: String, required: false, default: 'Title' },
	})
</script>

<style scoped>
	.layer-top {
		height: 120px;
	}
</style>
