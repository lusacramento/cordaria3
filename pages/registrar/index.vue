<template>
	<div id="the-pratice" class="cordaria">
		<div class="exercise-nav container-fluid">
			<LayoutsHeader :title="title"> </LayoutsHeader>

			<div class="row justify-content-center bg-exercise-screen">
				<div class="col-lg-10 layer-center">
					<div
						class="exercise-screen d-flex align-items-center justify-content-center"
					>
						<form @submit.prevent="handleFormSubmit">
							<div
								v-if="isShowMessageError"
								class="justify-content-center text-center alert alert-danger d-flex align-items-center"
								role="alert"
							>
								<div class="messageError">
									{{ messageError }}
								</div>
							</div>
							<div v-for="field in user">
								<div class="mb-3 row">
									<div class="col-5">
										<label
											:for="`register-${field.id}-label`"
											class="form-label"
											>{{ field.label }}</label
										>
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
							<div class="mb-3 row text-end">
								<div class="form-check">
									<input
										class="form-check-input"
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
										Aceito os termos e condições de uso.
									</label>
								</div>
							</div>
							<div class="mb3 row justify-content-center">
								<div class="col-auto">
									<button
										type="submit"
										:disabled="isLoading"
										class="btn btn-primary"
									>
										CADASTRAR
									</button>
								</div>
							</div>
							<div class="mt-3 row justify-content-center">
								<div class="col-auto">
									<NuxtLink to="/entrar">Já tem uma conta?</NuxtLink>
								</div>
							</div>
						</form>
					</div>
				</div>
			</div>
		</div>
	</div>
</template>

<script lang="ts" setup>
	definePageMeta({
		middleware: 'guest',
	})

	const title = ref('REGISTRAR')

	// user data
	const user: any = ref({
		email: {
			id: 'email',
			label: 'Email',
			content: '',
			isValidated: false,
			isShowInfo: false,
			info: 'Digite um email válido.',
			type: 'email',
			placeHolder: 'Digite seu email',
		},
		name: {
			id: 'name',
			label: 'Nome de Usuário',
			content: '',
			isValidated: false,
			isShowInfo: false,
			info: 'O nome deve conter, pelo menos 3 caracteres!',
			type: 'text',
			placeHolder: 'Digite um nome de usuário',
		},
		password: {
			id: 'password',
			label: 'Senha',
			content: '',
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

	// Validations
	const validator = useValidations()

	const allValidated = ref(false)

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

		allValidated.value = isAllValidations()
	})

	watch(acceptTerms.value, (newValue) => {
		acceptTerms.value.isValidated = newValue.content
		allValidated.value = isAllValidations()
	})

	function isAllValidations() {
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

	// handle register

	const isLoading = ref(true)
	const isShowMessageError = ref(false)
	const messageError = ref('Algo deu errado. Contate o suporte.')

	async function handleFormSubmit() {
		try {
			isLoading.value = true

			const preUser = await {
				username: user.value.name.content,
				email: user.value.email.content,
				password: user.value.password.content,
			}
			const response = await useIUser().createUser(preUser)

			if (response.error.value) {
				const message: String = response.error.value?.data.message
				if (message.substring(0, 6) === 'E11000') {
					messageError.value = 'Nome de usuário ou email já cadastrado.'
				}
				isShowMessageError.value = true
				return
			}

			await useRouter().push({
				name: 'entrar',
			})
		} catch (e: any) {
			console.log('error: ', e)
			isShowMessageError.value = true
		} finally {
			isLoading.value = false
		}
	}
</script>

<style scoped>
	.form-control {
		color: rgba(255, 255, 255, 1) !important;
	}
	.form-control:focus {
		color: rgba(0, 0, 0, 0.9) !important;
	}
	.alert-danger {
		background-color: rgba(255, 0, 0, 0.61);
	}

	.messageError {
		color: white;
	}
</style>
