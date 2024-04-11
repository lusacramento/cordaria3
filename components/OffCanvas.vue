<template>
	<div
		class="offcanvas offcanvas-start text-bg-dark"
		data-bs-scroll="true"
		tabindex="-1"
		id="offcanvasWithBothOptions"
		aria-labelledby="offcanvasWithBothOptionsLabel"
	>
		<div class="offcanvas-header">
			<h5 class="offcanvas-title" id="offcanvasWithBothOptionsLabel">
				Configurações
			</h5>
			<button
				type="button"
				class="btn-close"
				data-bs-dismiss="offcanvas"
				aria-label="Close"
			></button>
		</div>
		<div class="offcanvas-body">
			<SettingsForm class="" />
		</div>
	</div>
</template>

<script lang="ts" setup></script>

<style scoped>
	/* .btn-close {
		color: var(--font-color-p);
		background-color: white !important;
	}
	#btn-close:hover {
		background-color: rgba(255, 255, 255, 0.8);
		color: rgba(255, 255, 255, 0.7);
	} */
</style>
