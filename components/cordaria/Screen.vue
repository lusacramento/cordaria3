<template>
	<!-- <div class="exercise-screen layer-center mt-2 mb-4"> -->
	<div class="container-fluid mt-3">
		<div v-if="isStart">
			<div v-if="viewMode == '3Cards'">
				<div class="row mt-4 d-flex align-items-center justify-content-around">
					<CordariaScreenCard
						id="prev-card"
						key="999"
						:fragments="card.prev.fragments"
					/>
					<CordariaScreenCard
						id="current-card"
						key="998"
						:fragments="card.current.fragments"
					/>
					<CordariaScreenCard
						id="next-card"
						key="997"
						:fragments="card.next.fragments"
					/>
				</div>
			</div>
			<div v-else>
				<div class="row justify-content-center align-items-center">
					<CordariaScreenCard
						v-for="cardDeck in deck"
						:id="cardDeck.id.toString()"
						:key="cardDeck.value"
						:fragments="cardDeck.fragments"
						class="card cardView"
					/>
				</div>
			</div>
		</div>
	</div>
	<div>
		<button @click="mouvimentCards()">AVANCAR</button>
		{{ deck[23].value }}
	</div>
	<!-- </div> -->
</template>

<script lang="ts" setup>
	const isStart = ref(useExecise().isStart)
	const viewMode = ref(useExecise().viewMode)
	const card = ref(useExecise().card)
	const deck = ref(useExecise().deck)

	const mouvimentCards = () => useExecise().animateCards()
</script>

<style>
	@media (min-width: 992px) {
		.exercise-screen {
			height: 60vh;
		}
	}
</style>
