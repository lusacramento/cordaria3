import { type SweetAlertData } from '~/types/SweetAlertData'
import { type Lesson } from '~/types/Lesson'
import { type SweetAlertIcon } from 'sweetalert2'

export const useViewController = () => {
	// composables
	const game = useGameController()
	const { push, go } = useRouter()

	// views
	const isLoaded = ref(false)
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
	async function showTips(currentLesson: Lesson) {
		dataTips.value.title = (await currentLesson?.messageTitle) as string
		dataTips.value.message = (await currentLesson?.message) as string
		dataTips.value.icon = (await currentLesson?.messageIcon) as SweetAlertIcon
		tips.value.showAlert(dataTips.value)
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
		game.payload()
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
