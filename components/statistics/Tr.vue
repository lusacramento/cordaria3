<template>
	<tr v-for="lesson in lessons" :key="lesson.id">
		<th scope="row">{{ lesson.id }}</th>
		<td>{{ lesson.firstFinger }}</td>
		<td>{{ useHelpers().translate(lesson.stringNumber) }}</td>
		<td>{{ lesson.bpm }}</td>
		<td>
			<button
				type="button"
				class="btn btn-success"
				@click.prevent="start(lesson.id)"
			>
				<font-awesome-icon class="fa fa-code" :icon="iconPlay" />
			</button>
		</td>
	</tr>
</template>

<script lang="ts" setup>
	import { library } from '@fortawesome/fontawesome-svg-core'
	import { faPlay } from '@fortawesome/free-solid-svg-icons'
	import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
	library.add(faPlay)

	const iconPlay = 'play'

	defineProps({
		lessons: {
			type: Array<Lesson>,
			required: true,
		},
	})

	function start(id: number) {
		useController().payload(id)
	}
</script>

<style></style>
