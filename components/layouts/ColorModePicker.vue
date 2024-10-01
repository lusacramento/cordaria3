<template>
	<div class="">
		<ul class="list-group list-group-horizontal">
			<li class="theme-icon-area list-group-item">
				<ThemeIconsLight
					@click.prevent="changeColor('light')"
					:class="getClasses('light')"
				/>
			</li>
			<li class="theme-icon-area list-group-item">
				<ThemeIconsDark
					@click.prevent="changeColor('dark')"
					:class="getClasses('dark')"
				/>
			</li>
		</ul>
	</div>
</template>

<script lang="ts" setup>
	const { preference, value } = toRefs(useColorMode())

	function getClasses(color: any) {
		return {
			preferred: color === preference,
			selected: color === value,
		}
	}

	function changeColor(color: string) {
		preference.value = color
		value.value = color
	}
</script>

<style scoped>
	ul {
		list-style: none;
		padding: 0;
		margin: 0;
	}
	ul li {
		display: inline-block;
		padding: 1px;
	}
	.theme-icon-area {
		position: relative;
		top: 0px;
		cursor: pointer;
		padding: 3px;
		background-color: transparent;
		border: 2px solid rgba(255, 255, 255, 0.5);
		margin: 0;
		border-radius: 5px;
		transition: all 0.1s ease;
		stroke: #ffffff !important;
		fill: aliceblue;
	}

	.theme-icon-area > svg {
		fill: tarnsparent;
		stroke: rgba(255, 255, 255, 0.5);
	}

	.theme-icon-area > svg:hover {
		fill: tarnsparent;
		stroke: rgba(255, 255, 255, 1);
	}
	.theme-icon-area:hover {
		top: -3px;
	}
	.theme-icon-area.preferred {
		border-color: var(--color-primary);
		top: -3px;
	}
	.theme-icon-area.selected {
		color: var(--color-primary);
	}
</style>
