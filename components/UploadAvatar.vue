<template>
	<div class="container justify-content-center d-flex">
		<form action="" method="post">
			<ClientOnly>
				<picture-input
					ref="pictureInput"
					width="150"
					height="150"
					margin="16"
					accept="image/jpeg,image/png"
					size="10"
					button-class="btn btn-primary"
					:custom-strings="{
						upload: '<h4>ok!</h4>',
						drag: 'Arraste a imagem aqui ou clique para alterar',
					}"
					@change="onChange($event)"
				>
				</picture-input>
			</ClientOnly>
			<div v-if="inSubmit" class="d-flex justify-content-center">
				<button type="button" class="btn btn-primary" @click="handleSubmit">
					Upload
				</button>
			</div>

			{{ status }}
		</form>
	</div>
</template>

<script lang="ts" setup>
	import PictureInput from 'vue-picture-input'

	const status = ref('')
	const inSubmit = ref(false)

	const apiUrl = '/api/upload-image'
	const { _id } = storeToRefs(useMyUserStore())
	const { handleFileInput, files } = useFileStorage()
	const imageDir = '/imgs/uploads'

	let isFinishOnChange = ref(false)

	const imgSrc = ref(`${imageDir}/default-avatar.jpg`)

	async function onChange(e: any) {
		handleFileInput(e)
		isFinishOnChange.value = true
		inSubmit.value = true

		const elements = document.getElementsByClassName('picture-preview')
		const canvas = elements[0] as HTMLCanvasElement
	}

	async function handleSubmit() {
		const reader = new FileReader()
		const elements = document.getElementsByClassName('picture-preview')
		const canvas = elements[0] as HTMLCanvasElement
		const content = canvas.toDataURL()
		reader.onload = (e) => {}
		submitImage(content)
	}

	async function submitImage(content: any) {
		files.value[0].content = await content
		const file = files.value[0]

		useMyUserDetailsStore().setAvatar(file.content)

		// const response = await $fetch(apiUrl, {
		// 	method: 'POST',
		// 	body: {
		// 		file,
		// 		name: _id.value,
		// 	},
		// })
		// if (response) {
		// 	useMyUserDetailsStore().setImageUrl(response.name)
		// 	inSubmit.value = false
		// 	// status.value = response.message
		// 	setTimeout(() => {
		// 		status.value = ''
		// 	}, 1000)
		// }
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
