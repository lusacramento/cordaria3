<template>
	<div id="the-pratice" class="cordaria">
		<LayoutsOffCanvas @showStatistics="payload" />

		<button
			class="btn btn-primary"
			type="button"
			data-bs-toggle="offcanvas"
			data-bs-target="#offcanvasWithBothOptions"
			aria-controls="offcanvasWithBothOptions"
		>
			Configurações
		</button>
		<div class="exercise-nav container-fluid">
			<div
				class="row text-center layer-top justify-content-center align-items-center"
			>
				<div class="col-12 col-lg-4">
					<h1 class="title mt-3 mb-4">{{ title }}</h1>
				</div>
			</div>
			<div class="row justify-content-center bg-exercise-screen">
				<div class="col-lg-10 layer-center">
					<div
						class="exercise-screen d-flex align-items-center justify-content-center"
					>
						<div v-if="!isStart">
							<Box
								:title-text="boxes.callInAction.text"
								:schema="boxes.callInAction.schema"
								:left-logo="boxes.callInAction.leftLogo"
								:right-logo="boxes.callInAction.rightLogo"
								@click.prevent="start()"
							/>
						</div>
						<div v-if="isStart">
							<CordariaScreen />
						</div>
					</div>
				</div>
			</div>
		</div>
	</div>
</template>

<script lang="ts" setup>
	import OffCanvas from '~/components/layouts/OffCanvas.vue'

	const title = 'A PRÁTICA'

	definePageMeta({
		middleware: 'auth',
	})

	const controller = useController()

	controller.init()

	const { isStart } = controller

	const boxes = {
		what: {
			text: '<h2>O que é?</h2>',
			schema: 'the-project',
			leftLogo: false,
			rightLogo: false,
		},
		doing: {
			text: '<h2>O que faz?</h2>',
			schema: 'the-project',
			leftLogo: false,
			rightLogo: false,
		},
		callInAction: {
			text: '<div style="font-size:1.5em">Inicie agora seu treinamento!</div>',
			schema: 'the-project',
			leftLogo: true,
			rightLogo: false,
		},
	}

	function start() {
		controller.payload()
	}
</script>

<style scoped>
	#start-button:hover {
		cursor: pointer !important;
	}
</style>
