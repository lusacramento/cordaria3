<template>
	<div id="tutorial" class="tutorial">
		<div class="container-fluid">
			<LayoutsHeader>
				<template #center>
					<div class="d-flex justify-content-center align-items-center">
						<LayoutsBox :title-text="box.titleText" :schema="box.schema" />
					</div>
				</template>
			</LayoutsHeader>
			<div class="container layer-center">
				<aside class="row d-flex justify-content-center">
					<div class="col-lg-12 col-md-9 col-12">Corpo do tutorial</div>
				</aside>
			</div>
		</div>
	</div>
</template>

<script lang="ts" setup>
	const box = {
		titleText: '<h1>TUTORIAL<h1>',
		schema: 'index',
	}
</script>

<style scoped>
	.layer-center {
		height: 70vh;
	}
</style>
