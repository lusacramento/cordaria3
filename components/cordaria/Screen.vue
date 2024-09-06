<template>
	<!-- <div class="exercise-screen layer-center mt-2 mb-4"> -->
	<div class="container-fluid mt-3">
		<CordariaScreenCounter />
		<!-- <Transition name="flip" mode="in-out"> -->
		<div v-if="showCards">
			<div v-if="viewMode === ViewMode.CARDS3">
				<div class="row mt-4 d-flex align-items-center justify-content-around">
					<CordariaScreenCard id="prev-card" :key="prev.id" :card="prev" />
					<CordariaScreenCard
						id="current-card"
						:key="current.id"
						:card="current"
					/>
					<CordariaScreenCard id="next-card" :key="next.id" :card="next" />
				</div>
			</div>

			<div v-else-if="viewMode === ViewMode.CARDS2">
				<div class="row mt-4 d-flex align-items-center justify-content-around">
					<CordariaScreenCard
						id="current-card"
						:key="current.id"
						:card="current"
					/>
					<CordariaScreenCard id="next-card" :key="next.id" :card="next" />
				</div>
			</div>
			<div v-else>
				<div class="row justify-content-center align-items-center">
					<CordariaScreenCard
						v-for="card in deck"
						:id="card.id"
						:key="card.id"
						:card="card"
						:allCard="true"
						class="card cardView"
					/>
				</div>
			</div>
		</div>
		<!-- </Transition> -->
		<CordariaScreenCounter />
	</div>
	<!-- </div> -->
</template>

<script lang="ts" setup>
	import { ViewMode } from '~/types/ViewMode'

	const { viewMode } = storeToRefs(useMySettingsStore())

	const { deck, showCards, cards } = useGameController()
	const { prev, current, next } = cards
</script>

<style scoped>
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

	#prev-card {
		font-family: 'Encode Sans';
		font-weight: var(--font-bold);
		color: rgba(27, 20, 4, 0.5);
		background-color: #b4423f;
	}
	#current-card {
		font-family: 'Encode Sans';
		font-weight: var(--font-black);
		background-color: #ffd740;
		color: rgb(27, 20, 4);
		border: solid 10px rgba(57, 57, 67, 1);
		box-sizing: content-box;
	}

	#next-card {
		font-family: 'Encode Sans';
		font-weight: var(--font-bold);
		background-color: #39c2a1;
		color: rgba(27, 20, 4, 0.9);
	}
</style>
