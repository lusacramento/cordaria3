<template>
	<div class="color-mode-picker">
		<div v-if="value === 'dark'" class="theme-icon-area align-items-center d-flex"
			@mouseover="iconTheme.light.stroke = 'rgba(255, 255, 255, 1)'"
			@mouseleave="iconTheme.light.stroke = 'rgba(255, 255, 255, .5)'">
			<ThemeIconsSun @click.prevent="changeTheme('light')" :mode="iconTheme.light" />
		</div>
		<div v-if="value === 'light'" class="theme-icon-area d-flex align-items-center"
			@mouseover="iconTheme.dark.stroke = 'rgba(0, 0, 0, 1)'"
			@mouseleave="iconTheme.dark.stroke = 'rgba(0, 0, 0, .5)'">
			<ThemeIconsMoon @click.prevent="changeTheme('dark')" :mode="iconTheme.dark" />
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
		fill: 'rgba(0, 0, 0, 0.5)',
		stroke: 'rgba(255, 255, 255, .5)',
	},
	dark: {
		fill: 'none',
		stroke: 'rgba(0, 0, 0, 0.5)',
	},
})

/**
 * Changes the theme of the application based on the provided color.
 *
 * @param {string} color - The color theme to switch to. Expected values are 'dark' or 'light'.
 * 
 * This function updates the following reactive properties:
 * - `preference.value`: Sets it to the provided color.
 * - `value.value`: Sets it to the provided color.
 * - `isDarkModeSelected.value`: Sets it to `true` if the provided color is 'dark', otherwise sets it to `false`.
 */
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
