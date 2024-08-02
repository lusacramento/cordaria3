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
								<AuthRegisterForm :status="status" />
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

	const title = ref('REGISTRAR')

	// modal
	const modal = {
		title: 'Cadastrar',
		id: 'registerModal',
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

	// handle register
	async function handleFormSubmit() {
		const user = {
			username: useMyUserStore().getUserName,
			email: useMyUserStore().getEmail,
			password: useMyUserStore().getPassword,
		}
		useMyUserStore().clearPassword()
		try {
			const response = await useIUser().createUser(user)
			if (response.error.value) {
				const messageRes: String = response.error.value?.data.message
				if (messageRes.substring(0, 6) === 'E11000') {
					setStatus('error', 'Nome do usuário ou Email já cadastrado.')
				}
				return
			}
			await useRouter().push({
				name: 'entrar',
			})
		} catch (e: any) {
			setStatus('error', e)

			return
		}

		setStatus('success', 'Usuário cadastrado com sucesso!')
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
