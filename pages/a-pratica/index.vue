<template>
	<div id="the-pratice" class="cordaria">
		<LayoutsOffCanvas @showStatistics="payload" />

		<div class="exercise-nav container-fluid">
			<LayoutsHeader :title="title">
				<template #left>
					<button
						class="btn btn-primary"
						type="button"
						data-bs-toggle="offcanvas"
						data-bs-target="#offcanvasWithBothOptions"
						aria-controls="offcanvasWithBothOptions"
					>
						Preferências
					</button>
				</template>
			</LayoutsHeader>

			<div class="row justify-content-center bg-exercise-screen">
				<div class="col-lg-10 layer-center">
					<div
						class="exercise-screen d-flex align-items-center justify-content-center"
					>
						<div v-if="showBox">
							<Box
								:title-text="boxes.callInAction.text"
								:schema="boxes.callInAction.schema"
								:left-logo="boxes.callInAction.leftLogo"
								:right-logo="boxes.callInAction.rightLogo"
								@click.prevent="start()"
							/>
						</div>
						<div v-if="showStatistics" class="d-block">
							<StatisticsTable />
						</div>
						<div v-if="showCards">
							<CordariaScreen />
						</div>
					</div>
				</div>
			</div>
		</div>
	</div>
</template>

<script lang="ts" setup>
	definePageMeta({
		middleware: 'user-only',
	})

	const controller = useController()
	const title = ref(controller.title)

	controller.init()

	const { showBox, showCards, showStatistics } = controller

	const boxes = {
		callInAction: {
			text: '<div style="font-size:1.5em">JOGAR</div>',
			schema: 'the-project',
			leftLogo: false,
			rightLogo: false,
		},
	}

	function start() {
		controller.payload()
	}

	function payload() {
		console.log('payload')
	}
</script>

<style scoped>
	#start-button:hover {
		cursor: pointer !important;
	}

	.btn {
		background-color: transparent;
		color: rgba(255, 255, 255, 0.7);
		border-color: transparent;
	}

	.btn:hover {
		color: rgba(255, 255, 255, 1);
		background-color: rgba(0, 0, 0, 0.1);
	}
</style>
