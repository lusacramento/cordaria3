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
								<AuthRegisterForm />
							</template>
						</LayoutsModal>
						<button
							ref="registerModalButton"
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

	const userStore = useMyUserStore()

	const toast = ref()
	const toaster = ref({
		header: '',
		body: '',
		type: '',
	})

	const title = ref('REGISTRAR')

	// modal
	const modal = {
		title: 'Cadastrar',
		id: 'registerModal',
	}
	const registerModalButton: any = ref()

	onMounted(() => {
		registerModalButton.value.click()
	})

	onBeforeUnmount(() => {
		registerModalButton.value.click()
	})

	// handle register
	async function handleFormSubmit() {
		if (!userStore.isAllFields()) return

		const user = {
			username: userStore.getUserName,
			email: userStore.getEmail,
			password: userStore.getPassword,
			confirmPassword: userStore.getConfirmPassword,
			acceptTerms: userStore.getAcceptTerms,
		}
		useMyUserStore().clearPassword()
		try {
			await useIUser().createUser(user)
			userStore.setIsNewRegistered(true)

			useRouter().push({
				name: 'entrar',
			})
		} catch (e: any) {
			toaster.value.header = 'Erro'
			toaster.value.body = e.data.message
			toaster.value.type = 'error'
			toast.value?.show()
			return
		}
	}
</script>

<style scoped>
	.form-control {
		color: rgba(255, 255, 255, 1) !important;
	}
	.form-control:focus {
		color: rgba(255, 255, 255, 0.9) !important;
	}

	.messageError {
		color: white;
	}
</style>
