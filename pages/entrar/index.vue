<template>
	<div id="the-pratice" class="cordaria">
		<div class="exercise-nav container-fluid">
			<LayoutsHeader :title="title"></LayoutsHeader>

			<div class="row justify-content-center bg-exercise-screen">
				<div class="col-lg-10 layer-center">
					<div
						class="exercise-screen d-flex align-items-center justify-content-center"
					>
						<LayoutsModal :modal="modal" @callFunction="handleFormSubmit()">
							<template #body>
								<AuthLoginForm :status="status" />
							</template>
						</LayoutsModal>
						<button
							ref="userDetailsButton"
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
	const userDetailsButton: any = ref()

	onMounted(() => {
		userDetailsButton.value.click()
	})

	onBeforeUnmount(() => {
		userDetailsButton.value.click()
	})

	// status
	const status = ref({
		isShow: false,
		message: 'test',
		isError: false,
		isSuccess: false,
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
				if (response.error === 'Unauthorized')
					setStatus('error', 'Usuário ou senha inválida!')
				return
			}

			setStatus('success', 'Cadastro finalizado com sucesso!')

			const responseUser: any = { ...data.value?.user }

			loadUserOnstore(responseUser)

			useRouter().push({
				name: 'a-pratica',
			})
		} catch (e: any) {
			setStatus('error', e)
		}
	}

	function setStatus(type: string, message: string) {
		switch (type) {
			case 'error':
				status.value.isSuccess = false
				status.value.isError = true
				status.value.message = message
				break
			case 'success':
				status.value.isError = false
				status.value.isSuccess = true
				status.value.message = message

			default:
				break
		}
		status.value.isShow = true
	}

	const userStore = useMyUserStore()

	function loadUserOnstore(user: any) {
		userStore.setId(user._id)
		userStore.setUserName(user.username)
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
