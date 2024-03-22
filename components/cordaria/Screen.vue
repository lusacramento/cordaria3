<template>
	<!-- <div class="exercise-screen layer-center mt-2 mb-4"> -->
	<div class="container-fluid mt-3">
		<CordariaScreenCounter />
		<Transition name="flip" mode="in-out">
			<div v-if="isStart">
				<div v-if="viewMode === '3Cards'">
					<div
						class="row mt-4 d-flex align-items-center justify-content-around"
					>
						<CordariaScreenCard
							id="prev-card"
							:key="card.prev.id"
							:card="card.prev"
						/>
						<CordariaScreenCard
							id="current-card"
							:key="card.current.id"
							:card="card.current"
						/>
						<CordariaScreenCard
							id="next-card"
							:key="card.next.id"
							:card="card.next"
						/>
					</div>
				</div>
				<div v-else>
					<div class="row justify-content-center align-items-center">
						<CordariaScreenCard
							v-for="card in deck"
							:id="card.id"
							:key="card.id"
							:card="card"
							class="card cardView"
						/>
					</div>
				</div>
			</div>
		</Transition>
		<CordariaScreenCounter />
	</div>
	<!-- </div> -->
</template>

<script lang="ts" setup>
	const viewMode = ref(useMyUserStore().getViewMode)
	const deck = ref(usePractice().deck)
	const isStart = ref(usePractice().isStart)
	const card = ref(usePractice().card)
</script>

<style>
	@media (min-width: 992px) {
		.exercise-screen {
			height: 60vh;
		}
	}

	.flip-enter-active {
		transition: all 0.3s;
		transform: rotateY(1deg);
	}

	.flip-leave-active {
		transition: all 0.3s;
	}

	.flip-enter-from,
	.flip-leave-to {
		transform: rotateY(90deg);
		opacity: 0;
	}
</style>
