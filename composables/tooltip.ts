/**
 * A composable function that provides tooltip functionality using Bootstrap.
 *
 * @returns An object containing the `createTooltip` function.
 */
export const useTooltip = () => {
  const bootstrap = () => import("bootstrap");

  /**
   * Creates a Bootstrap tooltip for the given element.
   *
   * @param {Element} el - The DOM element to which the tooltip will be attached.
   * @returns {Promise<void>} A promise that resolves when the tooltip is created.
   */
  function createTooltip(el: Element) {
    bootstrap().then((response) => {
      return new response.Tooltip(el, {
        fallbackPlacements: ["right"],
        trigger: "hover focus",
      });
    });
  }
  return {
    createTooltip,
  };
};
