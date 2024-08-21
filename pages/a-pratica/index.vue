<template>
	<div id="the-pratice" class="cordaria">
		<LayoutsOffCanvas @showStatistics="payload" />
		<LayoutsToast ref="toast" :type="toaster.type">
			<template #header>{{ toaster.header }}</template>
			<template #body><div v-html="toaster.body" /></template>
		</LayoutsToast>

		<div class="container-fluid">
			<LayoutsHeader>
				<template #left>
					<div
						class="container d-flex justify-content-start align-items-center"
					>
						<div
							class="avatar d-flex justify-content-center align-items-center"
						>
							<img :src="avatar" class="img-fluid" alt="avatar do usuário" />
						</div>
						<div class="mx-2">@{{ userStore.getUserName }}</div>
					</div>
				</template>
				<template #center>
					<div class="d-flex justify-content-between">
						<div>Lição: {{ lesson?.number }}</div>
						<div>BPM {{ lesson?.bpm }}</div>
						<div>PC {{ lesson?.firstFinger }}</div>
						<div>{{ lesson?.level }}</div>
						<div>PC: {{ firstString }}</div>
					</div>
				</template>
				<template #right>
					<div class="d-flex align-items-center justify-content-end">
						<div class="mx-3">
							<nuxt-link
								to=""
								class="nav-link the-pratice-link"
								@click.prevent="exit"
								><span>Sair</span></nuxt-link
							>
							<button
								ref="userDetailsButton"
								type="button"
								class="btn btn-primary"
								data-bs-toggle="modal"
								:data-bs-target="`#${modal.id}`"
								hidden
							>
								Launch demo modal
							</button>
						</div>
						<div class="mx-3">Pontos: 908</div>
						<button
							class="btn btn-primary"
							type="button"
							data-bs-toggle="offcanvas"
							data-bs-target="#offcanvasWithBothOptions"
							aria-controls="offcanvasWithBothOptions"
						>
							Preferências
						</button>
					</div>
				</template>
			</LayoutsHeader>
			<LayoutsModal :modal="modal" @callFunction="postUserDetails">
				<template #body><UserDetailsForm /></template>
			</LayoutsModal>

			<div class="row exercise justify-content-center bg-exercise-screen">
				<div class="col-lg-10">
					<div class="play-button d-flex justify-content-center">
						<div v-if="showBox">
							<button class="btn btn-play" :disabled="!isLoaded">
								<Box
									:title-text="boxes.callInAction.text"
									:schema="boxes.callInAction.schema"
									:left-logo="boxes.callInAction.leftLogo"
									:right-logo="boxes.callInAction.rightLogo"
									@click.prevent="start()"
								/>
							</button>
						</div>
						<div v-if="showStatistics" class="d-block">
							<StatisticsTable />
						</div>
						<div v-if="showCards">
							<CordariaScreen />
						</div>
						<br />
					</div>
				</div>
			</div>
		</div>
	</div>
</template>

<script lang="ts" setup>
	import { useIProgress } from '~/composables/interfaces/iProgress'
	import { useMyProgressStore } from '~/stores/progress'
	import type { Lesson } from '~/types/Lesson'
	import type { Progress } from '~/types/Progress'
	import { type ObjectId } from 'mongoose'
	import { Instrument } from '~/types/Instrument'

	definePageMeta({
		middleware: 'auth',
		layout: 'pratice',
	})

	onBeforeMount(async () => {
		load()
	})

	// Stores
	const userStore = useMyUserStore()
	const userDetailsStore = useMyUserDetailsStore()
	const progressStore = useMyProgressStore()
	const iProgress = useIProgress()
	const iLesson = useILesson()
	const helpers = useHelpers()

	const isLoaded = ref(false)

	const { imageUrl: avatar } = storeToRefs(useMyUserDetailsStore())

	const { lesson } = storeToRefs(useMyProgressStore())

	const toast = ref()
	const toaster = ref({
		header: '',
		body: '',
		type: '',
	})

	const firstString = computed(() => {
		switch (lesson.value?.stringNumber) {
			case 'upToDown':
				return 'Primeira para Última'

			case 'downToUp':
				return 'Última para Primeira'

			default:
				return lesson.value?.firstFinger
		}
	})

	const userDetailsButton: any = ref()

	const userDetails: Ref<any> = ref()

	async function load() {
		await loadUserStore()
		const isUserDetailsExists = await verifyIfIsUserDetailsExists()
		if (!isUserDetailsExists) {
			toogleUserDetailsForm()
			toaster.value.header = 'Quase Lá!'
			toaster.value.body = 'Complete seu cadastro.'
			toaster.value.type = 'warn'
			toast.value.show()
			return
		}
		saveUserDetailsOnStore()
		await loadProgress()
		await useController().init()
		setTimeout(() => {
			isLoaded.value = true
		}, 1000)
	}

	async function loadUserStore() {
		const { getSession } = useAuth()
		const { user } = await getSession()
		// @ts-ignore
		userStore.setId(user._id)
		// @ts-ignore
		userStore.setUserName(user?.username)
		// @ts-ignore
		userDetailsStore.setUserId(user._id)
		userStore.logIn()
	}

	async function verifyIfIsUserDetailsExists() {
		userDetails.value = await getUserDetails()
		return userDetails.value.error?.statusCode === 404 ? false : true
	}

	async function loadProgress() {
		if (!userStore.getId) throw Error
		toaster.value.header = 'Sucesso!'
		toaster.value.body = `Você está conectado!<br />
			<strong>Inicie uma partida agora!</strong>`
		toaster.value.type = 'success'
		toast.value.show()

		const response = await useIProgress().getProgress(userStore.getId)

		if (response.error.value?.statusCode === 404) {
			const lesson = await getLesson(10)
			if (!lesson) throw new Error('Lição não localizada!')

			const progress: Progress = generateProgress(lesson)
			const response = await postProgress(progress)
			progressStore.addProgress(response.data.value as Progress, lesson)
		}

		if (response.data.value) {
			const progress = response.data.value as Progress[]
			progressStore.setProgress(progress)

			const lastLessonId = progress[progress.length - 1]
				.lesson as unknown as string

			const lastLesson = (await iLesson.getLessonById(lastLessonId)) as Lesson
			progressStore.setLesson(lastLesson)
		}
	}

	async function getLesson(number: number) {
		const quantityOfStrings = useHelpers().getQuantityOfStrings(
			userDetailsStore.getInstrument,
		)

		const lessonQuery = {
			number: number,
			quantityOfStrings: quantityOfStrings,
		}
		const response = await useILesson().getLesson(lessonQuery)

		if (response?.lesson) {
			const lesson = response.lesson as Lesson
			progressStore.setLesson(lesson)
			return lesson
		}
		return null
	}

	function toogleUserDetailsForm() {
		userDetailsButton.value.click()
	}

	async function postUserDetails() {
		const userDetails = {
			userId: userStore.getId,
			...useMyUserDetailsStore().getAll,
		}
		const userDetailsResponse = await useIUser().postUserDetails(userDetails)
		// @ts-ignore
		await toogleUserDetailsForm()
		useRouter().go(0)
	}

	async function getUserDetails() {
		return await useIUser().getUserDetails(userStore.getId)
	}

	function saveUserDetailsOnStore() {
		useMyUserDetailsStore().update(userDetails.value.data)
	}

	const modal = {
		title: 'Finalize seu cadastro',
		id: 'userDetailsModal',
	}

	const controller = useController()
	controller.init()

	const { showBox, showCards, showStatistics, isCompleted } = controller

	watch(isCompleted, async (newValue) => {
		if (newValue === true) {
			useMyProgressStore().setIsCompleted(isCompleted.value)

			const response = await useIProgress().setProgress(
				useMyProgressStore().getLastProgress,
			)

			isCompleted.value = false
			showCards.value = false
			showBox.value = true

			toaster.value.header = 'Parabéns!'
			toaster.value.body = `Lição ${lesson.value?.number} Finalizada!`
			toast.value.show()

			const currentLessonNumber = progressStore.getCurrentLesson?.number

			if (currentLessonNumber) {
				const lesson = await getLesson(currentLessonNumber + 1)
				if (!lesson) throw new Error('Lição não localizada!')

				const progress = generateProgress(lesson)
				const response = await postProgress(progress)
				progressStore.addProgress(response.data.value as Progress, lesson)
				controller.init()
			}
		}
	})

	const boxes = {
		callInAction: {
			text: '<div style="font-size:1.5em">JOGAR</div>',
			schema: 'the-project',
			leftLogo: false,
			rightLogo: false,
		},
	}

	function generateProgress(lesson: Lesson) {
		return {
			userId: userStore.getId as unknown as ObjectId,
			lesson: lesson._id as unknown as ObjectId,
			isCompleted: false,
			instrument: helpers.getInstrumentEnum(
				userDetailsStore.getInstrument,
			) as Instrument,
			currentLesson: lesson.number,
		}
	}

	async function postProgress(progress: Progress) {
		return await iProgress.postProgress(progress)
	}

	function start() {
		controller.payload()
	}

	function payload() {
		console.log('payload')
	}

	async function exit() {
		// verificar se o audio esta sendo executado
		await useAudio().stopAudios()
		useRouter().push('/')
	}
</script>

<style scoped>
	.exercise {
		height: 80vh;
		display: flex;
		align-items: center;
	}

	#start-button:hover {
		cursor: pointer !important;
	}

	.btn {
		background-color: transparent;
		color: rgba(255, 255, 255, 0.7);
		border-color: transparent;
	}

	.btn:hover {
		color: rgba(255, 255, 255, 1);
		background-color: rgba(0, 0, 0, 0.1);
	}

	.avatar {
		color: darkgray;
		height: 60px;
		width: 60px;
		border-radius: 50%;
		border: 1px solid rgba(255, 255, 255, 0.7);
	}
	.img-fluid {
		width: 59px;
		height: 59px;
		border-radius: 50%;
	}

	.btn-play {
		background-color: transparent;
		border-color: transparent;
	}

	.btn-play:hover {
		color: transparent !important;
		background-color: transparent !important;
	}
</style>
