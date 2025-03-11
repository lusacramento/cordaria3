<template>
	<div class="container justify-content-center d-flex">
		<form>
			<ClientOnly>
				<picture-input ref="pictureInput" width="150" height="150" margin="16" accept="image/jpeg,image/png"
					size="10" button-class="btn btn-primary" :custom-strings="{
						upload: '<h4>ok!</h4>',
						drag: 'Arraste a imagem aqui ou clique para alterar',
						change: 'Alterar',
					}" @change="onChange">
				</picture-input>
			</ClientOnly>
			<div v-if="inSubmit" class="d-flex justify-content-center">
				<button type="button" class="btn btn-primary" @click="handleSubmit">
					Upload
				</button>
			</div>
		</form>
	</div>
</template>

<script lang="ts" setup>
import PictureInput from 'vue-picture-input'

const inSubmit = ref(false)

/**
 * Handles the change event for the upload avatar component.
 * Sets the `inSubmit` state to true to indicate that a submission is in progress.
 * 
 * @async
 */
async function onChange() {
	inSubmit.value = true
}

/**
 * Handles the submission of the avatar image.
 * 
 * This function performs the following steps:
 * 1. Creates a new FileReader instance.
 * 2. Retrieves the first element with the class name 'picture-preview' and casts it to an HTMLCanvasElement.
 * 3. Converts the content of the canvas to a data URL.
 * 4. Sets up an empty onload event handler for the FileReader.
 * 5. Submits the image content using the submitImage function.
 * 
 * @returns {Promise<void>} A promise that resolves when the submission is complete.
 */
async function handleSubmit() {
	const reader = new FileReader()
	const elements = document.getElementsByClassName('picture-preview')
	const canvas = elements[0] as HTMLCanvasElement
	const content = canvas.toDataURL()

	reader.onload = () => { }
	submitImage(content)
}

/**
 * Submits an image to set as the user's avatar.
 *
 * @param {any} content - The image content to be submitted.
 * @returns {Promise<void>} - A promise that resolves when the avatar is set.
 */
async function submitImage(content: any) {
	await useMyUserDetailsStore().setAvatar(content)
	inSubmit.value = false
}
</script>
<style>
picture-input,
input,
canvas {
	background-color: transparent !important;
}

canvas {
	border: solid 2px rgba(255, 255, 255, 0.5);
	border-radius: 50%;
}
</style>
