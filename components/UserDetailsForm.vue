<template>
	<form id="user-details-form" class="form">
		<div class="row">
			<div class="col-9">
				<div class="mb-3">
					<label for="full-name-input" class="form-label">Nome Completo</label>
					<input id="full-name-input" type="text" class="form-control" v-model="fullName" />
				</div>
			</div>
			<div class="col-3">
				<div class="mb-3">
					<label for="age-input" class="form-label">Idade</label>
					<input id="age-input" type="number" class="form-control" max="120" v-model="age" />
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
					<input id="state-input" type="text" class="form-control" v-model="state" />
				</div>
			</div>
			<div class="col-6">
				<div class="mb-3">
					<label for="country-input" class="form-label">País</label>
					<input id="country-input" type="text" class="form-control" v-model="country" />
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
		<div class="mb-3 row d-flex justify-content-center">
			<label for="image-url-input" class="form-label">Imagem de perfil</label>
			<UploadAvatar />
		</div>
		<button class="btn btn-danger">Apagar Dados</button>
	</form>
</template>

<script lang="ts" setup>
const { fullName, age, state, country } = storeToRefs(useMyUserDetailsStore())

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
})
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

.btn-danger:hover {
	background-color: var(--color-red);
}
</style>
