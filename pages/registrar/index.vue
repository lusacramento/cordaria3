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
					<div class="exercise-screen d-flex align-items-center justify-content-center">
						<LayoutsModal ref="registerModal" :modal="modal" @callFunction="handleFormSubmit()"
							:call-to-action-button-label="modal.buttonLabel">
							<template #body>
								<AuthRegisterForm />
							</template>
						</LayoutsModal>
					</div>
				</div>
			</div>
		</div>
		<EmailWelcome ref="emailWelcome" hidden />
	</div>
</template>

<script lang="ts" setup>
definePageMeta({
	middleware: 'guest',
})

useHead({
	title: 'A Prática',
	meta: [{ name: 'robots', content: 'noindex, nofollow' }],
})

const emailWelcome = ref()

const userStore = useMyUserStore()

const { toast, toaster, showToast } = useViewController()

const title = ref('REGISTRAR')

// modal
const modal = {
	title: 'Cadastrar',
	id: 'registerModal',
	buttonLabel: 'Registrar',
}
const registerModal = ref()

onMounted(() => {
	registerModal.value.show()
})

onBeforeUnmount(() => {
	registerModal.value.hide()
})

// handle register
async function handleFormSubmit() {
	if (!userStore.isAllFields()) return

	try {
		await userStore.register()
		await emailWelcome.value.sendEmail()
		useRouter().push({
			name: 'entrar',
		})
	} catch (e: any) {
		showToast('Erro', e.data.message, 'error')
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
