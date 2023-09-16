<template>
	<div id="the-pratice" class="cordaria">
		<CordariaMenu />
		<div class="exercise-nav container-fluid">
			<div class="row text-center layer-top align-items-center">
				<div class="col-12 col-lg-4">
					<h1 class="title mt-3 mb-4">{{ title }}</h1>
					<!-- :visible="isEnabledMenu" -->
					<div class="col-12 col-lg-10">
						<div
							class="exercises-nav-layer d-flex flex-column align-items-center"
						></div>
					</div>
				</div>
			</div>
			<div class="row justify-content-center bg-exercise-screen">
				<div class="col-lg-10 layer-center">
					<div class="exercise-screen">
						<!-- <ExerciseScreen
            :card="card"
            :suffled-deck="suffledDeck"
            :is-mobile="settings.isMobile"
          /> -->
					</div>
				</div>
			</div>
		</div>
	</div>
</template>

<script lang="ts" setup>
	const title = 'A PRÁTICA'
	const toast = useTt('Aguardando início', '', 3000)
</script>

<style></style>
