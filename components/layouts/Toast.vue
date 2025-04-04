<template>
	<div>
		<div class="toast-container position-fixed bottom-0 end-0 p-3">
			<div ref="toast" id="liveToast" class="toast" role="alert" aria-live="assertive" aria-atomic="true">
				<div class="toast-header" :class="{
					'toast-error': props.type === 'error',
					'toast-success': props.type === 'success',
					'toast-warn': props.type === 'warn',
				}">
					<strong class="me-auto">
						<slot name="header"></slot>
					</strong>
					<button type="button" class="btn-close" data-bs-dismiss="toast" aria-label="Close"></button>
				</div>
				<div class="toast-body" :class="{
					'toast-error': props.type === 'error',
					'toast-success': props.type === 'success',
					'toast-warn': props.type === 'warn',
				}">
					<slot name="body" style="white-space: pre"></slot>
				</div>
			</div>
		</div>
	</div>
</template>

<script lang="ts" setup>
const props = defineProps({
	type: { type: String, required: false },
})
const bootstrap = () => import('bootstrap')

const toast = ref() as Ref<Element>

/**
 * Function to show a toast notification.
 * 
 * This function initializes the Bootstrap Toast component and displays a toast notification.
 * It first calls the `bootstrap` function, which returns a promise. Once the promise resolves,
 * it creates a new instance of the Bootstrap Toast component using the resolved response and
 * the `toast.value` element. Finally, it calls the `show` method on the Toast instance to display it.
 * 
 * @returns {void}
 */
function show() {
	bootstrap().then((response) => {
		const tt = new response.Toast(toast.value)
		tt.show()
	})
}

defineExpose({
	show,
})
</script>

<style>
.toast {
	background-color: transparent;
}

.toast-error {
	background-color: var(--bg-error) !important;
}

.toast-success {
	background-color: var(--bg-success) !important;
}

.toast-warn {
	background-color: var(--bg-warn) !important;
	color: rgba(0, 0, 0, 0.9);
}

.toast-warn>strong {
	color: rgba(0, 0, 0, 0.9) !important;
}
</style>
