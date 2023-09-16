<template>
	<!-- <div class="exercise-screen layer-center mt-2 mb-4"> -->
	<div class="container-fluid mt-3">
		<div v-if="isMobile">
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
		<div v-if="!isMobile">
			<div class="row justify-content-center align-items-center">
				<CordariaScreenCard
					v-for="(cardDeck, i) in deck"
					:id="cardDeck.id.toString()"
					:key="cardDeck + ' ' + i"
					:fragments="cardDeck.fragments"
					class="card cardView"
				/>
			</div>
		</div>
	</div>
	<!-- </div> -->
</template>

<script lang="ts" setup>
	defineProps({
		deck: Array,
		isMobile: Boolean,
		showExercise: Boolean,
	})

	const isMobile = false

	const deck = useDeck().getDeck()

	const card = {
		prev: deck[0],
		current: deck[1],
		next: deck[2],
	}
</script>

<style>
	@media (min-width: 992px) {
		.exercise-screen {
			height: 60vh;
		}
	}
</style>
