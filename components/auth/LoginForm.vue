<template>
	<form>
		<div
			v-if="status.isShow"
			class="justify-content-center text-center alert d-flex align-items-center"
			role="alert"
			:class="{
				'alert-success': status.isSuccess,
				'alert-danger': status.isError,
			}"
		>
			<div class="messageError">
				{{ status.message }}
			</div>
		</div>
		<div v-for="field in user">
			<div class="mb-3 row align-items-center">
				<div class="col-2">
					<label :for="`register-${field.id}-label`" class="form-label">{{
						field.label
					}}</label>
				</div>
				<div v class="col-10">
					<input
						:type="field.type"
						:name="`register-${field.id}-input`"
						:id="`register-${field.id}-input`"
						v-model="field.content"
						class="form-control"
						required
						:placeholder="field.placeHolder"
						@focus="field.isShowInfo = true"
						@focusout="field.isShowInfo = false"
						:class="{
							'is-valid': field.isValidated,
							'is-invalid': !field.isValidated,
						}"
					/>
					<div v-if="field.isShowInfo">
						<small>{{ field.info }}</small>
					</div>
				</div>
			</div>
		</div>

		<div class="mt-3 row justify-content-center">
			<div class="col-auto">
				<NuxtLink to="/registrar">Não tem uma conta?</NuxtLink>
			</div>
		</div>
	</form>
</template>

<script lang="ts" setup>
	defineProps({
		status: {
			type: Object,
			required: true,
		},
	})

	// user data
	const { email, password } = storeToRefs(useMyUserStore())

	const user: any = ref({
		email: {
			id: 'email',
			label: 'Email',
			content: email,
			isValidated: false,
			isShowInfo: false,
			info: 'Digite um email válido.',
			type: 'email',
			placeHolder: 'Digite seu email',
		},
		password: {
			id: 'password',
			label: 'Senha',
			content: password,
			isValidated: false,
			isShowInfo: false,
			info: 'A senha deve conter pelo menos 9 caracteres!',
			type: 'password',
			placeHolder: 'Digite uma senha',
		},
	})

	// validations

	const validator = useValidations()

	watch(user.value, () => {
		user.value.email.isValidated = validator.validateEmail(
			user.value.email.content,
		)

		user.value.password.isValidated = validator.validatePassword(
			user.value.password.content,
		)
	})

	function verifyAllValidations() {
		if (user.value.email.isValidated && user.value.password.isValidated) {
			isLoading.value = false
			return true
		} else {
			isLoading.value = true
			return false
		}
	}

	const isLoading = ref(true)
</script>

<style>
	.alert {
		color: rgba(255, 255, 255, 1);
	}
	.alert-danger {
		background-color: red;
	}

	.alert-success {
		background-color: green;
	}
</style>
