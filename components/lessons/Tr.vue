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
			<input
				id="icon-lesson-input"
				type="text"
				class="form form-control"
				v-model="lesson.message.icon"
				rows="3"
			/>
		</td>
		<td>
			<input
				id="title-lesson-input"
				type="text"
				class="form form-control"
				v-model="lesson.message.title"
				rows="3"
			/>
		</td>
		<td>
			<textarea
				id="message-lesson-input"
				type="text"
				class="form form-control"
				v-model="lesson.message.description"
				rows="3"
			/>
		</td>
		<td>
			<input
				id="isAwarded-lesson-input"
				type="text"
				class="form form-control"
				v-model="lesson.message.isAwarded"
				rows="3"
			/>
		</td>
		<td>
			<input
				id="awardNumber-lesson-input"
				type="text"
				class="form form-control"
				v-model="lesson.message.awardNumber"
				rows="3"
			/>
		</td>
		<td>
			<input
				id="points-lesson-input"
				type="text"
				class="form form-control"
				v-model="lesson.points"
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
	#bpm-lesson-input,
	#points-lesson-input {
		width: 60px;
		color: black !important;
	}

	#level-lesson-input {
		width: 140px;
		color: black !important;
	}

	#message-lesson-input {
		color: black !important;
	}
</style>
