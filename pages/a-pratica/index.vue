<template>
	<div id="the-pratice" class="cordaria">
		<CordariaMenu />
		<div class="exercise-nav container-fluid">
			<div
				class="row text-center layer-top justify-content-center align-items-center"
			>
				<div class="col-12 col-lg-4">
					<h1 class="title mt-3 mb-4">{{ title }}</h1>
					<!-- :visible="isEnabledMenu" -->
				</div>
			</div>
			<div class="row justify-content-center bg-exercise-screen">
				<div class="col-lg-10 layer-center">
					<!-- <div class="exercise-screen"> -->
					<CordariaScreen />
					<!-- </div> -->
				</div>
			</div>
		</div>
	</div>
</template>

<script lang="ts" setup>
	const title = 'A PRÁTICA'
	const toast = useTt('wait', 'Aguardando início', '', 3000)
</script>

<style></style>
