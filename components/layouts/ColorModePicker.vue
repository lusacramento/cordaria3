<template>
	<div class="color-mode-picker">
		<div
			v-if="value === 'dark'"
			class="theme-icon-area align-items-center d-flex"
			@mouseover="iconTheme.light.stroke = 'rgba(255, 255, 255, 1)'"
			@mouseleave="iconTheme.light.stroke = 'rgba(255, 255, 255, .5)'"
		>
			<ThemeIconsLight
				@click.prevent="changeTheme('light')"
				:mode="iconTheme.light"
			/>
		</div>
		<div
			v-if="value === 'light'"
			class="theme-icon-area d-flex align-items-center"
			@mouseover="iconTheme.dark.stroke = 'rgba(0, 0, 0, 1)'"
			@mouseleave="iconTheme.dark.stroke = 'rgba(0, 0, 0, .5)'"
		>
			<ThemeIconsDark
				@click.prevent="changeTheme('dark')"
				:mode="iconTheme.dark"
			/>
		</div>
	</div>
</template>

<script lang="ts" setup>
	onBeforeMount(() => {
		isDarkModeSelected.value = value.value === 'dark' ? true : false
	})
	const { preference, value } = toRefs(useColorMode())

	const isDarkModeSelected = ref(false)

	const iconTheme = ref({
		light: {
			fill: 'rgba(29, 30, 40, 0.1)',
			stroke: 'rgba(255, 255, 255, .5)',
		},
		dark: {
			fill: 'none',
			stroke: 'rgba(0, 0, 0, 0.5)',
		},
	})

	function changeTheme(color: string) {
		preference.value = color
		value.value = color
		isDarkModeSelected.value = color === 'dark' ? true : false
	}
</script>

<style scoped>
	.theme-icon-area {
		height: 25px;
		position: relative;
		cursor: pointer;
		background-color: transparent;
		margin: 1px;
		border-radius: 5px;
		border: none;
		transition: all 0.1s ease;
	}

	.theme-icon-area:hover {
		top: -3px;
	}
</style>
