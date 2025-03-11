export const useMobile = () => {
  /**
   * Checks if the current device is a mobile device.
   *
   * This function uses the user agent string to determine if the device is an iPhone, iPad, or Android device.
   *
   * @returns {boolean} `true` if the device is a mobile device, otherwise `false`.
   */
  function isMobileDevice() {
    return navigator.userAgent.match(/iPhone/i) ||
      navigator.userAgent.match(/iPad/i) ||
      navigator.userAgent.match(/Android/i)
      ? true
      : false;
  }
  return { isMobileDevice };
};
