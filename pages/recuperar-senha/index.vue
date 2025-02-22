<template>
	<div>
		<div id="the-pratice" class="cordaria">
			<div class="exercise-nav container-fluid">
				<LayoutsHeader :title="title">
					<template #center>
						<h1>{{ title }}</h1>
					</template>
				</LayoutsHeader>
				<LayoutsToast ref="toast" :type="toaster.type">
					<template #header>{{ toaster.header }} </template>
					<template #body>{{ toaster.body }}</template>
				</LayoutsToast>

				<div class="row justify-content-center bg-exercise-screen">
					<div class="col-lg-10 layer-center">
						<div class="d-flex align-items-center justify-content-center">
							<LayoutsModal ref="emailModal" :modal="modals.email" @callFunction="handleEmailFormSubmit()"
								:call-to-action-button-label="modals.email.buttonlabel">
								<template #body>
									<AuthEmailForm />
								</template>
							</LayoutsModal>
						</div>

						<div class="d-flex align-items-center justify-content-center">
							<LayoutsModal ref="passwordModal" :modal="modals.password"
								@callFunction="handlePasswordFormSubmit()"
								:call-to-action-button-label="modals.password.buttonlabel">
								<template #body>
									<AuthPasswordForm />
								</template>
							</LayoutsModal>
						</div>
					</div>
				</div>
			</div>
		</div>
		<EmailRescuePassword ref="emailRescuePassword" :url="recoveryUrl" :user-name="userName" hidden />
	</div>
</template>

<script lang="ts" setup>
import type { RescuePassword } from '~/types/RescuePassword'

const emailModal = ref()
const passwordModal = ref()
const emailRescuePassword = ref()

const recoveryUrl = ref('')
const userName = ref('')

const isShowEmailModal = ref(false)
const isShowPasswordModal = ref(false)

const isMounted = ref(false)
const isLoaded = ref(false)

definePageMeta({
	middleware: 'guest',
})

useHead({
	title: 'Recuperar Senha',
	meta: [{ name: 'robots', content: 'noindex, nofollow' }],
})

onBeforeMount(async () => {

	const query = await useRoute().query
	if (query.token) {
		const tokenResponse = (await useMyUserStore().getToken(
			query.token.toString(),
		)) as unknown as RescuePassword

		if (!tokenResponse) {
			showToast(
				'Token inexistente',
				'Por favor, informe novamente seu email.',
				'error',
			)
			isShowEmailModal.value = await true
			isLoaded.value = true
			return
		}

		if (await useHelpers().isExpiredToken(tokenResponse.expiresAt)) {
			showToast(
				'Token expirado',
				'Por favor, informe novamente seu email.',
				'error',
			)
			isShowEmailModal.value = await true
			isLoaded.value = true

			return
		}

		showToast('Token válido', 'Por favor, informe uma nova senha.', 'warn')

		isShowPasswordModal.value = await true
		isLoaded.value = true

		return
	}
	isShowEmailModal.value = await true
	isLoaded.value = true
})

onMounted(() => {
	isMounted.value = true
})

const { toast, toaster, showToast } = useViewController()
const title = ref('Recuperar Senha')

// modals
const modals = {
	email: {
		title: 'Entre com o email cadastrado',
		id: 'emailModal',
		buttonlabel: 'Recuperar',
	},
	password: {
		title: 'Insira a nova  senha',
		id: 'passwordModal',
		buttonlabel: 'Salvar',
	},
}



watch([isMounted, isLoaded], () => {
	if (isShowEmailModal.value) {
		emailModal.value.toggle()
		return
	}
	if (isShowPasswordModal.value) {
		passwordModal.value.toggle()
		return
	}
})

async function handleEmailFormSubmit() {
	await useMyUserStore().getUserByEmail()
	if (!useMyUserStore().getId) {
		showToast('Erro', 'Email não encontrado!', 'error')
		return
	}

	await loadToken()

	const status = await sendEmailWithRescueToken()

	status.value.ok ?
		showToast(
			status.value.message,
			'Por favor, acesse o link que foi enviado para sua caixa de email',
			'warn',
		) :
		showToast(
			'O email não pode ser enviado',
			status.value.message,
			'warn',
		)
}

async function handlePasswordFormSubmit() {
	await useMyUserStore().updateUser({
		password: useMyUserStore().getPassword,
	})

	useMyUserStore().clearPassword()

	await showToast(
		'Sucesso',
		'Senha alterada com sucesso. Faça o login!',
		'success',
	)

	useRouter().push('/entrar')
}

async function sendEmailWithRescueToken() {
	return emailRescuePassword.value.sendEmail()


}

async function loadToken() {
	const token = useHelpers().generateRandomHash()
	await useMyUserStore().updateUser({
		rescuePassword: { token: token, expiresAt: useHelpers().expiresAt() },
	})
}
</script>
