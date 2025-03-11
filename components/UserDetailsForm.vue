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
			<div class='col'>
				<Autocomplete ref="location" />
			</div>
		</div>
		<div class="mb-3 row d-flex justify-content-center">
			<label for="image-url-input" class="form-label">Imagem de perfil</label>
			<UploadAvatar />
		</div>
		<button @click.prevent="deleteUserData" class="btn btn-danger">
			Apagar Dados
		</button>
	</form>
</template>

<script lang="ts" setup>
const { fullName, age } = storeToRefs(useMyUserDetailsStore())
const location = ref()

const fields: any = ref({
	fullName: { id: 'fullName', content: fullName, isValidated: false },
	age: {
		id: 'age',
		content: age,
		isValidated: false,
	},


	location: {
		id: 'location',
		content: ref(location.value),
		isValidated: false,
	},
})

/**
 * Watches for changes in the `fields.value` object and performs validation on specific fields.
 * 
 * - Validates the `fullName` field using the `validateFullName` method from `useValidations`.
 * - Validates the `age` field using the `validateAge` method from `useValidations`.
 * - TODO: Add validation for the `location` field using the `validateLocation` method from `useValidations`.
 * 
 * @param {Object} fields.value - The object containing form fields to be validated.
 * @param {Object} fields.value.fullName - The fullName field object.
 * @param {Object} fields.value.fullName.isValidated - The validation status of the fullName field.
 * @param {Object} fields.value.age - The age field object.
 * @param {Object} fields.value.age.isValidated - The validation status of the age field.
 * @param {Object} fields.value.location - The location field object (currently not validated).
 * @param {Object} fields.value.location.isValidated - The validation status of the location field (currently not validated).
 * @param {Function} useValidations - A function that returns validation methods.
 * @param {Function} useValidations().validateFullName - Method to validate the fullName field.
 * @param {Function} useValidations().validateAge - Method to validate the age field.
 * @param {Function} useValidations().validateLocation - Method to validate the location field (currently not used).
 */
watch(fields.value, () => {
	fields.value.fullName.isValidated = useValidations().validateFullName(
		fullName.value,
	)
	fields.value.age.isValidated = useValidations().validateAge(age.value)
	// TODO: validate location
	// fields.value.location.isValidated = useValidations().validateLocation(location.value.location)
})

/**
 * Watches the 'location' property for changes and triggers validation.
 * When 'location' changes, it updates the 'isValidated' property of the 'location' field
 * by calling the 'validateLocation' method from 'useValidations'.
 */
watch(location, () => {
	fields.value.location.isValidated = useValidations().validateLocation()
})



/**
 * Asynchronously deletes user data after confirming with the user.
 * 
 * This function prompts the user with two confirmation dialogs to ensure they
 * want to delete their account and understand the action is irreversible.
 * If both confirmations are accepted, it deletes the user data and signs the user out,
 * redirecting them to the home page.
 * If the operation is canceled, a toast notification is shown to inform the user
 * that their data is saved.
 * 
 * @async
 * @function deleteUserData
 * @returns {Promise<void>} A promise that resolves when the user data is deleted or the operation is canceled.
 */
async function deleteUserData() {
	if (confirm('Você perderá todo seu progresso!\nDeseja mesmo apagar sua conta?')) {
		if (confirm('Este procedimento não poderá ser desfeito, Tem certeza?')) {
			await useMyUserDetailsStore().delete();
			useAuth().signOut({ callbackUrl: '/' });
		}
	}
	useViewController().showToast(
		'Operação cancelada',
		`Seus dados estão salvos!`,
		'warn',
	)
}
</script>

<style scoped>
.form-control {
	color: var(--text-color)
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
