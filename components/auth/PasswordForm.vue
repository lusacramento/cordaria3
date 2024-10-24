<template>
	<form>
		<div class="mb-3 row align-items-center">
			<div class="col-3">
				<label :id="`register-${user.password.id}-label`" class="form-label">{{
					user.password.label
				}}</label>
			</div>
			<div class="col-9">
				<input
					ref="passwordEl"
					:type="user.password.type"
					:name="`register-${user.password.id}-input`"
					:id="`register-${user.password.id}-input`"
					v-model="password"
					class="form-control"
					required
					:placeholder="user.password.placeHolder"
					data-bs-toggle="tooltip"
					data-bs-placement="right"
					data-bs-custom-class="custom-tooltip"
					data-bs-title="Mínimo de 9 caracteres."
					:class="{
						'is-valid': user.password.isValidated,
						'is-invalid': !user.password.isValidated,
					}"
				/>
				<div v-if="user.password.isShowInfo">
					<small>{{ user.password.info }}</small>
				</div>
			</div>
		</div>
		<div class="mb-3 row align-items-center">
			<div class="col-3">
				<label
					:id="`register-${user.repeatPassword.id}-label`"
					class="form-label"
					>{{ user.repeatPassword.label }}</label
				>
			</div>
			<div class="col-9">
				<input
					ref="repeatPasswordEl"
					:type="user.repeatPassword.type"
					:name="`register-${user.repeatPassword.id}-input`"
					:id="`register-${user.repeatPassword.id}-input`"
					v-model="confirmPassword"
					class="form-control"
					required
					:placeholder="user.repeatPassword.placeHolder"
					data-bs-toggle="tooltip"
					data-bs-placement="right"
					data-bs-custom-class="custom-tooltip"
					data-bs-title="As duas senhas devem ser iguais."
					:class="{
						'is-valid': user.repeatPassword.isValidated,
						'is-invalid': !user.repeatPassword.isValidated,
					}"
				/>
				<div v-if="user.repeatPassword.isShowInfo">
					<small>{{ user.repeatPassword.info }}</small>
				</div>
			</div>
		</div>
	</form>
</template>

<script lang="ts" setup>
	const { createTooltip } = useTooltip()

	const passwordEl = ref()
	const repeatPasswordEl = ref()
	const passwordTooltip = ref()
	const repeatPasswordTooltip = ref()

	onMounted(() => {
		passwordTooltip.value = createTooltip(passwordEl.value)
		repeatPasswordTooltip.value = createTooltip(repeatPasswordEl.value)
	})

	// user data
	const { password, confirmPassword } = storeToRefs(useMyUserStore())

	const user: any = ref({
		password: {
			id: 'password',
			label: 'Senha',
			isValidated: false,
			isShowInfo: false,
			info: 'Digite uma nova senha.',
			type: 'password',
			placeHolder: 'Digite uma nova senha',
		},
		repeatPassword: {
			id: 'repeatPassword',
			label: 'Confirma senha',
			isValidated: false,
			isShowInfo: false,
			info: 'Repita a senha acima.',
			type: 'password',
			placeHolder: 'Repita a senha acima',
		},
	})

	// validations

	const validator = useValidations()

	watch(password, () => {
		user.value.password.isValidated = validator.validatePassword(password.value)
	})
	watch(confirmPassword, () => {
		user.value.repeatPassword.isValidated = validator.validatePassword(
			confirmPassword.value,
		)
	})
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
