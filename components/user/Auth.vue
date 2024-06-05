<template>
	<div
		class="modal fade"
		id="authModal"
		tabindex="-1"
		aria-labelledby="authModalLabel"
		aria-hidden="true"
	>
		<div class="modal-dialog modal-dialog-centered">
			<div class="modal-content d-flex">
				<div class="d-flex justify-content-between p-3">
					<Box
						:title-text="boxes.signIn.text"
						:schema="boxes.signIn.schema"
						:left-logo="boxes.signIn.leftLogo"
						:right-logo="boxes.signIn.rightLogo"
						@click.prevent="loadSignInForm"
						class="h2 m-1"
					/>
					<Box
						:title-text="boxes.signUp.text"
						:schema="boxes.signUp.schema"
						:left-logo="boxes.signUp.leftLogo"
						:right-logo="boxes.signUp.rightLogo"
						@click.prevent="loadSignUpForm"
						class="h2 m-1"
					/>
					<button
						type="button"
						class="btn-close"
						data-bs-dismiss="modal"
						aria-label="Close"
					></button>
				</div>
				<div class="modal-body">
					<div v-if="isSignIn">
						<UserSignIn />
					</div>
					<div v-else>
						<UserSignUp />
					</div>
				</div>
				<div class="modal-footer">
					<button
						type="button"
						class="btn btn-secondary"
						data-bs-dismiss="modal"
					>
						Fechar
					</button>
					<!-- <button type="button" class="btn btn-primary">Registrar</button> -->
				</div>
			</div>
		</div>
	</div>
</template>

<script lang="ts" setup>
	import { defineRule, configure } from 'vee-validate'
	import {
		required,
		min,
		max,
		alpha_spaces as alphaSpaces,
		alpha_num as alphaNum,
		email,
		confirmed,
	} from '@vee-validate/rules'

	defineRule('required', required)
	defineRule('tos', required)
	defineRule('min', min)
	defineRule('max', max)
	defineRule('alpha-spaces', alphaSpaces)
	defineRule('alpha-num', alphaNum)
	defineRule('email', email)
	defineRule('passwords_mismatch', confirmed)

	configure({
		generateMessage: (ctx) => {
			const messages = {
				required: `O campo  ${ctx.field} é obrigatório.`,
				min: `O campo ${ctx.field} é muito pequeno.`,
				max: `O campo é  ${ctx.field} muito grande.`,
				alpha_spaces: `O campo ${ctx.field} só pode conter caracteres alfabéticos e espaços.`,
				alpha_num: `O campo ${ctx.field} só pode conter caracteres alfabéticos e números.`,
				email: `O campo ${ctx.field} tem que ser um email válido.`,
				excluded: `You are not allowed to use this value for the field ${ctx.field}.`,
				passwords_mismatch: `Os campos de senhas não estão iguais.`,
				// tos: `You must accept the Terms of Service.`
			}

			const message = messages[ctx.rule?.name as keyof typeof messages]
				? messages[ctx.rule?.name as keyof typeof messages]
				: `O campo ${ctx.field} é inválido.`

			return message
		},

		validateOnBlur: true,
		validateOnChange: true,
		validateOnInput: false,
		validateOnModelUpdate: true,
	})

	const tab = ref('login')

	const boxes = {
		signUp: {
			text: 'Cadastrar',
			schema: 'the-pratice',
			leftLogo: false,
			rightLogo: false,
		},
		signIn: {
			text: 'Entrar',
			schema: 'the-pratice',
			leftLogo: false,
			rightLogo: false,
		},
	}

	const isSignIn = ref(true)

	function loadSignInForm() {
		isSignIn.value = true
	}

	function loadSignUpForm() {
		isSignIn.value = false
	}
</script>

<style>
	.form-control,
	.btn-primary {
		background-color: transparent;
		font-family: 'encode sans';
	}

	.modal-content {
		background-color: rgba(255, 255, 255, 0.1);
	}

	.btn-close {
		background-color: transparent !important;
	}

	.btn-close:hover {
		background-color: rgba(255, 255, 255, 1) !important;
		color: black !important;
	}
</style>
