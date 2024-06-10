<template>
	<div id="sign-up">
		<div
			class="text-white text-center font-bold p-4 rounded mb-4"
			v-if="reg_show_alert"
			:class="reg_alert_variant"
		>
			{{ reg_alert_msg }}
		</div>
		<VeeForm
			id="form-login"
			class="container"
			:validation-schema="schema"
			@submit="signUp"
		>
			<div class="mb-3">
				<div class="row d-flex align-items-center">
					<div class="col-4 d-flex justify-self-start">
						<label for="userName" class="form-label">Nome de Usuário</label>
					</div>
					<div class="col-8">
						<VeeField
							id="userName"
							type="text"
							class="form-control"
							name="userName"
							required
						/>
					</div>
				</div>
				<div class="row">
					<div class="col-auto">
						<VeeErrorMessage name="userName" class="text-danger" />
					</div>
				</div>
			</div>
			<div class="mb-3">
				<div class="row d-flex align-items-center">
					<div class="col-4 d-flex justify-self-start">
						<label for="email" class="form-label">Email</label>
					</div>
					<div class="col-8">
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
					<div class="col-4 d-flex justify-self-start">
						<label for="password" class="form-label">Senha</label>
					</div>
					<div class="col-8">
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
			<div class="mb-3">
				<div class="row d-flex align-items-center">
					<div class="col-4 d-flex justify-self-start">
						<label for="confirmPassword" class="form-label"
							>Confirma Senha</label
						>
					</div>
					<div class="col-8">
						<VeeField
							id="confirmPassword"
							type="password"
							class="form-control"
							name="confirmPassword"
							required
						/>
					</div>
					<VeeErrorMessage name="confirmPassword" class="text-danger" />
				</div>
			</div>
			<div class="mb-3 d-flex justify-content-center">
				<button
					type="submit"
					class="btn btn-primary mt-1 justify-self-center"
					:disabled="reg_in_submission"
				>
					Cadastrar
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
		userName: 'required|min:3|max:16|alpha-num',
		email: 'required|min:3|max:100|email',
		password: 'required|min:9|max:100',
		confirmPassword: 'passwords_mismatch:@password',
	}

	const reg_in_submission = ref(false)
	const reg_show_alert = ref(false)
	const reg_alert_variant = ref('bg-primary')
	const reg_alert_msg = ref('Aguarde! Sua conta está sendo criada.')

	function signUp(values: any) {
		releaseTrigger()
		resetDefaultValues()

		createUser()

		async function createUser() {
			try {
				const response = await useIUser().createUser(values)

				if (response.error.value) {
					showErrorMessage(response.error.value.data)
					reg_in_submission.value = false
				} else {
					showSuccessMessage()
					window.location.reload()
				}
			} catch (error) {
				showErrorMessage(error)
			}
		}

		function releaseTrigger() {
			reg_show_alert.value = true
			reg_in_submission.value = true
		}

		function resetDefaultValues() {
			reg_alert_variant.value = 'bg-primary'
			reg_alert_msg.value = 'Espere! Sua conta está sendo criada.'
		}

		function showSuccessMessage() {
			reg_alert_variant.value = 'bg-success'
			reg_alert_msg.value = 'Successo! Sua conta foi criada!'
		}

		function showErrorMessage(error: any) {
			reg_alert_variant.value = 'bg-danger'

			reg_alert_msg.value = error.message
		}
	}
</script>

<style scoped></style>
