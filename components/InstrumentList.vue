<template>
	<div id="instrument-list" class="d-flex justify-content-center">
		<ul>
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
				<label class="btn btn-outline-secondary" for="danger3-outlined">{{
					instruments.cavaco.label
				}}</label>
			</li>
		</ul>
	</div>
</template>

<script lang="ts" setup>
	import { Instrument } from '~/types/Instrument'

	const { instrument } = storeToRefs(useMyUserDetailsStore())
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
</script>

<style scoped>
	label {
		width: 80px;
	}

	li {
		padding-inline: 10px;
	}
</style>
