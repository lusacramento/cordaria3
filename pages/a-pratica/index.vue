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
								@click.prevent="exit('/')"
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
						<div class="mx-3">Pontos: {{ points }}</div>
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
			<InstrumentList v-if="showBox" />
			<LayoutsModal :modal="modal" @callFunction="postUserDetails">
				<template #body><UserDetailsForm /></template>
			</LayoutsModal>

			<div class="row exercise justify-content-center bg-exercise-screen">
				<div class="col-lg-10">
					<div class="play-button d-flex justify-content-center">
						<div v-if="showBox">
							<button class="btn btn-play" :disabled="!isLoaded">
								<Box
									:title-text="boxes.play.callInAction.text"
									:schema="boxes.play.callInAction.schema"
									:left-logo="boxes.play.callInAction.leftLogo"
									:right-logo="boxes.play.callInAction.rightLogo"
									@click.prevent="start()"
								/>
							</button>
						</div>
						<div v-if="showStatistics" class="d-block">
							<StatisticsTable />
						</div>
						<div v-if="showCards">
							<div class="row mb-5">
								<div class="col">
									<CordariaScreen />
								</div>
							</div>
							<div class="row">
								<div class="col d-flex justify-content-center">
									<button type="button" class="btn">
										<Box
											:title-text="boxes.stop.callInAction.text"
											:schema="boxes.stop.callInAction.schema"
											:left-logo="boxes.stop.callInAction.leftLogo"
											:right-logo="boxes.stop.callInAction.rightLogo"
											@click.prevent="exit('/a-pratica')"
										/>
									</button>
								</div>
							</div>
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
	import { useIScore } from '~/composables/interfaces/iScore'
	import type { Score } from '~/types/Score'

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

	// interfaces
	const iProgress = useIProgress()
	const iLesson = useILesson()
	const iScore = useIScore()
	const iUser = useIUser()
	const helpers = useHelpers()
	const controller = useController()

	// views
	const { imageUrl: avatar } = storeToRefs(userDetailsStore)
	const { lesson } = storeToRefs(progressStore)

	const isLoaded = ref(false)
	const mainButtonLabel = ref(
		`<div style="font-size:1.5em">CARREGANDO...</div>`,
	)

	const points = ref(0)

	const modal = {
		title: 'Finalize seu cadastro',
		id: 'userDetailsModal',
	}

	const boxes = ref({
		play: {
			callInAction: {
				text: mainButtonLabel,
				schema: 'the-project',
				leftLogo: false,
				rightLogo: false,
			},
		},
		stop: {
			callInAction: {
				text: `<div style="font-size:1.5em">Cancelar</div>`,
				schema: 'the-project',
				leftLogo: false,
				rightLogo: false,
			},
		},
	})

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

	const { score } = storeToRefs(progressStore)
	watch(score, (newValue, oldValue) => {
		function animateCounter() {
			newValue <= points.value ? clearInterval(counter) : points.value++
		}

		if (oldValue === 0) {
			points.value = newValue
			return
		}

		const counter = setInterval(animateCounter, 10)
	})

	const { showBox, showCards, showStatistics, isCompleted } = controller

	watch(isCompleted, async (newValue) => {
		if (newValue === true) {
			updateScore()

			await postScore()
			progressStore.setIsCompleted(isCompleted.value)

			await iProgress.setProgress(progressStore.getProgress)

			isCompleted.value = false
			showCards.value = false
			showBox.value = true

			showToast(
				'Parabéns!',
				`Lição ${lesson.value?.number} Finalizada!`,
				'success',
			)

			const currentLessonNumber = progressStore.getCurrentLesson?.number
			if (currentLessonNumber) {
				const lesson = await getLesson(currentLessonNumber + 1)
				if (!lesson) throw new Error('Lição não localizada!')
				const progress = generateProgress(lesson)
				const response = await postProgress(progress)
				progressStore.setProgress(response.data.value as Progress)
				progressStore.setLesson(lesson)
				controller.init()
			}
		}
	})

	watch(
		() => userDetailsStore.getInstrument,
		async (newValue, oldValue) => {
			if (oldValue) {
				await iUser.setUserDetails({
					userId: userDetailsStore.userId,
					instrument: newValue,
				})
				useRouter().go(0)
			}
		},
	)

	controller.init()

	async function load() {
		await loadUserStore()
		const isUserDetailsExists = await verifyIfIsUserDetailsExists()
		if (!isUserDetailsExists) {
			toogleUserDetailsForm()
			showToast('Quase Lá!', 'Complete seu cadastro.', 'warn')
			return
		}
		saveUserDetailsOnStore()
		await loadProgress()
		await useController().init()
		setTimeout(() => {
			mainButtonLabel.value = `<div style="font-size:1.5em">JOGAR</div>`
			isLoaded.value = true
		}, 2000)
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
		showToast(
			'Sucesso!',
			`Você está conectado!<br />
				<strong>Inicie uma partida agora!</strong>`,
			'success',
		)

		const response = await iProgress.getProgress(
			userStore.getId,
			userDetailsStore.getInstrument,
		)

		if (response.error.value?.statusCode === 404) {
			const lesson = await getLesson(180)
			if (!lesson) throw new Error('Lição não localizada!')

			const progress: Progress = generateProgress(lesson)
			const response = await postProgress(progress)
			progressStore.setProgress(response.data.value as Progress)
			progressStore.setLesson(lesson)
		}

		if (response.data.value) {
			const progress = response.data.value as Progress
			progressStore.setProgress(progress)

			const lastLessonId = progress.lesson as unknown as string

			const lastLesson = (await iLesson.getLessonById(lastLessonId)) as Lesson
			progressStore.setLesson(lastLesson)

			progressStore.setScore(await getScore())
		}
	}

	async function getLesson(number: number) {
		const quantityOfStrings = helpers.getQuantityOfStrings(
			userDetailsStore.getInstrument,
		)

		const lessonQuery = {
			number: number,
			quantityOfStrings: quantityOfStrings,
		}
		const response = await iLesson.getLesson(lessonQuery)

		if (response?.lesson) {
			const lesson = response.lesson as Lesson
			progressStore.setLesson(lesson)
			return lesson
		}
		return null
	}

	async function getScore() {
		const score = (await iScore.getScore(
			userStore.getId,
			userDetailsStore.getInstrument,
		)) as Score

		return score.score as number
	}

	function toogleUserDetailsForm() {
		userDetailsButton.value.click()
	}

	async function postUserDetails() {
		const userDetails = {
			userId: userStore.getId,
			...useMyUserDetailsStore().getAll,
		}
		const userDetailsResponse = await iUser.postUserDetails(userDetails)
		// @ts-ignore
		await toogleUserDetailsForm()
		useRouter().go(0)
	}

	async function getUserDetails() {
		return await iUser.getUserDetails(userStore.getId)
	}

	function saveUserDetailsOnStore() {
		userDetailsStore.update(userDetails.value.data)
	}

	function generateProgress(lesson: Lesson) {
		return {
			userId: userStore.getId as unknown as ObjectId,
			lesson: lesson._id as unknown as ObjectId,
			isCompleted: false,
			instrument: userDetailsStore.getInstrument,
			currentLesson: lesson.number,
		}
	}

	async function updateScore() {
		const lessonPoints = progressStore.getCurrentLesson?.points
		if (lessonPoints) {
			const points = !progressStore.getProgress.isCompleted
				? lessonPoints
				: lessonPoints / 2
			progressStore.setScore(points)
		}
	}

	async function postScore() {
		const score = {
			userId: userStore.getId as unknown as ObjectId,
			instrument: userDetailsStore.getInstrument,
			score: progressStore.getScore,
		} as unknown as Score
		await iScore.postScore(score)
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

	async function exit(to: '/' | '/a-pratica') {
		await useAudio().stopAudios()
		to === '/' ? useRouter().push(to) : useRouter().go(0)
	}

	function showToast(
		header: string,
		body: string,
		type: 'success' | 'warn' | 'error',
	) {
		toaster.value.header = header
		toaster.value.body = body
		toaster.value.type = type
		toast.value.show()
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
