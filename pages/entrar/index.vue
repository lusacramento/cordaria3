<template>
	<div id="the-pratice" class="cordaria">
		<div class="exercise-nav container-fluid">
			<LayoutsHeader :title="title"> </LayoutsHeader>

			<div class="row justify-content-center bg-exercise-screen">
				<div class="col-lg-10 layer-center">
					<div
						class="exercise-screen d-flex align-items-center justify-content-center"
					>
						<form @submit.prevent="handleLogin" class="">
							<div
								v-if="isShowMessageError"
								class="justify-content-center text-center alert alert-danger d-flex align-items-center"
								role="alert"
							>
								<div class="messageError">
									{{ messageError }}<br />
									<NuxtLink to="/recuperar-senha">Esqueceu a senha?</NuxtLink>
								</div>
							</div>
							<div v-for="field in user">
								<div class="mb-3 row">
									<div class="col-3">
										<label
											:for="`register-${field.id}-label`"
											class="form-label"
											>{{ field.label }}</label
										>
									</div>
									<div v class="col-9">
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

							<div class="mb-3 row justify-content-center">
								<div class="col-3">
									<button
										type="submit"
										:disabled="isLoading"
										class="btn btn-primary"
									>
										ENTRAR
									</button>
								</div>
							</div>
							<div class="mt-3 row justify-content-center">
								<div class="col-auto">
									<NuxtLink to="/registrar">Não tem uma conta?</NuxtLink>
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

	const title = ref('ENTRAR')

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
	})

	// Validations

	const isLoading = ref(true)
	const validator = useValidations()
	const allValidated = ref(false)

	watch(user.value, () => {
		user.value.email.isValidated = validator.validateEmail(
			user.value.email.content,
		)

		user.value.password.isValidated = validator.validatePassword(
			user.value.password.content,
		)
		allValidated.value = isAllValidations()
	})

	function isAllValidations() {
		if (user.value.email.isValidated && user.value.password.isValidated) {
			isLoading.value = false
			return true
		} else {
			isLoading.value = true
			return false
		}
	}

	// handle

	const messageError = ref('')
	const isShowMessageError = ref(false)

	const { signIn, data } = useAuth()

	async function handleLogin() {
		const newUser = {
			email: user.value.email.content,
			password: user.value.password.content,
		}

		try {
			const response: any = await signIn('credentials', {
				...newUser,
				redirect: false,
			})

			if (response.error) {
				if (response.error === 'Unauthorized') isShowMessageError.value = true
				messageError.value = 'Usuário ou senha inválida!'
				return
			}
			const responseUser: any = { ...data.value?.user }

			loadUserOnstore(responseUser)

			useRouter().push({
				name: 'a-pratica',
			})
		} catch (e: any) {
			messageError.value = e
		} finally {
			isLoading.value = false
		}
	}

	const userStore = useMyUserStore()

	function loadUserOnstore(user: any) {
		userStore.setId(user._id)
		userStore.setUserName(user.username)
		userStore.logIn()
	}
</script>
<style scoped>
	.form-control {
		color: rgba(255, 255, 255, 10.5) !important;
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
