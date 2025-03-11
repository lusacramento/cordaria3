<template>
	<img class="img-lesson" :src="figure" alt="Imagem da Lição" />
</template>

<script lang="ts" setup>
const lesson = storeToRefs(useMyProgressStore()).lesson

const figure = ref(`~/assets/imgs/lessons/6-strings/10.svg`)

/**
 * Watches for changes in the `lesson` object and updates the `figure` value with the corresponding lesson image URL.
 *
 * @param {Object} lesson - The lesson object being watched.
 * @param {Function} async (newLesson) - Asynchronous function that triggers when the `lesson` object changes.
 * @param {Object} newLesson - The new lesson object after the change.
 * @returns {void}
 *
 * The function `getLessonImage` fetches the lesson image based on the `newLesson` properties:
 * - `quantityOfStrings`: Number of strings in the lesson.
 * - `stringNumber`: The string number.
 * - `firstFinger`: The first finger position.
 *
 * If the fetch response is successful, the image URL is returned and assigned to `figure.value`.
 */
watch(lesson, async (newLesson) => {
	const getLessonImage = () =>
		fetch(
			`/imgs/lessons/${newLesson.quantityOfStrings}-strings/${newLesson.stringNumber}${newLesson.firstFinger}.svg`,
		).then((resp: any) => {
			if (!resp.ok) return

			return resp.url
		})

	figure.value = await getLessonImage()
})
</script>

<style>
.img-lesson {
	width: 50dvw !important;
}
</style>
