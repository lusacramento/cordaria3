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

  const isMockthePractice = true;

  // functions
  // view
  /**
   * Toggles the visibility of the game screen.
   *
   * This function inverts the current boolean value of `isShowGameScreen.value`,
   * effectively showing the game screen if it is currently hidden, and hiding it
   * if it is currently shown.
   */
  function toggleShowGameScreen() {
    isShowGameScreen.value = !isShowGameScreen.value;
  }

  /**
   * Toggles the visibility of the statistics section.
   *
   * This function inverts the current boolean value of `isShowStatistics.value`,
   * effectively showing the statistics if they are currently hidden, and hiding
   * them if they are currently shown.
   */
  function toggleShowStatistics() {
    isShowStatistics.value = !isShowStatistics.value;
  }

  /**
   * Displays a tip message as an alert.
   *
   * @param {LessonMessage} message - The message to be displayed as a tip.
   * @returns {Promise<void>} A promise that resolves when the tip is shown.
   */
  async function showTips(message: LessonMessage) {
    tips.value.showAlert(message);
  }

  /**
   * Displays a toast notification with the specified header, body, and type.
   *
   * @param header - The header text of the toast notification.
   * @param body - The body text of the toast notification.
   * @param type - The type of the toast notification, which can be "success", "warn", or "error".
   */
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

  /**
   * Refreshes the current page by reloading it.
   * Utilizes the `useRouter` composable to perform the reload.
   */
  function refreshPage() {
    useRouter().go(0);
  }

  /**
   * Displays the user details form modal.
   * This function triggers the `show` method on the `userDetailsModal` object,
   * making the modal visible to the user.
   */
  function showDetailsFormModal() {
    userDetailsModal.value.show();
  }

  /**
   * Hides the user details form modal.
   *
   * This function sets the `hide` method on the `userDetailsModal`'s value,
   * effectively closing or hiding the modal that displays user details.
   */
  function hideDetailsFormModal() {
    userDetailsModal.value.hide();
  }

  /**
   * Enables the play button after a delay of 2 seconds.
   *
   * This function sets the content of the play button to a styled "JOGAR" text
   * and updates the `isLoaded` state to true.
   *
   * @remarks
   * The function uses `setTimeout` to introduce a delay before enabling the play button.
   *
   * @example
   * ```typescript
   * enablePlayButton();
   * ```
   */
  function enablePlayButton() {
    setTimeout(() => {
      boxButtons.value.play.content = `<div style="font-size:1.5em">JOGAR</div>`;
      isLoaded.value = true;
    }, 2000);
  }

  /**
   * Disables the play button by updating its content to indicate loading and sets the `isLoaded` state to false.
   *
   * This function modifies the `boxButtons` reactive object to change the play button's content to a loading message.
   * It also sets the `isLoaded` reactive state to false to indicate that the content is not yet loaded.
   */
  function disablePlayButton() {
    boxButtons.value.play.content = `<div style="font-size:1.5em">CARREGANDO...</div>`;
    isLoaded.value = false;
  }

  // game mechanics
  /**
   * Initializes the game by toggling the game screen visibility and
   * invoking the game payload function.
   *
   * @remarks
   * This function is responsible for starting the game. It toggles the
   * visibility of the game screen and calls the `payload` method on the
   * `game` object.
   *
   * @example
   * ```typescript
   * start();
   * ```
   */
  function start() {
    toggleShowGameScreen();

    if (isMockthePractice) {
      const isCompleted = toRef(useGameController().isCompleted);
      isCompleted.value = true;
    } else {
      game.payload();
    }
  }

  /**
   * Logs the string "payload" to the console.
   */
  function payload() {
    console.log("payload");
  }

  /**
   * Exits the current view and navigates to the specified route.
   *
   * @param to - The target route to navigate to. Can be either "/" or "/a-pratica".
   * @returns A promise that resolves when the audio has stopped and the navigation is complete.
   */
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
