<template>
	<ul id="instrument-list" class="justify-content-center d-flex">
		<div class="row">
			<div class="col">
				<li>
					<input
						type="radio"
						class="btn-check"
						name="options-outlined"
						id="success-outlined"
						v-model="instrument"
						:value="instruments.acousticGuitar.value"
						autocomplete="off"
					/>
					<label class="btn btn-outline-success" for="success-outlined">{{
						instruments.acousticGuitar.label
					}}</label>
				</li>
			</div>
			<div class="col">
				<li>
					<input
						type="radio"
						class="btn-check"
						name="options-outlined"
						id="danger-outlined"
						v-model="instrument"
						:value="instruments.electricGuitar.value"
						autocomplete="off"
					/>
					<label class="btn btn-outline-danger" for="danger-outlined">{{
						instruments.electricGuitar.label
					}}</label>
				</li>
			</div>
			<div class="col">
				<li>
					<input
						type="radio"
						class="btn-check"
						name="options-outlined"
						id="danger2-outlined"
						v-model="instrument"
						:value="instruments.bass.value"
						autocomplete="off"
					/>
					<label class="btn btn-outline-warning" for="danger2-outlined">{{
						instruments.bass.label
					}}</label>
				</li>
			</div>
			<div class="col">
				<li>
					<input
						type="radio"
						class="btn-check"
						name="options-outlined"
						id="danger3-outlined"
						v-model="instrument"
						:value="instruments.cavaco.value"
						autocomplete="off"
					/>
					<label class="btn btn-outline-info" for="danger3-outlined">{{
						instruments.cavaco.label
					}}</label>
				</li>
			</div>
		</div>
	</ul>
</template>

<script lang="ts" setup>
	import { Instrument } from '~/types/Instrument'

	const db = useDbController()
	const { refreshPage } = useViewController()

	const { instrument } = storeToRefs(useMySettingsStore())
	const instruments = ref({
		default: ref(),
		acousticGuitar: {
			label: 'violao',
			value: Instrument.ACOUSTICGUITAR,
		},
		electricGuitar: {
			label: 'guitarra',
			value: Instrument.ELECTRICGUITAR,
		},
		bass: {
			label: 'baixo',
			value: Instrument.BASS,
		},
		cavaco: {
			label: 'cavaco',
			value: Instrument.CAVACO,
		},
	})

	const {} = watch(instrument, async (newValue, oldValue, on) => {
		if (oldValue !== Instrument.NOT_SELECTED) {
			alert('Para concluir a alteração, a página será atualizada.')
			await db.updateSettings({ instrument: newValue })
			refreshPage()
		}
	})
</script>

<style scoped>
	label {
		width: 80px;
	}

	li {
		padding: 5px;
	}
</style>
