<template>
	<div class="container justify-content-center d-flex">
		<form>
			<div class="form-group col-6 col-lg-12 col-6 col-lg-12 mb-4">
				<label for="select-schema" class="form-label">Tema</label>
				<br />
				<div class="form-check form-switch">
					<span>Escuro</span>
					<input
						v-model="theme"
						class="form-check-input mx-3"
						type="checkbox"
						role="switch"
						id="select-schema"
					/>
					<span>Claro</span>
				</div>
			</div>
			<div
				class="form-group col-6 col-lg-12 col-6 col-lg-12 select-screen mb-4"
			>
				<label for="select-view-mode" class="form-label">Visualização</label>
				<br />
				<select id="select-view-mode" v-model="viewMode" class="controls">
					<option
						v-for="viewMode in viewModes"
						:key="viewMode.value"
						:value="viewMode.value"
					>
						{{ viewMode.label }}
					</option>
				</select>
			</div>
			<div
				class="form-group col-6 col-lg-12 col-6 col-lg-12 select-counter mb-4"
			>
				<label for="customRange2" class="form-label">Contador</label>
				<input
					v-model="counter"
					type="range"
					class="form-range"
					min="2"
					max="8"
					id="customRange2"
				/>
				<span class="d-flex justify-content-center">{{ counter }}</span>
			</div>
			<div class="d-flex justify-content-center">
				<button
					type="button"
					@click.prevent="showStatistics()"
					data-bs-dismiss="offcanvas"
					aria-label="Close"
				>
					Estatísticas
				</button>
			</div>
		</form>
	</div>
</template>

<script lang="ts" setup>
	const settingsStore = useMySettingsStore()
	const viewModes = [
		{
			label: '3 Cartas',
			value: '3Cards',
		},
		{
			label: '2 Cartas',
			value: '2Cards',
		},
		{
			label: 'Todas Cartas',
			value: 'allCards',
		},
	]
	const viewMode = ref(settingsStore.getViewMode)

	watch(viewMode, (newValue) => {
		settingsStore.setViewMode(newValue)
	})

	const counter = ref(settingsStore.getCounter)

	watch(counter, (newValue) => {
		settingsStore.setCounter(newValue)
	})

	const theme = ref(settingsStore.getTheme)

	watch(theme, () => {
		settingsStore.toogleTheme()
	})

	function showStatistics() {
		useController().toogleShowStatistics()
	}
</script>

<style scoped>
	label {
		font-family: 'Encode Sans';
		font-weight: var(--font-regular);
		font-size: 0.9em;
	}

	.form-check-input {
		float: none;
	}
	.form-check {
		padding-left: 0;
	}

	span {
		font-family: 'Encode Sans';
		font-weight: var(--font-regular);
		font-size: 0.9em;
	}
</style>
