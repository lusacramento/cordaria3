<template>
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

		<button type="submit" class="btn btn-primary">Entrar</button>
	</VeeForm>
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

	function signIn(values: any) {
		console.log(values)
	}
</script>

<style></style>
