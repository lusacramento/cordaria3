<template>
	<div v-if="isShowCounter">
		<div id="counter" class="text-center">
			{{ counter }}
		</div>
	</div>
</template>

<script lang="ts" setup>
	// const counter = ref(useMySettingsStore().getCounter)
	const { isShowCounter, counter } = useController()
</script>
<style>
	#counter {
		font-size: 16rem;
		color: var(--font-color-p);
		position: absolute;
		top: 25%;
		right: 40%;
		bottom: 40%;
		left: 40%;
	}
</style>
