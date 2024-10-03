<template>
	<div
		class="modal fade"
		:id="props.modal.id"
		data-bs-backdrop="static"
		data-bs-keyboard="false"
		tabindex="-1"
		aria-labelledby="staticBackdropLabel"
		aria-hidden="true"
	>
		<div class="modal-dialog modal-dialog-centered">
			<div class="modal-content">
				<div class="modal-header">
					<h1 class="modal-title fs-5" id="exampleModalLabel">
						{{ $props.modal.title }}
					</h1>
					<button
						type="button"
						class="btn-close"
						data-bs-dismiss="modal"
						aria-label="Close"
						hidden
					></button>
				</div>
				<div class="modal-body">
					<slot name="body"></slot>
				</div>
				<div class="modal-footer">
					<button
						type="button"
						@click="$emit('callFunction')"
						class="btn btn-primary"
					>
						Salvar
					</button>
				</div>
			</div>
		</div>
	</div>
</template>

<script lang="ts" setup>
	const props = defineProps({
		modal: {
			type: Object,
			required: true,
		},
	})
</script>

<style scoped>
	.modal-content {
		background-color: rgba(0, 0, 0, 0.722);
	}
</style>
