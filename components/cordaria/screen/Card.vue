<template>
	<div :id="props.card.id" :key="props.card.id" class="m-2 card align-items-center justify-content-center" :class="{
		pastCardColor: props.card.status === 'prev',
		currentCardColor: props.card.status === 'current',
		futureCardColor: props.card.status === 'next',
	}">
		<CordariaScreenCardFragment v-for="fragment in props.card.fragments" :id="fragment.id" :key="fragment.id"
			:fragment="fragment" />
		<div class="text-center" :class="{ string: !props.allCard, stringAllCard: props.allCard }">
			{{ props.card.str }}
		</div>
	</div>
</template>

<script lang="ts" setup>
const props = defineProps({
	card: { type: Object, required: true },
	allCard: { type: Boolean, required: false, default: false },
})
</script>

<style>
div.card {
	flex-direction: row;
	width: 160px;
	height: 160px;
}

.pastCardColor,
.currentCardColor,
.futureCardColor {
	font-family: 'Encode Sans';
}

/* color mobile view */
.pastCardColor {
	font-weight: var(--font-bold);
	color: rgba(27, 20, 4, 0.5);
	background-color: #b4423f;
}

.currentCardColor {
	font-weight: var(--font-black);
	background-color: #ffd740;
	color: rgb(27, 20, 4);
}

.futureCardColor {
	font-weight: var(--font-bold);
	background-color: #39c2a1;
	color: rgba(27, 20, 4, 0.9);
}

@media (max-width: 575.98px) {
	div.card {
		width: 75px;
		height: 75px;
		font-size: 0.7em;
		flex-direction: row;
	}

	#prev-card,
	#current-card,
	#next-card {
		width: 180px;
		height: 180px;
		font-size: 2.5em;
	}

	.string {
		position: absolute;
		bottom: 20px;
		border: solid black 1px;
		border-radius: 50%;
		font-size: 0.7rem;
		width: 18px;
	}

	.stringAllCard {
		position: absolute;
		bottom: 10px;
		border: solid black 1px;
		border-radius: 50%;
		font-size: 0.5rem;
		width: 15px;
	}
}

@media (min-width: 576px) and (max-width: 991.98px) {
	div.card {
		width: 80px;
		height: 80px;
		font-size: 0.8em;
	}

	#prev-card,
	#current-card,
	#next-card {
		width: 160px;
		height: 160px;
		font-size: 2.3em;
	}

	.string {
		position: absolute;
		bottom: 20px;
		border: solid black 1px;
		border-radius: 50%;
		font-size: 0.7rem;
		width: 20px;
	}

	.stringAllCard {
		position: absolute;
		bottom: 10px;
		border: solid black 1px;
		border-radius: 50%;
		font-size: 0.7rem;
		width: 20px;
	}
}

@media (min-width: 992px) {
	div.card {
		width: 100px;
		height: 100px;
		font-size: 1.1em;
	}

	#prev-card,
	#current-card,
	#next-card {
		width: 250px;
		height: 250px;
		font-size: 3.3em;
	}

	.string {
		position: absolute;
		bottom: 30px;
		border: solid black 1px;
		border-radius: 50%;
		font-size: 1rem;
		width: 25px;
	}

	.stringAllCard {
		position: absolute;
		bottom: 10px;
		border: solid black 1px;
		border-radius: 50%;
		font-size: 0.7rem;
		width: 18px;
	}
}
</style>
