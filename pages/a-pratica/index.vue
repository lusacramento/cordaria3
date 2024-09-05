<template>
	<div id="the-pratice" class="cordaria">
		<LayoutsOffCanvas @showStatistics="payload" />
		<LayoutsToast ref="toast" :type="toaster.type">
			<template #header>{{ toaster.header }}</template>
			<template #body><div v-html="toaster.body" /></template>
		</LayoutsToast>
		<CordariaTips ref="tips" />

		<div class="container-fluid">
			<LayoutsHeader>
				<template #left>
					<button
						class="btn btn-primary"
						type="button"
						data-bs-toggle="offcanvas"
						data-bs-target="#offcanvasWithBothOptions"
						aria-controls="offcanvasWithBothOptions"
					>
						Preferências
					</button>
					<button
						ref="userDetailsModalButton"
						type="button"
						class="btn btn-primary"
						data-bs-toggle="modal"
						:data-bs-target="`#${modal.id}`"
						hidden
					>
						Launch demo modal
					</button>
					<button type="button" class="btn btn-primary">
						<nuxt-link
							to=""
							class="nav-link the-pratice-link"
							@click.prevent="exit('/')"
							><span>Sair</span></nuxt-link
						>
					</button>
				</template>
				<template #center>
					<div class="d-flex justify-content-center">
						<div>Pontos: {{ points }}</div>
					</div>
				</template>
				<template #right>
					<div class="d-flex align-items-center justify-content-end">
						<div
							class="avatar d-flex justify-content-center align-items-center"
						>
							<img :src="avatar" class="img-fluid" alt="avatar do usuário" />
						</div>
						<div class="mx-2">@{{ getUserName }}</div>
					</div>
				</template>
			</LayoutsHeader>
			<InstrumentList v-if="showBox" />
			<LayoutsModal :modal="modal" @callFunction="submitUserDetails">
				<template #body><UserDetailsForm /></template>
			</LayoutsModal>

			<div class="row exercise justify-content-center bg-exercise-screen">
				<div class="col-lg-10">
					<div
						class="play-button d-flex justify-content-center align-items-center d-flex"
					>
						<div v-if="showBox">
							<button class="btn btn-play" :disabled="!isLoaded">
								<h1>Lição {{ lesson?.number }} - {{ lesson?.level }}</h1>
								<img class="img-lesson" :src="lessonImg" alt="" />
								<Box
									:title-text="boxButtons.play.callInAction.text"
									:schema="boxButtons.play.callInAction.schema"
									:left-logo="boxButtons.play.callInAction.leftLogo"
									:right-logo="boxButtons.play.callInAction.rightLogo"
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
											:title-text="boxButtons.stop.callInAction.text"
											:schema="boxButtons.stop.callInAction.schema"
											:left-logo="boxButtons.stop.callInAction.leftLogo"
											:right-logo="boxButtons.stop.callInAction.rightLogo"
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
	import { useMyProgressStore } from '~/stores/progress'
	import type { Lesson } from '~/types/Lesson'
	import type { Progress } from '~/types/Progress'
	import lessonImg from '~/public/imgs/lessons/lesson-002.svg'

	definePageMeta({
		middleware: 'auth',
		layout: 'pratice',
	})

	onBeforeMount(async () => {
		load()
	})

	// Stores
	const { getId, getUserName } = storeToRefs(useMyUserStore())
	const { setId, setUserName, logIn } = useMyUserStore()

	const { getCurrentLesson, lesson, score } = storeToRefs(useMyProgressStore())
	const { setLesson, setProgress, setIsCompletedProgress, setScore } =
		useMyProgressStore()

	const { imageUrl: avatar, getInstrument } = storeToRefs(
		useMyUserDetailsStore(),
	)
	const { setUserId, updateUserDetails } = useMyUserDetailsStore()

	// Controllers
	const { showBox, showCards, showStatistics, isCompleted, init } =
		useGameController()

	const db = useDbController()

	const {
		isLoaded,
		userDetailsModalButton,
		boxButtons,
		modal,
		tips,
		toast,
		toaster,
		points,
		firstLessonNumber,
		lastLessonNumber,
		showTips,
		showToast,
		refreshPage,
		toogleUserDetailsForm,
		enablePlayButton,
		disablePlayButton,
		start,
		payload,
		exit,
	} = useViewController()

	// Watchers
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

	watch(isCompleted, async (newValue) => {
		disablePlayButton()
		if (newValue === true) {
			db.updateScore()

			await db.postScore()
			setIsCompletedProgress(isCompleted.value)

			await db.updateProgress()

			isCompleted.value = false
			showCards.value = false
			showBox.value = true

			showToast(
				'Parabéns!',
				`Lição ${lesson.value?.number} Finalizada!`,
				'success',
			)

			const currentLesson = await getCurrentLesson.value
			if (currentLesson?.message) {
				showTips(currentLesson)
			}

			const currentLessonNumber = currentLesson?.number

			if (currentLessonNumber) {
				if (currentLessonNumber === lastLessonNumber) {
					init()
					return
				}

				const lesson = await db.getLesson(currentLessonNumber + 1)
				if (!lesson) throw new Error('Lição não localizada!')
				const progress = db.generateProgress(lesson)
				const response = await db.postProgress(progress)
				setProgress(response.data.value as Progress)
				setLesson(lesson)
				init()
				enablePlayButton()
			}
		}
	})

	watch(
		() => getInstrument,
		async (newValue, oldValue) => {
			if (oldValue) {
				await db.updateUserDetails(newValue.value)
				refreshPage()
			}
		},
	)

	const userDetails: Ref<any> = ref()

	init()

	// Functions

	async function load() {
		await loadUserStore()

		const userDetails: Ref<any> = ref()

		const isUserDetailsExists = await verifyIfIsUserDetailsExists()
		if (!isUserDetailsExists) {
			toogleUserDetailsForm()
			showToast('Quase Lá!', 'Complete seu cadastro.', 'warn')
			return
		}

		saveUserDetailsOnStore()

		if (!getId) throw Error
		showToast(
			'Sucesso!',
			`Você está conectado!<br />
				<strong>Inicie uma partida agora!</strong>`,
			'success',
		)

		await loadProgress()

		await loadScore()

		await useGameController().init()
		enablePlayButton()
	}

	async function loadUserStore() {
		const { getSession } = useAuth()
		const { user } = await getSession()
		// @ts-ignore
		setId(user._id)
		// @ts-ignore
		setUserName(user?.username)
		// @ts-ignore
		setUserId(user._id)
		logIn()
	}

	async function verifyIfIsUserDetailsExists() {
		userDetails.value = await db.getUserDetails()
		return userDetails.value.error?.statusCode === 404 ? false : true
	}

	async function loadProgress() {
		const response = await db.getProgress()
		if (!response) {
			const lesson = await db.getLesson(firstLessonNumber)
			if (!lesson) throw new Error('Lição não localizada!')

			const progress: Progress = db.generateProgress(lesson)
			const response = await db.postProgress(progress)
			setProgress(response.data.value as Progress)
			setLesson(lesson)
		}

		if (response) {
			const progress = response as Progress
			setProgress(progress)

			const lastLessonId = progress.lesson as unknown as string
			const lastLesson = (await db.getLessonById(lastLessonId)) as Lesson
			setLesson(lastLesson)
		}
	}
	async function loadScore() {
		try {
			const score = await db.getScore()
			setScore(score)
		} catch (error: any) {
			if (error.statusCode === 404) setScore(0)
		}
	}

	async function submitUserDetails() {
		db.postUserDetails()
		await toogleUserDetailsForm()
		refreshPage()
	}

	function saveUserDetailsOnStore() {
		updateUserDetails(userDetails.value)
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

	.img-lesson {
		width: 80%;
	}
</style>
