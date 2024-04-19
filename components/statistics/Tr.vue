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
				Play
			</button>
		</td>
	</tr>
</template>

<script lang="ts" setup>
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
