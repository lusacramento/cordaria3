<template>
	<div>
		<div ref="myModal" class="modal fade" :id="props.modal.id" data-bs-backdrop="static" data-bs-keyboard="false"
			tabindex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
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
						<button type="button" v-if="modal.isShowCanceledButton" @click.prevent="hide"
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
	</div>
</template>

<script lang="ts" setup>
import * as bootstrap from 'bootstrap'

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

const myModal = ref()

onMounted(() => {
	myModal.value = new bootstrap.Modal(myModal.value)
})

/**
 * Function to display the modal.
 * It calls the `show` method on the `myModal` object to make the modal visible.
 */
function show() {
	myModal.value.show()
}

/**
 * Hides the modal by calling the `hide` method on the `myModal` object.
 */
function hide() {
	myModal.value.hide()
}

defineExpose({ show, hide })
</script>

<style scoped>
.modal-content {
	background-color: var(--color-popup);
}

.modal {
	color: var(--text-color);
}
</style>
