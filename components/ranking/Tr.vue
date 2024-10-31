<template>
	<tr v-for="(rank, i) in props.ranking" :key="rank.position">
		<th scope="row">{{ rank.position }}</th>
		<td>@{{ rank.userName }}</td>
		<td>{{ rank.points }}</td>
		<td class="">
			<img v-if="rank.awards > 7" :src="award8" alt="award8" class="me-2" />
			<img v-if="rank.awards > 6" :src="award7" alt="award7" class="me-2" />
			<img v-if="rank.awards > 5" :src="award6" alt="award6" class="me-2" />
			<img v-if="rank.awards > 4" :src="award5" alt="award5" class="me-2" />
			<img v-if="rank.awards > 3" :src="award4" alt="award4" class="me-2" />
			<img v-if="rank.awards > 2" :src="award3" alt="award3" class="me-2" />
			<img v-if="rank.awards > 1" :src="award2" alt="award2" class="me-2" />
			<img v-if="rank.awards > 0" :src="award1" alt="award1" class="" />
		</td>
	</tr>
</template>

<script lang="ts" setup>
	import { type Ranking } from '~/types/Ranking'

	import award1 from '~/assets/imgs/awards/small/1.png'
	import award2 from '~/assets/imgs/awards/small/2.png'
	import award3 from '~/assets/imgs/awards/small/3.png'
	import award4 from '~/assets/imgs/awards/small/4.png'
	import award5 from '~/assets/imgs/awards/small/5.png'
	import award6 from '~/assets/imgs/awards/small/6.png'
	import award7 from '~/assets/imgs/awards/small/7.png'
	import award8 from '~/assets/imgs/awards/small/8.png'

	const props = defineProps({
		ranking: { type: Array<Ranking>, required: true },
	})
</script>

<style scoped>
	img {
		width: 20px;
	}
</style>
