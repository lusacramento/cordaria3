import { useGameController } from "./game";
import { type SweetAlertData } from "~/types/SweetAlertData";
import type { LessonMessage } from "~/types/LessonMessage";

export const useViewController = () => {
  // composables
  const game = useGameController();
  const { push, go } = useRouter();

  // views
  const isLoaded = ref(false);

  const isShowGameScreen = ref(false);

  const isShowStatistics = ref(false);

  const userDetailsModal = ref();

  const boxButtons = ref({
    play: {
      content: `<div style="font-size:1.5em">CARREGANDO...</div>`,
      schema: "green",
    },
    stop: {
      content: `<div style="font-size:1.5em">Cancelar</div>`,
      schema: "red",
    },
  });

  const modal = {
    title: "Finalize seu cadastro",
    id: "userDetailsModal",
    buttonLabel: "Salvar",
    isShowCanceledButton: "true",
  };

  const tips = ref();
  const dataTips: Ref<SweetAlertData> = ref({
    title: "",
    message: "",
    icon: "info",
  });

  // toasts
  const toast = ref();
  const toaster = ref({
    header: "",
    body: "",
    type: "",
  });

  const points = ref(0);
  // lessons
  const firstLessonNumber = 180;
  const lastLessonNumber = 190;

  // functions
  // view
  function toggleShowGameScreen() {
    isShowGameScreen.value = !isShowGameScreen.value;
  }

  function toggleShowStatistics() {
    isShowStatistics.value = !isShowStatistics.value;
  }

  async function showTips(message: LessonMessage) {
    tips.value.showAlert(message);
  }

  function showToast(
    header: string,
    body: string,
    type: "success" | "warn" | "error"
  ) {
    toaster.value.header = header;
    toaster.value.body = body;
    toaster.value.type = type;
    toast.value.show();
  }

  function refreshPage() {
    useRouter().go(0);
  }

  function showDetailsFormModal() {
    userDetailsModal.value.show();
  }

  function hideDetailsFormModal() {
    userDetailsModal.value.hide();
  }

  function enablePlayButton() {
    setTimeout(() => {
      boxButtons.value.play.content = `<div style="font-size:1.5em">JOGAR</div>`;
      isLoaded.value = true;
    }, 2000);
  }

  function disablePlayButton() {
    boxButtons.value.play.content = `<div style="font-size:1.5em">CARREGANDO...</div>`;
    isLoaded.value = false;
  }

  // game mechanics
  function start() {
    toggleShowGameScreen();
    game.payload();
    // const isCompleted = toRef(useGameController().isCompleted)
    // isCompleted.value = true
  }

  function payload() {
    console.log("payload");
  }

  async function exit(to: "/" | "/a-pratica") {
    const { stopAudios } = useAudio();

    await stopAudios();
    to === "/" ? push(to) : go(0);
  }

  return {
    isLoaded,
    isShowGameScreen,
    isShowStatistics,
    userDetailsModal,
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
    showDetailsFormModal,
    hideDetailsFormModal,
    enablePlayButton,
    disablePlayButton,
    start,
    payload,
    exit,
  };
};
