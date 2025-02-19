<template>
	<div>
		<div class="modal fade" :id="props.modal.id" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1"
			aria-labelledby="staticBackdropLabel" aria-hidden="true">
			<div class="modal-dialog modal-dialog-centered">
				<div class="modal-content">
					<div class="modal-header">
						<h1 class="modal-title fs-5" id="exampleModalLabel">
							{{ $props.modal.title }}
						</h1>
						<button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"
							hidden></button>
					</div>
					<div class="modal-body">
						<slot name="body"></slot>
					</div>
					<div class="modal-footer">
						<button type="button" v-if="modal.isShowCanceledButton" @click.prevent="toggle"
							class="btn btn-primary">
							Cancelar
						</button>
						<button type="button" @click="$emit('callFunction')" class="btn btn-primary">
							{{ props.callToActionButtonLabel }}
						</button>
					</div>
				</div>
			</div>
		</div>
		<button ref="modalButton" type="button" class="btn btn-primary" data-bs-toggle="modal"
			:data-bs-target="`#${modal.id}`" hidden>
			Password Modal
		</button>
	</div>
</template>

<script lang="ts" setup>
const props = defineProps({
	modal: {
		type: Object,
		required: true,
	},
	callToActionButtonLabel: {
		type: String,
		default: 'Salvar',
	},
})

const modalButton = ref()

function toggle() {
	modalButton.value.click()
}

defineExpose({ toggle })
</script>

<style scoped>
.modal-content {
	/* background-color: rgba(0, 0, 0, 0.722); */
	background-color: var(--color-popup);
}

.modal {
	color: var(--text-color);
}
</style>
