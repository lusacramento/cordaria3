<template>
	<img class="img-lesson" :src="figure" alt="Imagem da Lição" />
</template>

<script lang="ts" setup>
const lesson = storeToRefs(useMyProgressStore()).lesson

const figure = ref(`~/assets/imgs/lessons/6-strings/10.svg`)

watch(lesson, async (newLesson) => {
	const getLessonImage = () =>
		fetch(
			`/imgs/lessons/${newLesson.quantityOfStrings}-strings/${newLesson.stringNumber}${newLesson.firstFinger}.svg`,
		).then((resp: any) => {
			console.log(resp.url)
			if (!resp.ok) return

			return resp.url
		})

	figure.value = await getLessonImage()
	console.log('figure: ', figure.value)
})
</script>

<style>
.img-lesson {
	width: 50dvw !important;
}
</style>
