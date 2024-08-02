<template>
	<tr v-for="lesson in lessons" :key="lesson._id">
		<th scope="row">
			<input
				id="quantityOfStrings-lesson-input"
				type="text"
				class="form form-control"
				v-model="lesson.quantityOfStrings"
			/>
		</th>

		<td class="justify-content-center">
			<input
				id="number-lesson-input"
				type="text"
				class="form form-control"
				v-model="lesson.number"
			/>
		</td>
		<td>
			<input
				id="level-lesson-input"
				type="text"
				class="form form-control"
				v-model="lesson.level"
			/>
		</td>
		<td>
			<input
				id="first-finger-lesson-input"
				type="text"
				class="form form-control"
				v-model="lesson.firstFinger"
			/>
		</td>
		<td>
			<input
				id="string-number-lesson-input"
				type="text"
				class="form form-control"
				v-model="lesson.stringNumber"
			/>
		</td>
		<td>
			<input
				id="bpm-lesson-input"
				type="text"
				class="form form-control"
				v-model="lesson.bpm"
			/>
		</td>
		<td>
			<textarea
				id="message-lesson-input"
				type="text"
				class="form form-control"
				v-model="lesson.message"
				rows="3"
			/>
		</td>
		<td>
			<button
				type="button"
				class="btn btn-warning m-1"
				@click.prevent="alterLesson(lesson)"
			>
				Alterar
			</button>
			<button
				type="button"
				class="btn btn-danger m-1"
				@click.prevent="deleteLesson(lesson._id)"
			>
				Apagar
			</button>
		</td>
	</tr>
</template>

<script lang="ts" setup>
	defineProps({
		lessons: { type: Object },
	})

	function alterLesson(lesson: any) {
		console.log(lesson)
	}

	function deleteLesson(lesson: any) {
		console.log(lesson)
	}
</script>

<style>
	#quantityOfStrings-lesson-input,
	#number-lesson-input,
	#first-finger-lesson-input,
	#string-number-lesson-input,
	#bpm-lesson-input {
		width: 60px;
	}

	#level-lesson-input {
		width: 140px;
	}
</style>
