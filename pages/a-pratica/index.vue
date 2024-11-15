<template>
	<div class="cordaria">
		<LayoutsOffCanvas @showStatistics="payload" />
		<LayoutsToast ref="toast" :type="toaster.type">
			<template #header>{{ toaster.header }}</template>
			<template #body><div v-html="toaster.body" /></template>
		</LayoutsToast>
		<LayoutsModal
			ref="userDetailsModal"
			:modal="modal"
			@callFunction="submitUserDetails"
			:call-to-action-button-label="modal.buttonLabel"
		>
			<template #body><UserDetailsForm /></template>
		</LayoutsModal>
		<CordariaTips ref="tips" />

		<div id="the-practice" class="container-fluid p-0">
			<div v-if="!isShowGameScreen" class="row">
				<div class="col">
					<LayoutsHeader>
						<template #left>
							<ul class="align-items-center">
								<li>
									<button
										class="btn btn-primary"
										type="button"
										data-bs-toggle="offcanvas"
										data-bs-target="#offcanvasWithBothOptions"
										aria-controls="offcanvasWithBothOptions"
									>
										Preferências
									</button>
								</li>
								<li>
									<button
										type="button"
										class="btn btn-primary"
										@click.prevent="exit('/')"
									>
										Voltar
									</button>
								</li>
								<li>
									<LayoutsColorModePicker class="" />
								</li>
							</ul>

							<div class="d-flex"></div>
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
									<img
										:src="avatar"
										class="img-fluid"
										alt="avatar do usuário"
									/>
								</div>
								<div class="mx-2">@{{ getUserName }}</div>
							</div>
						</template>
					</LayoutsHeader>
				</div>
			</div>
			<div class="row d-flex justify-content-center align-items-center">
				<div
					class="col-lg-10 content d-flex justify-content-center align-items-center"
				>
					<div class="row"></div>
					<div v-if="isShowStatistics" class="d-block row">
						<StatisticsTable :toggle-show-statistics="toggleShowStatistics" />
					</div>
					<div
						v-else
						class="row exercise justify-content-center align-items-center d-flex exercise-screen"
					>
						<div
							class="d-flex justify-content-center align-items-center d-flex"
						>
							<div v-if="!isShowGameScreen" class="justify-content-center">
								<div class="row m-4 text-center">
									<h1>Lição {{ lesson?.number }} - {{ lesson?.level }}</h1>
								</div>
								<div class="row m-4 justify-content-center d-flex">
									<LessonFigure />
								</div>
								<div class="row m-4">
									<button
										type="button"
										class="btn-controls"
										:disabled="!isLoaded"
									>
										<LayoutsBox
											:box="boxButtons.play"
											@click.prevent="start()"
										/>
									</button>
								</div>
							</div>
							<div v-else class="cards-screen">
								<div class="row mb-5">
									<div class="col">
										<CordariaScreen />
									</div>
								</div>
								<div class="row">
									<div class="col d-flex justify-content-center">
										<button type="button" class="d-flex btn-controls">
											<LayoutsBox
												:box="boxButtons.stop"
												@click.prevent="exit('/a-pratica')"
											/>
										</button>
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
			<div v-if="!isRunning" class="row">
				<div class="col">
					<button
						type="button"
						class="btn btn-primary"
						@click.prevent="toggleShowStatistics()"
					>
						Estatísticas
					</button>
				</div>
			</div>
		</div>
	</div>
</template>

<script lang="ts" setup>
	import { useMyProgressStore } from '~/stores/progress'
	import { useScreenOrientation } from '@vueuse/core'

	const { lockOrientation } = useScreenOrientation()
	if (useMobile().isMobileDevice()) lockOrientation('landscape-primary')

	definePageMeta({
		middleware: 'auth',
		layout: 'pratice',
	})

	onBeforeMount(async () => {
		await load()
		if (useMyUserDetailsStore().getId) init()
	})

	// Stores
	const { getUserName } = storeToRefs(useMyUserStore())
	const { setId, setUserName, logIn } = useMyUserStore()

	const { getCurrentLesson, lesson, score } = storeToRefs(useMyProgressStore())

	const { imageUrl: avatar } = storeToRefs(useMyUserDetailsStore())

	// Controllers
	const { isCompleted, init, isRunning } = useGameController()

	const {
		isLoaded,
		isShowGameScreen,
		isShowStatistics,
		userDetailsModal,
		boxButtons,
		modal,
		tips,
		toast,
		toaster,
		points,
		lastLessonNumber,
		toggleShowGameScreen,
		toggleShowStatistics,
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
			await useMyProgressStore().update()

			isCompleted.value = false
			toggleShowGameScreen()

			showToast(
				'Parabéns!',
				`Lição ${lesson.value?.number} Finalizada!`,
				'success',
			)

			const currentLesson = await getCurrentLesson.value
			if (currentLesson?.message.title) {
				showTips(currentLesson.message)
			}

			const currentLessonNumber = currentLesson?.number

			if (currentLessonNumber) {
				if (currentLessonNumber === lastLessonNumber) {
					init()
					return
				}

				useMyProgressStore().loadNext()

				await useMySettingsStore().load()
				init()
				enablePlayButton()
			}
		}
	})

	// Functions
	async function load() {
		await loadUserStore()

		await useMyUserDetailsStore().load()

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

		await useMySettingsStore().load()

		await useMyProgressStore().load()

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
		setUserName(user?.userName)
		// @ts-ignore
		setId(user._id)
		logIn()
	}

	async function submitUserDetails() {
		await useMyUserDetailsStore().post()

		await toogleUserDetailsForm()

		refreshPage()
	}
</script>

<style scoped>
	.content {
		width: 80%;
		height: 80vh;
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

	.img-lesson {
		width: 80%;
	}

	.avatar-link {
		cursor: pointer;
	}

	.cards-screen {
		padding-top: 20%;
	}

	.btn-controls {
		background-color: transparent;
		border: none;
	}
</style>
