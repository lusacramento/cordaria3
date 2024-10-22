<template>
	<div id="the-pratice" class="cordaria">
		<div class="exercise-nav container-fluid">
			<LayoutsHeader :title="title"></LayoutsHeader>
			<LayoutsToast ref="toast" :type="toaster.type">
				<template #header>{{ toaster.header }} </template>
				<template #body>{{ toaster.body }}</template>
			</LayoutsToast>

			<div class="row justify-content-center bg-exercise-screen">
				<div class="col-lg-10 layer-center">
					<div
						class="exercise-screen d-flex align-items-center justify-content-center"
					>
						<LayoutsModal :modal="modal" @callFunction="handleFormSubmit()">
							<template #body>
								<AuthLoginForm />
							</template>
						</LayoutsModal>
						<button
							ref="loginModalButton"
							type="button"
							class="btn btn-primary"
							data-bs-toggle="modal"
							:data-bs-target="`#${modal.id}`"
							hidden
						>
							Launch demo modal
						</button>
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

	// modal
	const modal = {
		title: 'Entrar',
		id: 'loginModal',
	}
	const loginModalButton: any = ref()

	const toast = ref()
	const toaster = ref({
		header: '',
		body: '',
		type: '',
	})

	onMounted(() => {
		loginModalButton.value.click()
		if (useMyUserStore().getIsNewRegistered) {
			toaster.value.header = 'Sucesso!'
			toaster.value.body = 'Cadastro registrado. Por favor, faça o login.'
			toaster.value.type = 'success'
			toast.value.show(toaster.value)
			useMyUserStore().setIsNewRegistered(false)
		}
	})

	onBeforeUnmount(() => {
		loginModalButton.value.click()
	})

	// handle ogin
	const { signIn, data } = useAuth()

	async function handleFormSubmit() {
		const newUser = {
			email: useMyUserStore().getEmail,
			password: useMyUserStore().getPassword,
		}

		try {
			const response: any = await signIn('credentials', {
				...newUser,
				redirect: false,
			})

			if (response.error) {
				if (response.error === 'Unauthorized') toaster.value.header = 'Erro!'
				toaster.value.body = 'E-mail ou senha inválidos.'
				toaster.value.type = 'error'
				toast.value.show(toaster.value)
				return
			}

			const responseUser: any = { ...data.value?.user }

			loadUserOnstore(responseUser)

			useRouter().push({
				name: 'a-pratica',
			})
		} catch (e: any) {}
	}

	const userStore = useMyUserStore()

	function loadUserOnstore(user: any) {
		userStore.setId(user._id)
		userStore.setUserName(user.userName)
		userStore.logIn()
	}
</script>
<style>
	.form-control {
		color: rgba(255, 255, 255, 10.5) !important;
	}
	.form-control:focus {
		color: rgba(0255, 255, 255, 0.9) !important;
	}

	.alert-danger {
		background-color: rgba(255, 0, 0, 0.61);
	}

	input {
		color: rgba(255, 255, 255, 0.9) !important;
	}

	.messageError {
		color: white;
	}
</style>
