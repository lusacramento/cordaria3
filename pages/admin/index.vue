<template>
	<div id="lessons-manager" class="container mt-3">
		<div class="title text-center mb-5">
			<h1>Gerenciador</h1>
		</div>
		<div class="status">
			<transition name="fade">
				<div v-if="status.isShow" class="row alert alert-dark d-flex justify-content-center" role="alert"
					:transition="{
						name: 'bounce',
						mode: 'out-in',
					}">
					{{ status.message }}
				</div>
			</transition>
		</div>
		<div class="find-by-number mb-5">
			<div class="row d-flex text-center">
				<h2>Buscar Lição</h2>
				<form class="mt-5">
					<div class="row mb-3 align-items-center justify-content-center">
						<label for="lesson-number-admin-input" class="form-label col-2 col-form-label">Número da
							Lição</label>
						<div class="col-1">
							<input v-model="queryLesson.number" type="number" class="form-control"
								id="lesson-number-admin-input" min="1" max="190" />
						</div>
						<label for="strings-quantity-admin-input" class="form-label col-2 col-form-label">Quantidade de
							Cordas</label>
						<div class="col-1">
							<input v-model="queryLesson.quantityOfStrings" type="number" class="form-control"
								id="strings-quantity-admin-input" min="4" max="6" />
						</div>
						<div class="col-2">
							<button class="btn btn-primary" @click.prevent="getLesson">
								Buscar
							</button>
						</div>
					</div>
				</form>
			</div>
			<div id="lesson-view" class="row mt-5">
				<div class="col text-center">
					<h2 class="mb-3">Lição</h2>
					<div v-if="isLoaded.lesson">
						<LessonsTable :lessons="lesson" />
					</div>
				</div>
			</div>
		</div>
		<hr />
		<div class="findAll">
			<div class="row d-flex text-center">
				<h2>Lições Completas</h2>
			</div>

			<div class="row">
				<div class="col justify-content-center d-flex">
					<button class="btn btn-success mx-1" @click.prevent="addAllLessonsOnDataBase">
						Adicionar lições
					</button>
					<button class="btn btn-danger mx-1" @click.prevent="deleteAllLessonsOnDataBase">
						Apagar Lições
					</button>
				</div>

				<div id="db-view" class="row">
					<div class="col text-center">
						<div class="mx-1">
							<a href="#lessons-manager">Voltar ao Topo</a>
						</div>
						<button type="button" class="btn btn-primary" @click.prevent="getAllLessons">
							Pegar Todas Lições
						</button>
						<h2 class="mx-1 mt-5 mb-3">Todos os exercícios na Base de Dados</h2>
						<div v-if="isLoaded.allLessons">
							<LessonsTable :lessons="importedLessons.value" />
						</div>
					</div>
					<div class="mx-1 justify-content-center d-flex mb-5">
						<a href="#lessons-manager">Voltar ao Topo</a>
					</div>
				</div>
			</div>
		</div>
	</div>
</template>

<script lang="ts" setup>
import { useLessonsData } from '~/composables/lessons/lessonsData.js'

definePageMeta({
	middleware: 'admin',
	pageTransition: {
		name: 'rotate',
	},
})

useHead({
	title: 'Administração',
	meta: [{ name: 'robots', content: 'noindex, nofollow' }],
})

const isLoaded = ref({
	allLessons: false,
	lesson: false,
})

const importedLessons = ref()
const status = ref({
	isShow: false,
	message: '' as any,
})

const queryLesson = {
	number: '1',
	quantityOfStrings: '4',
}

watch(status.value, () => {
	setTimeout(() => {
		status.value.isShow = false
	}, 2000)
})

async function getAllLessons() {
	try {
		importedLessons.value = await useILesson().getAll()
		status.value.isShow = await true
		status.value.message = await 'Base de Dados carregada com sucesso!'
		isLoaded.value.allLessons = true
	} catch (error) {
		status.value.isShow = true
		status.value.message = error
	}
}

const lesson: Ref<any[]> = ref([])

async function getLesson() {
	try {
		const response = await useILesson().getLesson(queryLesson)
		if (response) {
			lesson.value.pop()
			lesson.value.push(response.lesson)
			isLoaded.value.lesson = true
		}
	} catch (error) { }
}

async function addAllLessonsOnDataBase() {
	try {
		const lessons = useLessonsData().getLessons()
		const response = await useILesson().postMany(lessons)

		if (response) {
			status.value.isShow = await true
			status.value.message = await response
		}
	} catch (error: any) {
		status.value.isShow = true
		status.value.message = error
	}
}

async function deleteAllLessonsOnDataBase() {
	const isOk = confirm('Deseja mesmo apagar todas as Lições?')
	if (isOk) {
		try {
			const response = await useILesson().deleteAll()

			status.value.isShow = true
			status.value.message = response
		} catch (error) {
			status.value.isShow = true
			status.value.message = error
		}
	}
}
</script>

<style scoped>
.list-group-item {
	background-color: transparent;
	border-color: rgba(255, 255, 255, 0.1);
	width: 160px;
	justify-content: center;
}

.alert-dark {
	background-color: transparent;
	color: white !important;
}

.fade-enter-active,
.fade-leave-active {
	transition: all 0.4s;
}

.fade-enter-from,
.fade-leave-to {
	opacity: 0;
	filter: blur(1rem);
}

.form-control {
	color: black !important;
}
</style>
