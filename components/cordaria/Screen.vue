<template>
	<!-- <div class="exercise-screen layer-center mt-2 mb-4"> -->
	<div class="container-fluid mt-3">
		<CordariaScreenCounter />
		<div v-if="isStart">
			<div v-if="viewMode === '3Cards'">
				<div class="row mt-4 d-flex align-items-center justify-content-around">
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
		<CordariaScreenCounter />
	</div>
	<!-- </div> -->
</template>

<script lang="ts" setup>
	const viewMode = ref(useState().viewMode)
	const deck = ref(useState().deck)
	const isStart = ref(useState().isStart)
	const card = ref(useState().card)
</script>

<style>
	@media (min-width: 992px) {
		.exercise-screen {
			height: 60vh;
		}
	}
</style>
