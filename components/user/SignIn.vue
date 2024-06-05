<template>
	<div id="sign-in">
		<div
			class="text-white text-center font-bold p-4 mb-4"
			v-if="login_show_alert"
			:class="login_alert_variant"
		>
			{{ login_alert_msg }}
		</div>
		<VeeForm
			id="form-login"
			class="container"
			:validation-schema="schema"
			@submit="signIn"
		>
			<div class="mb-3">
				<div class="row d-flex align-items-center">
					<div class="col-auto">
						<label for="email" class="form-label">Email</label>
					</div>
					<div class="col">
						<VeeField
							id="email"
							type="email"
							class="form-control"
							name="email"
							required
						/>
					</div>
				</div>
				<div class="row">
					<div class="col-auto">
						<VeeErrorMessage name="email" class="text-danger" />
					</div>
				</div>
			</div>
			<div class="mb-3">
				<div class="row d-flex align-items-center">
					<div class="col-auto">
						<label for="password" class="form-label">Senha</label>
					</div>
					<div class="col">
						<VeeField
							id="password"
							type="password"
							class="form-control"
							name="password"
							required
						/>
					</div>
					<VeeErrorMessage name="password" class="text-danger" />
				</div>
			</div>

			<div class="mb-3 d-flex justify-content-center mt-1">
				<button
					type="submit"
					class="btn btn-primary"
					:disabled="login_in_submission"
				>
					Entrar
				</button>
			</div>
		</VeeForm>
	</div>
</template>

<script lang="ts" setup>
	import {
		Form as VeeForm,
		Field as VeeField,
		ErrorMessage as VeeErrorMessage,
	} from 'vee-validate'

	const schema = {
		email: 'required|min:3|max:100|email',
		password: 'required|min:9|max:100',
	}

	const login_in_submission = ref(false)
	const login_show_alert = ref(false)
	const login_alert_variant = ref('bg-blue-500')
	const login_alert_msg = ref('Espere! Estamos conectando você.')

	function signIn(values: any) {
		console.log(values)

		login_show_alert.value = true
		login_in_submission.value = true

		login_alert_variant.value = 'bg-primary'
		login_alert_msg.value = 'Espere! Estamos conectando você.'

		let response: any = ''
		// response = await useMyUserStore().authenticate(values)
		if (response.code !== 'auth/invalid-credential') {
			showSuccessMessage()

			window.location.reload()
		} else showErrorMessage()
	}

	function showSuccessMessage() {
		login_alert_variant.value = 'bg-success'
		login_alert_msg.value = 'Successo! Você agora está conectado!'
	}

	function showErrorMessage() {
		login_in_submission.value = false
		login_alert_variant.value = 'bg-error'
		login_alert_msg.value = 'Login inválido!'
	}
</script>

<style></style>
