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
		<div class="offcanvas-body align-items-center d-flex">
			<LayoutsSettingsForm />
		</div>
	</div>
</template>
<style scoped>
	.offcanvas {
		background-color: rgba(0, 0, 0, 0.2) !important;
	}
</style>
