import disabledLightAcousticGuitar from "~/assets/imgs/instruments/index/light/disabled/acoustic-guitar.png";
import enabledLightAcousticGuitar from "~/assets/imgs/instruments/index/light/enabled/acoustic-guitar.png";
import disabledLightElectricGuitar from "~/assets/imgs/instruments/index/light/disabled/electric-guitar.png";
import enabledLightElectricGuitar from "~/assets/imgs/instruments/index/light/enabled/electric-guitar.png";
import disabledLightBass from "~/assets/imgs/instruments/index/light/disabled/bass.png";
import enabledLightBass from "~/assets/imgs/instruments/index/light/enabled/bass.png";
import disabledLightCavaco from "~/assets/imgs/instruments/index/light/disabled/cavaco.png";
import enabledLightCavaco from "~/assets/imgs/instruments/index/light/enabled/cavaco.png";

import disabledDarkAcousticGuitar from "~/assets/imgs/instruments/index/dark/disabled/acoustic-guitar.png";
import enabledDarkAcousticGuitar from "~/assets/imgs/instruments/index/dark/enabled/acoustic-guitar.png";
import disabledDarkElectricGuitar from "~/assets/imgs/instruments/index/dark/disabled/electric-guitar.png";
import enabledDarkElectricGuitar from "~/assets/imgs/instruments/index/dark/enabled/electric-guitar.png";
import disabledDarkBass from "~/assets/imgs/instruments/index/dark/disabled/bass.png";
import enabledDarkBass from "~/assets/imgs/instruments/index/dark/enabled/bass.png";
import disabledDarkCavaco from "~/assets/imgs/instruments/index/dark/disabled/cavaco.png";
import enabledDarkCavaco from "~/assets/imgs/instruments/index/dark/enabled/cavaco.png";
import { Instrument } from "~/types/Instrument";

/**
 * A composable function that manages the selection and highlighting of musical instruments
 * based on the user's settings and device type.
 *
 * @returns {Object} An object containing various reactive properties and methods for instrument selection and interaction.
 *
 * @property {Ref<Object>} instruments - A reactive object containing the available instruments and their respective images.
 * @property {Function} updateThemeImages - A function to update the instrument images based on the current theme.
 * @property {Function} updateActiveInstrumentImage - A function to update the image of the currently active instrument.
 * @property {Function} joinGame - A function to load the selected instrument and redirect the user to the practice page.
 * @property {Function} mouseHover - A function to highlight an instrument when the mouse hovers over it.
 * @property {Function} mouseLeave - A function to remove the highlight from all instruments when the mouse leaves.
 * @property {Ref<boolean>} isMobile - A reactive boolean indicating if the user is on a mobile device.
 */
export const useInstrumentSelector = () => {
  const { value } = toRefs(useColorMode());
  const { instrument } = storeToRefs(useMySettingsStore());
  const { isMobileDevice } = useMobile();

  const isMobile = ref(false);

  if (isMobileDevice()) {
    isMobile.value = true;
    setADefaultInstrumentWhenNotLoggedAndIsMobile();
  }

  const instruments = ref({
    acousticGuitar: {
      id: Instrument.ACOUSTICGUITAR,
      url:
        value.value === "dark"
          ? disabledDarkAcousticGuitar
          : disabledLightAcousticGuitar,
    },
    electricGuitar: {
      id: Instrument.ELECTRICGUITAR,
      url:
        value.value === "dark"
          ? disabledDarkElectricGuitar
          : disabledLightElectricGuitar,
    },

    bass: {
      id: Instrument.BASS,
      url: value.value === "dark" ? disabledDarkBass : disabledLightBass,
    },
    cavaco: {
      id: Instrument.CAVACO,
      url: value.value === "dark" ? disabledDarkCavaco : disabledLightCavaco,
    },
  });

  highlightInstrument(instrument.value);

  watch(value, (newValue) => {
    removeHighlightOfAllInstruments();
    updateActiveInstrumentImage(instrument.value);
  });

  watch(instrument, () => {
    removeHighlightOfAllInstruments();
    updateActiveInstrumentImage(instrument.value);
  });

  /**
   * Removes the highlight from all instruments by setting their URLs to the corresponding
   * disabled state based on the current theme (dark or light).
   *
   * This function updates the URLs of the following instruments:
   * - Acoustic Guitar
   * - Electric Guitar
   * - Bass
   * - Cavaco
   *
   * The URLs are set to either the dark or light disabled versions depending on the value of `value.value`.
   *
   * @remarks
   * This function assumes that `value.value` can be either 'dark' or 'light' and that the `instruments` object
   * contains properties for `acousticGuitar`, `electricGuitar`, `bass`, and `cavaco`, each with a `url` property.
   */
  function removeHighlightOfAllInstruments() {
    switch (value.value) {
      case "dark":
        instruments.value.acousticGuitar.url = disabledDarkAcousticGuitar;
        instruments.value.electricGuitar.url = disabledDarkElectricGuitar;
        instruments.value.bass.url = disabledDarkBass;
        instruments.value.cavaco.url = disabledDarkCavaco;

        break;
      case "light":
        instruments.value.acousticGuitar.url = disabledLightAcousticGuitar;
        instruments.value.electricGuitar.url = disabledLightElectricGuitar;
        instruments.value.bass.url = disabledLightBass;
        instruments.value.cavaco.url = disabledLightCavaco;

        break;
    }
  }

  /**
   * Updates the URL of the active instrument image based on the provided instrument and the current theme.
   *
   * @param {Instrument} instrument - The instrument for which the image URL needs to be updated.
   *
   * The function updates the URL of the instrument image based on the current theme (dark or light).
   * It handles the following instruments:
   * - Acoustic Guitar
   * - Electric Guitar
   * - Bass
   * - Cavaco
   *
   * The URL is set to the appropriate image based on whether the theme is dark or light.
   */
  function updateActiveInstrumentImage(instrument: Instrument) {
    switch (instrument) {
      case Instrument.ACOUSTICGUITAR:
        instruments.value.acousticGuitar.url =
          value.value === "dark"
            ? enabledDarkAcousticGuitar
            : enabledLightAcousticGuitar;
        instruments.value.acousticGuitar.url = enabledDarkAcousticGuitar;
        break;
      case Instrument.ELECTRICGUITAR:
        instruments.value.electricGuitar.url =
          value.value === "dark"
            ? enabledDarkElectricGuitar
            : enabledLightElectricGuitar;

        break;
      case Instrument.BASS:
        instruments.value.bass.url =
          value.value === "dark" ? enabledDarkBass : enabledLightBass;

        break;
      case Instrument.CAVACO:
        instruments.value.cavaco.url =
          value.value === "dark" ? enabledDarkCavaco : enabledLightCavaco;

        break;

      default:
        break;
    }
  }

  /**
   * Highlights the specified instrument by updating its URL based on the current theme.
   *
   * @param {Instrument} instrument - The instrument to be highlighted.
   *
   * The function checks the current theme (either 'dark' or 'light') and updates the URL
   * of the specified instrument to the corresponding enabled URL for that theme.
   *
   * - If the theme is 'dark', it sets the URL to the enabled dark version of the instrument.
   * - If the theme is 'light', it sets the URL to the enabled light version of the instrument.
   *
   * The function handles the following instruments:
   * - Acoustic Guitar
   * - Electric Guitar
   * - Bass
   * - Cavaco
   */
  function highlightInstrument(instrument: Instrument) {
    switch (value.value) {
      case "dark":
        if (instruments.value.acousticGuitar.id == instrument)
          instruments.value.acousticGuitar.url = enabledDarkAcousticGuitar;
        if (instruments.value.electricGuitar.id == instrument)
          instruments.value.electricGuitar.url = enabledDarkElectricGuitar;
        if (instruments.value.bass.id == instrument)
          instruments.value.bass.url = enabledDarkBass;
        if (instruments.value.cavaco.id == instrument)
          instruments.value.cavaco.url = enabledDarkCavaco;
        break;
      case "light":
        if (instruments.value.acousticGuitar.id == instrument)
          instruments.value.acousticGuitar.url = enabledLightAcousticGuitar;
        if (instruments.value.electricGuitar.id == instrument)
          instruments.value.electricGuitar.url = enabledLightElectricGuitar;
        if (instruments.value.bass.id == instrument)
          instruments.value.bass.url = enabledLightBass;
        if (instruments.value.cavaco.id == instrument)
          instruments.value.cavaco.url = enabledLightCavaco;
        break;

      default:
        break;
    }
  }

  /**
   * Joins the game with the specified instrument.
   *
   * This function loads the given instrument into the game.
   *
   * @param {Instrument} instrument - The instrument to be loaded into the game.
   */
  function joinGame(instrument: Instrument) {
    loadInstrument(instrument);
  }

  /**
   * Handles the mouse hover event for an instrument.
   *
   * When the mouse hovers over a new instrument, this function will:
   * 1. Remove the highlight from all instruments.
   * 2. Highlight the new instrument.
   *
   * @param {Instrument} newInstrument - The instrument to be highlighted.
   */
  function mouseHover(newInstrument: Instrument) {
    removeHighlightOfAllInstruments();
    highlightInstrument(newInstrument);
  }

  /**
   * Handles the mouse leave event by removing the highlight from all instruments
   * and updating the active instrument image.
   *
   * This function is typically used to reset the visual state of the instrument
   * selector when the mouse leaves the area.
   */
  function mouseLeave() {
    removeHighlightOfAllInstruments();
    updateActiveInstrumentImage(instrument.value);
  }

  /**
   * Asynchronously loads the specified instrument and updates the user's settings accordingly.
   * If the instrument is different from the current one and the user is logged in, it updates the settings.
   * Otherwise, it just sets the instrument.
   * Finally, it redirects the user to the practice page.
   *
   * @param {Instrument} instrument - The instrument to be loaded.
   * @returns {Promise<void>} A promise that resolves when the instrument is loaded and settings are updated.
   */
  async function loadInstrument(instrument: Instrument) {
    if (
      useMySettingsStore().getInstrument !== instrument &&
      useMyUserStore().getId
    ) {
      await useMySettingsStore().setInstrument(instrument);
      await useMySettingsStore().update();
    } else {
      await useMySettingsStore().setInstrument(instrument);
    }

    redirectToPracticePage();
  }

  /**
   * Redirects the user to the practice page.
   * Utilizes the Vue Router to navigate to the '/entrar' route.
   */
  function redirectToPracticePage() {
    useRouter().push("/entrar");
  }

  /**
   * Sets the default instrument to Acoustic Guitar when the user is not logged in and is using a mobile device.
   */
  function setADefaultInstrumentWhenNotLoggedAndIsMobile() {
    instrument.value = Instrument.ACOUSTICGUITAR;
  }

  return {
    instruments,
    updateThemeImages: removeHighlightOfAllInstruments,
    updateActiveInstrumentImage,
    joinGame,
    mouseHover,
    mouseLeave,
    isMobile,
  };
};
