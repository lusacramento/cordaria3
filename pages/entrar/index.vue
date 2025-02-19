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
						<LayoutsModal :modal="modal" ref="loginModal" @callFunction="handleFormSubmit()"
							:call-to-action-button-label="modal.buttonLabel">
							<template #body>
								<AuthLoginForm />
							</template>
						</LayoutsModal>
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

useHead({
	title: 'A Prática',
	meta: [{ name: 'robots', content: 'noindex, nofollow' }],
})

const title = ref('ENTRAR')

// modal
const modal = {
	title: 'Entrar',
	id: 'loginModal',
	buttonLabel: 'Entrar',
}
const loginModal = ref()

const { toast, toaster, showToast } = useViewController()

onMounted(() => {
	loginModal.value.toggle()
	if (useMyUserStore().getIsNewRegistered) {
		showToast(
			'Sucesso!',
			'Cadastro registrado. Por favor, faça o login.',
			'success',
		)
		useMyUserStore().setIsNewRegistered(false)
	}
})


// handle ogin
const { signIn, data } = useAuth()

async function handleFormSubmit() {
	const newUser = {
		email: useMyUserStore().getEmail,
		password: useMyUserStore().getPassword,
	}

	loginModal.value.toggle()

	useMyUserStore().clearPassword()

	try {
		const response: any = await signIn('credentials', {
			...newUser,
			redirect: false,
		})

		if (response.error) {
			if (response.error === 'Unauthorized')
				showToast('Erro!', 'E-mail ou senha inválidos.', 'error')
			loginModal.value.toggle()

			return
		}

		const responseUser: any = { ...data.value?.user }

		loadUserOnstore(responseUser)

		useRouter().push({
			name: 'a-pratica',
		})
	} catch (e: any) { }
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
