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
					v-model="email"
					class="form-control"
					required
					:placeholder="user.email.placeHolder"
					data-bs-toggle="tooltip"
					data-bs-placement="right"
					data-bs-custom-class="custom-tooltip"
					data-bs-title="Digite um email válido."
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

		<div class="mt-3 row justify-content-center">
			<div class="col-auto">
				<NuxtLink to="/registrar">Não tem uma conta?</NuxtLink>
			</div>
			<div class="row justify-content-center">
				<div class="col-auto">
					<NuxtLink to="/entrar">Já tem uma conta?</NuxtLink>
				</div>
			</div>
		</div>
	</form>
</template>

<script lang="ts" setup>
	const { createToolTip } = useTooltip()

	const emailEl = ref()
	const toolTipEmail = ref()

	onMounted(() => {
		toolTipEmail.value = createToolTip(emailEl.value)
	})

	// user data
	const { email } = storeToRefs(useMyUserStore())

	const user: any = ref({
		email: {
			id: 'email',
			label: 'Email',
			isValidated: false,
			isShowInfo: false,
			info: 'Digite um email válido.',
			type: 'email',
			placeHolder: 'Digite seu email',
		},
	})

	// validations

	const validator = useValidations()

	watch(email, () => {
		user.value.email.isValidated = validator.validateEmail(email.value)
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
