<template>
	<form>
		<div class="mb-3 row align-items-center">
			<div class="col-2">
				<label :id="`register-${user.email.id}-label`" class="form-label">{{
					user.email.label
				}}</label>
			</div>
			<div class="col-9">
				<input
					ref="emailEl"
					:type="user.email.type"
					:name="`register-${user.email.id}-input`"
					:id="`register-${user.email.id}-input`"
					v-model="user.email.content"
					class="form-control"
					required
					:placeholder="user.email.placeHolder"
					data-bs-toggle="tooltip"
					data-bs-placement="right"
					data-bs-custom-class="custom-tooltip"
					data-bs-title="Digite um email válido."
					@focus="showToolTip(emailEl)"
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
		<div class="mb-3 row align-items-center d-flex">
			<div class="col-2">
				<label :id="`register-${user.password.id}-label`" class="form-label">{{
					user.password.label
				}}</label>
			</div>
			<div v class="col-9">
				<input
					ref="passwordEl"
					:type="user.password.type"
					:name="`register-${user.password.id}-input`"
					:id="`register-${user.password.id}-input`"
					v-model="user.password.content"
					class="form-control"
					required
					:placeholder="user.password.placeHolder"
					data-bs-toggle="tooltip"
					data-bs-placement="right"
					data-bs-custom-class="custom-tooltip"
					data-bs-title="Confirma senha deve ser igual a senha."
					@focus="showToolTip(passwordEl)"
					aria-label="Alterar visualização de senha"
					aria-describedby="login-password-viewer"
					:class="{
						'is-valid': user.password.isValidated,
						'is-invalid': !user.password.isValidated,
					}"
				/>
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

			<div v-if="user.password.isShowInfo">
				<small>{{ user.password.info }}</small>
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
	const bootstrap = () => import('bootstrap')

	defineProps({
		status: {
			type: Object,
			required: true,
		},
	})

	const emailEl = ref()
	const passwordEl = ref()

	function showToolTip(el: Element) {
		bootstrap().then((response) => {
			const tt = new response.Tooltip(el, { fallbackPlacements: ['right'] })
			tt.show()
		})
	}

	// user data
	const { email, password } = storeToRefs(useMyUserStore())

	const { currentType, currentIcon, toggleVisibility } = usePasswordInput()

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
			type: currentType,
			placeHolder: 'Digite uma senha',
			icon: currentIcon,
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

	function togglePasswordView() {
		toggleVisibility()
	}
</script>

<style scoped>
	.alert {
		color: rgba(255, 255, 255, 1);
	}
	.alert-danger {
		background-color: red;
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
