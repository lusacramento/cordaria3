<template>
	<form>
		<div class="mb-3 row align-items-center">
			<div class="col-3">
				<label :id="`register-${user.email.id}-label`" class="form-label">{{
					user.email.label
				}}</label>
			</div>
			<div v class="col-8">
				<input ref="emailEl" :type="user.email.type" :name="`register-${user.email.id}-input`"
					:id="`register-${user.email.id}-input`" v-model="user.email.content" class="form-control" required
					:placeholder="user.email.placeHolder" data-bs-toggle="tooltip" data-bs-placement="right"
					data-bs-custom-class="custom-tooltip" :data-bs-title="user.email.info" :class="{
						'is-valid': user.email.isValidated,
						'is-invalid': !user.email.isValidated,
					}" />
			</div>
		</div>
		<div class="mb-3 row align-items-center">
			<div class="col-3">
				<label :id="`register-${user.name.id}-label`" class="form-label">{{
					user.name.label
				}}</label>
			</div>
			<div v class="col-8">
				<input ref="userNameEl" :type="user.name.type" :name="`register-${user.name.id}-input`"
					:id="`register-${user.name.id}-input`" v-model="user.name.content" class="form-control" required
					:placeholder="user.name.placeHolder" data-bs-toggle="tooltip" data-bs-placement="right"
					data-bs-custom-class="custom-tooltip" :data-bs-title="user.name.info" :class="{
						'is-valid': user.name.isValidated,
						'is-invalid': !user.name.isValidated,
					}" />
			</div>
		</div>
		<div class="mb-3 row align-items-center">
			<div class="col-3">
				<label :id="`register-${user.password.id}-label`" class="form-label">{{
					user.password.label
				}}</label>
			</div>
			<div v class="col-8">
				<input ref="passwordEl" :type="user.password.type" :password="`register-${user.password.id}-input`"
					:id="`register-${user.password.id}-input`" v-model="user.password.content" class="form-control"
					required :placeholder="user.password.placeHolder" data-bs-toggle="tooltip" data-bs-placement="right"
					data-bs-custom-class="custom-tooltip" :data-bs-title="user.password.info" :class="{
						'is-valid': user.password.isValidated,
						'is-invalid': !user.password.isValidated,
					}" />
			</div>
			<div class="col-1">
				<svg width="15" @click.prevent="togglePasswordView()" xmlns="http://www.w3.org/2000/svg"
					viewBox="0 0 576 512">
					<!-- !Font Awesome Free 6.6.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2024 Fonticons, Inc. -->
					<path :d="user.password.icon" />
				</svg>
			</div>
		</div>
		<div class="mb-3 row align-items-center">
			<div class="col-3">
				<label :id="`register-${user.confirmPassword.id}-label`" class="form-label">{{
					user.confirmPassword.label }}</label>
			</div>
			<div v class="col-8">
				<input ref="confirmPasswordEl" :type="user.confirmPassword.type"
					:confirmPassword="`register-${user.confirmPassword.id}-input`"
					:id="`register-${user.confirmPassword.id}-input`" v-model="user.confirmPassword.content"
					class="form-control" required :placeholder="user.confirmPassword.placeHolder"
					data-bs-toggle="tooltip" data-bs-placement="right" data-bs-custom-class="custom-tooltip"
					:data-bs-title="user.confirmPassword.info" :class="{
						'is-valid': user.confirmPassword.isValidated,
						'is-invalid': !user.confirmPassword.isValidated,
					}" />
			</div>
			<div class="col-1">
				<svg width="15" @click.prevent="togglePasswordView()" xmlns="http://www.w3.org/2000/svg"
					viewBox="0 0 576 512">
					<!-- !Font Awesome Free 6.6.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2024 Fonticons, Inc. -->
					<path :d="user.password.icon" />
				</svg>
			</div>
		</div>
		<div class="mb-3 row">
			<div class="form-check justify-content-center d-flex">
				<input ref="acceptTermsEl" class="form-check-input mx-2" :type="user.acceptTerms.type" value=""
					:id="`login-${user.acceptTerms}-input`" v-model="user.acceptTerms.content" data-bs-toggle="tooltip"
					data-bs-placement="left" data-bs-custom-class="custom-tooltip"
					:data-bs-title="user.acceptTerms.info" />
				<label class="form-check-label" :class="{
					'text-danger': !user.acceptTerms.isValidated,
					'text-success': user.acceptTerms.isValidated,
				}" :for="`login-${user.acceptTerms.id}-input`">
					Aceito os termos e
					<NuxtLink to="/termos-e-condicoes" target="_blank" :class="{
						'alert-success': user.acceptTerms.isValidated,
						'alert-danger': !user.acceptTerms.isValidated,
					}">
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
interface User {
	email: {
		id: string;
		label: string;
		content: string;
		isValidated: boolean;
		isShowInfo: boolean;
		info: string;
		type: string;
		placeHolder: string;
	};
	name: {
		id: string;
		label: string;
		content: string;
		isValidated: boolean;
		isShowInfo: boolean;
		info: string;
		type: string;
		placeHolder: string;
	};
	password: {
		id: string;
		label: string;
		content: string;
		isValidated: boolean;
		isShowInfo: boolean;
		info: string;
		type: string;
		placeHolder: string;
		icon: string;
	};
	confirmPassword: {
		id: string;
		label: string;
		content: string;
		isValidated: boolean;
		isShowInfo: boolean;
		info: string;
		type: string;
		placeHolder: string;
		icon: string;
	};
	acceptTerms: {
		id: string;
		label: string;
		content: boolean;
		isValidated: boolean;
		isShowInfo: boolean;
		info: string;
		type: string;
		placeHolder: string;
	};
}

const { createTooltip } = useTooltip()

const emailEl = ref()
const emailTooltip = ref()
const userNameEl = ref()
const userNameTooltip = ref()
const passwordEl = ref()
const passwordTooltip = ref()
const confirmPasswordEl = ref()
const confirmPasswordTooltip = ref()
const acceptTermsEl = ref()
const acceptTermsTooltip = ref()

onMounted(() => {
	emailTooltip.value = createTooltip(emailEl.value)
	passwordTooltip.value = createTooltip(passwordEl.value)
	userNameTooltip.value = createTooltip(userNameEl.value)
	confirmPasswordTooltip.value = createTooltip(confirmPasswordEl.value)
	acceptTermsTooltip.value = createTooltip(acceptTermsEl.value)
})

const { currentType, currentIcon, toggleVisibility } = usePasswordInput()

// user data
const { email, userName, password, confirmPassword, acceptTerms } =
	storeToRefs(useMyUserStore())

const user: Ref<User> = ref({
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
		info: 'Mínimo 3 e máximo de 25 caracteres. Somente letras.',
		type: 'text',
		placeHolder: 'Digite um nome de usuário',
	},
	password: {
		id: 'password',
		label: 'Senha',
		content: password,
		isValidated: false,
		isShowInfo: false,
		info: 'A senha deve conter pelo menos 9 caracteres.',
		type: currentType.value,
		placeHolder: 'Digite uma senha',
		icon: currentIcon.value,
	},
	confirmPassword: {
		id: 'confirm-password',
		label: 'Confirmar Senha',
		content: confirmPassword,
		isValidated: false,
		isShowInfo: false,
		info: 'As senhas devem ser iguais.',
		type: currentType.value,
		placeHolder: 'Repita a senha acima',
		icon: currentIcon.value,
	},
	acceptTerms: {
		id: 'accept-terms',
		label: 'Aceitar Termos',
		content: acceptTerms,
		isValidated: false,
		isShowInfo: false,
		info: 'É obrigatório aceitar os termos.',
		type: 'checkbox',
		placeHolder: 'Aceite os termos do serviço.',
	},
})

// validations
const validator = useValidations()

/**
 * Watches for changes in the `user.value` object and validates its properties.
 * 
 * Validates the following fields:
 * - `email`: Uses `validator.validateEmail` to check the validity of the email content.
 * - `name`: Uses `validator.validateUserName` to check the validity of the name content.
 * - `password`: Uses `validator.validatePassword` to check the validity of the password content.
 * - `confirmPassword`: Uses `validator.validateConfirmPassword` to check the validity of the confirm password content against the password content.
 * - `acceptTerms`: Sets `isValidated` to true if `acceptTerms.content` is true.
 */
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

	if (user.value.acceptTerms.content) {
		user.value.acceptTerms.isValidated = true
	}
})

/**
 * Toggles the visibility of the password field in the registration form.
 * Calls the `toggleVisibility` function to switch between showing and hiding the password.
 */
function togglePasswordView() {
	toggleVisibility()
}
</script>

<style scoped>
.alert {
	color: var(--bg-warn);
}

.alert-danger,
.is-invalid {
	background-color: var(--bg-error) !important;
}

.alert-success,
.is-valid {
	background-color: var(--bg-success) !important;
}

.form-control {
	background-color: transparent !important;
	color: var(--text-color) !important;
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
