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
				<div class="col-5">
					<label :for="`register-${field.id}-label`" class="form-label">{{
						field.label
					}}</label>
				</div>
				<div v class="col-7">
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
		<div class="mb-3 row">
			<div class="form-check justify-content-center d-flex">
				<input
					class="form-check-input mx-2"
					:type="acceptTerms.type"
					value=""
					:id="`login-${acceptTerms}-input`"
					v-model="acceptTerms.content"
				/>
				<label
					class="form-check-label"
					:class="{
						'text-danger': !acceptTerms.isValidated,
						'text-success': acceptTerms.isValidated,
					}"
					:for="`login-${acceptTerms.id}-input`"
				>
					Aceito os termos e
					<NuxtLink
						to="/"
						:class="{
							'alert-success': status.isSuccess,
							'alert-danger': status.isError,
						}"
					>
						condições de uso
					</NuxtLink>
				</label>
			</div>
		</div>

		<div class="mt-3 row justify-content-center">
			<div class="col-auto">
				<NuxtLink to="/entrar">Já tem uma conta?</NuxtLink>
			</div>
		</div>
	</form>
</template>

<script lang="ts" setup>
	onBeforeMount(() => {
		useMyUtilsStore().$reset
	})

	defineProps({
		status: {
			type: Object,
			required: true,
		},
	})

	// user data
	const { email, userName, password } = storeToRefs(useMyUserStore())
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
		name: {
			id: 'name',
			label: 'Nome de Usuário',
			content: userName,
			isValidated: false,
			isShowInfo: false,
			info: 'O nome deve conter, pelo menos 3 caracteres!',
			type: 'text',
			placeHolder: 'Digite um nome de usuário',
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
		confirmPassword: {
			id: 'confirm-password',
			label: 'Confirmar Senha',
			content: '',
			isValidated: false,
			isShowInfo: false,
			info: 'As senhas devem ser iguais.',
			type: 'password',
			placeHolder: 'Repita a senha acima',
		},
	})

	const acceptTerms = ref({
		id: 'accept-terms',
		label: 'Aceitar Termos',
		content: false,
		isValidated: false,
		isShowInfo: false,
		info: 'É obrigatório aceitar os termos.',
		type: 'checkbox',
		placeHolder: 'Aceite os termos do serviço.',
	})

	// validations
	const validator = useValidations()

	watch(user.value, () => {
		user.value.email.isValidated = validator.validateEmail(
			user.value.email.content,
		)
		user.value.name.isValidated = validator.validateUserName(
			user.value.name.content,
		)
		user.value.password.isValidated = validator.validatePassword(
			user.value.password.content,
		)
		user.value.confirmPassword.isValidated = validator.validateConfirmPassword(
			user.value.password.content,
			user.value.confirmPassword.content,
		)

		acceptTerms.value.content = acceptTerms.value.content

		useMyUtilsStore().setValidatedAllFields(verifyAllValidations())
	})

	watch(acceptTerms.value, (newValue) => {
		acceptTerms.value.isValidated = newValue.content
		useMyUtilsStore().setValidatedAllFields(verifyAllValidations())
	})

	function verifyAllValidations() {
		if (
			user.value.email.isValidated &&
			user.value.name.isValidated &&
			user.value.password.isValidated &&
			user.value.confirmPassword.isValidated &&
			acceptTerms.value.isValidated
		) {
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
		background-color: red !important;
	}

	.alert-success {
		background-color: green;
	}
</style>
