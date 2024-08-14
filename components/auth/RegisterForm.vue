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
		<div class="mb-3 row align-items-center">
			<div class="col-3">
				<label :id="`register-${user.email.id}-label`" class="form-label">{{
					user.email.label
				}}</label>
			</div>
			<div v class="col-8">
				<input
					:type="user.email.type"
					:name="`register-${user.email.id}-input`"
					:id="`register-${user.email.id}-input`"
					v-model="user.email.content"
					class="form-control"
					required
					:placeholder="user.email.placeHolder"
					@focus="user.email.isShowInfo = true"
					@focusout="user.email.isShowInfo = false"
					:class="{
						'is-valid': user.email.isValidated,
						'is-invalid': !user.email.isValidated,
					}"
				/>
				<div v-if="user.email.isShowInfo">
					<small>{{ user.email.info }}</small>
				</div>
			</div>
		</div>
		<div class="mb-3 row align-items-center">
			<div class="col-3">
				<label :id="`register-${user.name.id}-label`" class="form-label">{{
					user.name.label
				}}</label>
			</div>
			<div v class="col-8">
				<input
					:type="user.name.type"
					:name="`register-${user.name.id}-input`"
					:id="`register-${user.name.id}-input`"
					v-model="user.name.content"
					class="form-control"
					required
					:placeholder="user.name.placeHolder"
					@focus="user.name.isShowInfo = true"
					@focusout="user.name.isShowInfo = false"
					:class="{
						'is-valid': user.name.isValidated,
						'is-invalid': !user.name.isValidated,
					}"
				/>
				<div v-if="user.name.isShowInfo">
					<small>{{ user.name.info }}</small>
				</div>
			</div>
		</div>
		<div class="mb-3 row align-items-center">
			<div class="col-3">
				<label :id="`register-${user.password.id}-label`" class="form-label">{{
					user.password.label
				}}</label>
			</div>
			<div v class="col-8">
				<input
					:type="user.password.type"
					:password="`register-${user.password.id}-input`"
					:id="`register-${user.password.id}-input`"
					v-model="user.password.content"
					class="form-control"
					required
					:placeholder="user.password.placeHolder"
					@focus="user.password.isShowInfo = true"
					@focusout="user.password.isShowInfo = false"
					:class="{
						'is-valid': user.password.isValidated,
						'is-invalid': !user.password.isValidated,
					}"
				/>
				<div v-if="user.password.isShowInfo">
					<small>{{ user.password.info }}</small>
				</div>
			</div>
			<div class="col-1">
				<svg
					width="15"
					@click.prevent="togglePasswordView()"
					xmlns="http://www.w3.org/2000/svg"
					viewBox="0 0 576 512"
				>
					<!-- !Font Awesome Free 6.6.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2024 Fonticons, Inc. -->
					<path :d="user.password.icon" />
				</svg>
			</div>
		</div>
		<div class="mb-3 row align-items-center">
			<div class="col-3">
				<label
					:id="`register-${user.confirmPassword.id}-label`"
					class="form-label"
					>{{ user.confirmPassword.label }}</label
				>
			</div>
			<div v class="col-8">
				<input
					:type="user.confirmPassword.type"
					:confirmPassword="`register-${user.confirmPassword.id}-input`"
					:id="`register-${user.confirmPassword.id}-input`"
					v-model="user.confirmPassword.content"
					class="form-control"
					required
					:placeholder="user.confirmPassword.placeHolder"
					@focus="user.confirmPassword.isShowInfo = true"
					@focusout="user.confirmPassword.isShowInfo = false"
					:class="{
						'is-valid': user.confirmPassword.isValidated,
						'is-invalid': !user.confirmPassword.isValidated,
					}"
				/>
				<div v-if="user.confirmPassword.isShowInfo">
					<small>{{ user.confirmPassword.info }}</small>
				</div>
			</div>
			<div class="col-1">
				<svg
					width="15"
					@click.prevent="togglePasswordView()"
					xmlns="http://www.w3.org/2000/svg"
					viewBox="0 0 576 512"
				>
					<!-- !Font Awesome Free 6.6.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2024 Fonticons, Inc. -->
					<path :d="user.password.icon" />
				</svg>
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
	defineProps({
		status: {
			type: Object,
			required: true,
		},
	})

	const { currentType, currentIcon, toggleVisibility } = usePasswordInput()

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
			type: currentType,
			placeHolder: 'Digite uma senha',
			icon: currentIcon,
		},
		confirmPassword: {
			id: 'confirm-password',
			label: 'Confirmar Senha',
			content: '',
			isValidated: false,
			isShowInfo: false,
			info: 'As senhas devem ser iguais.',
			type: currentType,
			placeHolder: 'Repita a senha acima',
			icon: currentIcon,
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
	})

	watch(acceptTerms.value, (newValue) => {
		acceptTerms.value.isValidated = newValue.content
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

	function togglePasswordView() {
		toggleVisibility()
	}
</script>

<style scoped>
	.alert {
		color: rgba(255, 255, 255, 1);
	}
	.alert-danger {
		background-color: red !important;
	}

	.alert-success {
		background-color: green;
	}

	.form-control {
		background-color: transparent !important;
		color: rgba(255, 255, 255, 0.8) !important;
	}

	.form-control:focus {
		color: rgba(0, 0, 0, 1) !important;
		background-color: rgba(255, 255, 255, 1) !important;
	}

	svg {
		background-color: transparent;
		fill: white !important;
	}
</style>
