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

watch(fields.value, () => {
	fields.value.fullName.isValidated = useValidations().validateFullName(
		fullName.value,
	)
	fields.value.age.isValidated = useValidations().validateAge(age.value)
	// fields.value.location.isValidated = useValidations().validateLocation(location.value.location)
})

watch(location, () => {
	fields.value.location.isValidated = useValidations().validateLocation()
})



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
