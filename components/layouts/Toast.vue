<template>
	<div>
		<div class="toast-container position-fixed bottom-0 end-0 p-3">
			<div
				ref="toast"
				id="liveToast"
				class="toast"
				role="alert"
				aria-live="assertive"
				aria-atomic="true"
			>
				<div class="toast-header">
					<!-- <img src="..." class="rounded me-2" alt="..." /> -->
					<strong class="me-auto"><slot name="header"></slot></strong>
					<small>5 mins ago</small>
					<button
						type="button"
						class="btn-close"
						data-bs-dismiss="toast"
						aria-label="Close"
					></button>
				</div>
				<div class="toast-body"><slot name="body"></slot></div>
			</div>
		</div>
	</div>
</template>

<script lang="ts" setup>
	import { Toast } from 'bootstrap'
	const toast = ref() as Ref<Element>

	function show() {
		const newToast = new Toast(toast.value)
		newToast.show()
	}

	defineExpose({
		show,
	})
</script>

<style>
	.toast,
	.toast-header,
	.toast-body {
		background-color: transparent;
	}
</style>
