<template>
	<div class="">
		<ul class="d-flex">
			<li
				class="theme-icon-area align-items-center d-flex"
				:class="{
					'dark-border': !isDarkModeSelected,
					enabled: !isDarkModeSelected,
				}"
			>
				<ThemeIconsLight
					@click.prevent="changeColor('light')"
					:mode="iconThemeMode"
				/>
			</li>
			<li
				class="theme-icon-area d-flex align-items-center"
				:class="{
					'light-border': isDarkModeSelected,
					enabled: isDarkModeSelected,
				}"
			>
				<ThemeIconsDark
					@click.prevent="changeColor('dark')"
					:mode="iconThemeMode"
				/>
			</li>
		</ul>
	</div>
</template>

<script lang="ts" setup>
	onBeforeMount(() => {
		isDarkModeSelected.value = value.value === 'dark' ? true : false
		iconThemeMode.value = isDarkModeSelected.value
			? iconTheme.dark
			: iconTheme.light
	})
	const { preference, value } = toRefs(useColorMode())

	const isDarkModeSelected = ref(false)

	const iconThemeMode = ref()

	const iconTheme = {
		light: {
			fill: 'none',
			stroke: 'rgba(29, 30, 40, 1)',
		},
		dark: {
			fill: 'none',
			stroke: 'rgba(226, 225, 215, 1)',
		},
	}

	function changeColor(color: string) {
		preference.value = color
		value.value = color
		isDarkModeSelected.value = color === 'dark' ? true : false
		iconThemeMode.value = isDarkModeSelected.value
			? iconTheme.dark
			: iconTheme.light
	}
</script>

<style scoped>
	li {
		display: inline-block;
		padding: 2px;
	}

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
		background-color: rgba(255, 215, 64, 0.5);
	}

	.enabled {
		background-color: rgba(255, 215, 64, 0.2);
	}

	.light-border {
		border: 1px solid var(--bg-nav-light);
	}
	.dark-border {
		border: 1px solid var(--bg-nav-dark);
	}
</style>
