export const useCountDown = () => {
  const SECOND = 1000;
  const MINUTE = SECOND * 60;
  const HOUR = MINUTE * 60;
  const DAY = HOUR * 24;

  // Set the date we're counting down to
  const countDownDate = new Date("Mar 18, 2025 19:00:00").getTime();

  const timer = ref({
    days: {
      value: "",
      label: "",
    },
    hours: {
      value: "",
      label: "Horas",
    },
    minutes: {
      value: "",
      label: "Minutos",
    },
    seconds: {
      value: "",
      label: "Segundos",
    },
  });

  const distance = ref(countDownDate - new Date().getTime());

  setInterval(async function () {
    var now = new Date().getTime();

    distance.value = (await countDownDate) - now;

    getTimer();

    sanitizeDays();
  }, SECOND);

  /**
   * Updates the timer values based on the remaining time distance.
   *
   * The `getTimer` function calculates the remaining days, hours, minutes, and seconds
   * until the countdown date (`countDownDate`). These values are then updated in the `timer` object.
   *
   * The function uses the `sanitizeNumber` function to ensure that the values for hours,
   * minutes, and seconds have two digits by adding a leading zero if necessary.
   * The value for days is directly converted to a string.
   *
   * @returns {void}
   */
  function getTimer() {
    timer.value.seconds.value = sanitizeNumber(
      Math.floor((distance.value % MINUTE) / SECOND)
    );
    timer.value.minutes.value = sanitizeNumber(
      Math.floor((distance.value % HOUR) / MINUTE)
    );
    timer.value.hours.value = sanitizeNumber(
      Math.floor((distance.value % DAY) / HOUR)
    );
    timer.value.days.value = Math.floor(distance.value / DAY).toString();
  }

  /**
   * Verifies the distance value and performs actions based on its value.
   * If the distance is less than 1, it clears the interval and redirects to the home page.
   */
  function isLanched() {
    return distance.value < 1;
  }

  /**
   * Sanitizes a number by adding a leading zero if it is less than 10.
   *
   * @param {number} number - The number to sanitize.
   * @returns {string} The sanitized number as a string.
   */
  function sanitizeNumber(number: number) {
    return number < 10 ? `0${number}` : number.toString();
  }

  /**
   * Updates the label for the days in the countdown timer based on the value.
   * If the value of days is less than or equal to '1', the label is set to 'Dia' (singular).
   * Otherwise, the label is set to 'Dias' (plural).
   *
   * @returns {void}
   */
  function sanitizeDays() {
    return timer.value.days.value <= "1"
      ? (timer.value.days.label = "Dia")
      : (timer.value.days.label = "Dias");
  }
  return { timer, isLanched };
};
