import { useGameController } from './game'
import { type SweetAlertData } from '~/types/SweetAlertData'
import { type SweetAlertIcon } from 'sweetalert2'
import type { LessonMessage } from '~/types/LessonMessage'

export const useViewController = () => {
	// composables
	const game = useGameController()
	const { push, go } = useRouter()

	// views
	const isLoaded = ref(false)

	const isShowGameScreen = ref(false)

	const isShowStatistics = ref(false)

	const mainButtonLabel = ref(
		`<div style="font-size:1.5em">CARREGANDO...</div>`,
	)

	const userDetailsModalButton: any = ref()

	const boxButtons = ref({
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

	const modal = {
		title: 'Finalize seu cadastro',
		id: 'userDetailsModal',
	}

	const tips = ref()
	const dataTips: Ref<SweetAlertData> = ref({
		title: '',
		message: '',
		icon: 'info',
	})

	// toasts
	const toast = ref()
	const toaster = ref({
		header: '',
		body: '',
		type: '',
	})

	const points = ref(0)
	// lessons
	const firstLessonNumber = 180
	const lastLessonNumber = 190

	// functions
	// view
	function toggleShowGameScreen() {
		isShowGameScreen.value = !isShowGameScreen.value
	}

	function toggleShowStatistics() {
		isShowStatistics.value = !isShowStatistics.value
	}

	async function showTips(message: LessonMessage) {
		tips.value.showAlert(message)
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

	function refreshPage() {
		useRouter().go(0)
	}

	function toogleUserDetailsForm() {
		userDetailsModalButton.value.click()
	}

	function enablePlayButton() {
		setTimeout(() => {
			mainButtonLabel.value = `<div style="font-size:1.5em">JOGAR</div>`
			isLoaded.value = true
		}, 2000)
	}

	function disablePlayButton() {
		mainButtonLabel.value = `<div style="font-size:1.5em">CARREGANDO...</div>`
		isLoaded.value = false
	}

	// game mechanics
	function start() {
		toggleShowGameScreen()
		game.payload()
		// const isCompleted = toRef(useGameController().isCompleted)
		// isCompleted.value = true
	}

	function payload() {
		console.log('payload')
	}

	async function exit(to: '/' | '/a-pratica') {
		const { stopAudios } = useAudio()

		await stopAudios()
		to === '/' ? push(to) : go(0)
	}

	return {
		isLoaded,
		isShowGameScreen,
		isShowStatistics,
		userDetailsModalButton,
		boxButtons,
		modal,
		tips,
		dataTips,
		toast,
		toaster,
		points,
		firstLessonNumber,
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
	}
}
