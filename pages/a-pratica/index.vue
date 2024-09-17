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
					<button
						type="button"
						class="btn btn-primary"
						@click.prevent="exit('/')"
					>
						Sair
					</button>
				</template>
				<template #center>
					<div class="d-flex justify-content-center">
						<div>Pontos: {{ points }}</div>
					</div>
				</template>
				<template #right>
					<div
						class="d-flex align-items-center justify-content-end avatar-link"
						@click.prevent="toogleUserDetailsForm()"
					>
						<div
							class="avatar d-flex justify-content-center align-items-center"
						>
							<img :src="avatar" class="img-fluid" alt="avatar do usuário" />
						</div>
						<div class="mx-2">@{{ getUserName }}</div>
					</div>
				</template>
			</LayoutsHeader>
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
	import lessonImg from '~/public/imgs/lessons/lesson-002.svg'

	definePageMeta({
		middleware: 'auth',
		layout: 'pratice',
	})

	onBeforeMount(async () => {
		await load()
		init()
	})

	// Stores
	const { getUserName } = storeToRefs(useMyUserStore())
	const { setId, setUserName, logIn } = useMyUserStore()

	const { getCurrentLesson, lesson, score } = storeToRefs(useMyProgressStore())

	const { imageUrl: avatar } = storeToRefs(useMyUserDetailsStore())

	// Controllers
	const { showBox, showCards, showStatistics, isCompleted, init } =
		useGameController()

	const {
		isLoaded,
		userDetailsModalButton,
		boxButtons,
		modal,
		tips,
		toast,
		toaster,
		points,
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
			await useMyProgressStore().updateScore()
			await useMyProgressStore().updateProgress()

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

				useMyProgressStore().loadNextProgress()

				await useMySettingsStore().loadSettings()
				init()
				enablePlayButton()
			}
		}
	})

	// Functions
	async function load() {
		await loadUserStore()

		await useMyUserDetailsStore().loadUserDetails()

		if (!useMyUserDetailsStore().getId) {
			toogleUserDetailsForm()
			showToast('Quase Lá!', 'Complete seu cadastro.', 'warn')
			return
		}

		showToast(
			'Sucesso!',
			`Você está conectado!<br />
				<strong>Inicie uma partida agora!</strong>`,
			'success',
		)

		await useMySettingsStore().loadSettings()

		await useMyProgressStore().loadProgress()

		await useMyProgressStore().loadScore()

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

	async function submitUserDetails() {
		await useMyUserDetailsStore().postUserDetails()

		await toogleUserDetailsForm()

		refreshPage()
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

	.avatar-link {
		cursor: pointer;
	}
</style>
