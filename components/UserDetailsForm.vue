<template>
	<form id="user-details-form" class="form">
		<div class="row">
			<div class="col-9">
				<div class="mb-3">
					<label for="full-name-input" class="form-label">Nome Completo</label>
					<input
						id="full-name-input"
						type="text"
						class="form-control"
						v-model="fullName"
					/>
				</div>
			</div>
			<div class="col-3">
				<div class="mb-3">
					<label for="age-input" class="form-label">Idade</label>
					<input
						id="age-input"
						type="number"
						class="form-control"
						max="120"
						v-model="age"
					/>
				</div>
			</div>
		</div>
		<div class="row">
			<div class="col-9">
				<div v-if="!fields.fullName.isValidated">
					<small class="text-danger">Somente caracteres alfabéticos.</small>
				</div>
			</div>
		</div>
		<div class="row">
			<div class="col-6">
				<div class="mb-3">
					<label for="state-input" class="form-label">Estado</label>
					<input
						id="state-input"
						type="text"
						class="form-control"
						v-model="state"
					/>
				</div>
			</div>
			<div class="col-6">
				<div class="mb-3">
					<label for="country-input" class="form-label">País</label>
					<input
						id="country-input"
						type="text"
						class="form-control"
						v-model="country"
					/>
				</div>
			</div>
		</div>
		<div class="row">
			<div class="col-6">
				<div v-if="!fields.state.isValidated">
					<small class="text-danger"> Somente caracteres alfabéticos. </small>
				</div>
			</div>
			<div class="col-6">
				<div v-if="!fields.country.isValidated">
					<small class="text-danger"> Somente caracteres alfabéticos.</small>
				</div>
			</div>
		</div>
		<div class="row d-flex instruments justify-content-center mb-3">
			<div class="col">
				<label for="instrument-input" class="form-label"> Instrumento</label>
			</div>
		</div>

		<div class="row d-flex instruments justify-content-center text-center mb-3">
			<div class="col-auto">
				<input
					type="radio"
					class="btn-check"
					name="instrument-input"
					id="acoustic-guitar"
					autocomplete="off"
					checked
					v-model="instrument"
					value="acoustic-guitar"
				/>
				<label class="btn btn-outline-success" for="acoustic-guitar"
					>Violão</label
				>
			</div>
			<div class="col-auto">
				<input
					type="radio"
					class="btn-check"
					name="instrument-input"
					id="electric-guitar"
					autocomplete="off"
					v-model="instrument"
					value="electric-guitar"
				/>
				<label class="btn btn-outline-danger" for="electric-guitar"
					>Guitarra</label
				>
			</div>
			<div class="col-auto">
				<input
					type="radio"
					class="btn-check"
					name="instrument-input"
					id="bass"
					autocomplete="off"
					v-model="instrument"
					value="bass"
				/>
				<label class="btn btn-outline-danger" for="bass">Baixo</label>
			</div>
			<div class="col-auto">
				<input
					type="radio"
					class="btn-check"
					name="instrument-input"
					id="cavaco"
					autocomplete="off"
					v-model="instrument"
					value="cavaco"
				/>
				<label class="btn btn-outline-danger" for="cavaco">Cavaquinho</label>
			</div>
		</div>
		<div class="row">
			<div class="col-9">
				<div v-if="!fields.instrument.isValidated">
					<small class="text-danger">Selecione um instrumento.</small>
				</div>
			</div>
			<div class="col-3"></div>
		</div>

		<div class="mb-3 row d-flex justify-content-center">
			<label for="image-url-input" class="form-label">Imagem de perfil</label>
			<UploadAvatar />
		</div>
	</form>
</template>

<script lang="ts" setup>
	const { fullName, age, state, country, instrument } = storeToRefs(
		useMyUserDetailsStore(),
	)

	const fields: any = ref({
		fullName: { id: 'fullName', content: fullName, isValidated: false },
		age: {
			id: 'age',
			content: age,
			isValidated: false,
		},
		state: {
			id: 'state',
			content: state,
			isValidated: false,
		},
		country: {
			id: 'country',
			content: country,
			isValidated: false,
		},
		instrument: {
			id: 'instrument',
			content: instrument,
			isValidated: false,
		},
	})

	watch(fields.value, () => {
		fields.value.fullName.isValidated = useValidations().validateFullName(
			fullName.value,
		)
		fields.value.age.isValidated = useValidations().validateAge(age.value)
		fields.value.state.isValidated = useValidations().validateState(state.value)
		fields.value.country.isValidated = useValidations().validateCountry(
			country.value,
		)

		fields.value.instrument.isValidated = useValidations().validateInstrument(
			instrument.value,
		)
	})

	function verifyAllValidations() {
		if (
			fields.value.fullName.isValidated &&
			fields.value.age.isValidated &&
			fields.value.state.isValidated &&
			fields.value.country.isValidated &&
			fields.value.instrument.isValidated
		)
			return true
		return false
	}
</script>

<style scoped>
	.form-control {
		color: rgba(255, 255, 255, 0.5) !important;
	}
	.form-control:focus {
		color: rgba(255, 255, 255, 0.9) !important;
	}
	#image-url-input {
		border: 2px, solid, blue;
		height: 200px;
		width: 400px;
	}

	.instrument {
		border: solid 1px green;
	}

	.instrument:hover {
		background-color: green;
	}

	.btn {
		width: 95px;
		margin: 0 !important;
		padding: 10px 0px;
	}
</style>
