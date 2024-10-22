<template>
	<div>
		<div id="the-pratice" class="cordaria">
			<div class="exercise-nav container-fluid">
				<LayoutsHeader :title="title">
					<template #center
						><h1>{{ title }}</h1></template
					>
				</LayoutsHeader>
				<LayoutsToast ref="toast" :type="toaster.type">
					<template #header>{{ toaster.header }} </template>
					<template #body>{{ toaster.body }}</template>
				</LayoutsToast>

				<div class="row justify-content-center bg-exercise-screen">
					<div class="col-lg-10 layer-center">
						<div
							class="exercise-screen d-flex align-items-center justify-content-center"
						>
							<LayoutsModal
								:modal="modal"
								@callFunction="handleFormSubmit()"
								call-to-action-button-label="Recuperar"
							>
								<template #body>
									<AuthEmailForm />
								</template>
							</LayoutsModal>
							<button
								ref="rescuePasswordModalButton"
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
	</div>
</template>

<script lang="ts" setup>
	definePageMeta({
		middleware: 'guest',
	})

	onMounted(() => {
		rescuePasswordModalButton.value.click()
	})

	const title = ref('Recuperar Senha')

	// modal
	const modal = {
		title: 'Recuperar Senha',
		id: 'rescuePasswordModal',
	}
	const rescuePasswordModalButton: any = ref()

	const toast = ref()
	const toaster = ref({
		header: '',
		body: '',
		type: '',
	})

	async function handleFormSubmit() {
		await useMyUserStore().getUserByEmail()
		if (!useMyUserStore().getId) {
			toaster.value = {
				header: 'Erro',
				body: 'Usuário não encontrado!',
				type: 'error',
			}
			toast.value.show()
			return
		}

		const hash = useHelpers().generateRandomHash()

		console.log(hash)

		toaster.value = {
			header: 'Acesse seu email',
			body: 'Por favor, acesse o link que foi enviado para sua caixa de email',
			type: 'warn',
		}
		toast.value.show()
	}
</script>

<style></style>
