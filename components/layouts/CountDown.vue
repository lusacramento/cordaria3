<template>
  <div class="container countdown d-flex text-center justify-content-center align-items-center">
    <div class="row justify-content-center">
      <div class="col-3 cards red-card m-3 d-flex justify-content-center align-items-center">
        <h1>FALTAM</h1>
      </div>

      <div class="col-3 cards yellow-card m-3 d-flex justify-content-center align-items-center">
        <div class="row justify-content-center">
          <div v-if="timer.days.value > '0'" class="col-12">{{ timer.days.value }} {{ timer.days.label }}</div>
          <div class="col-12">{{ timer.hours.value }} : {{ timer.minutes.value }} : {{ timer.seconds.value }}</div>
        </div>

      </div>
      <div class="col-3 cards green-card m-3 d-flex justify-content-center align-items-center">
        <h1>para o <br />lançamento!</h1>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
const SECOND = 1000
const MINUTE = SECOND * 60
const HOUR = MINUTE * 60
const DAY = HOUR * 24

// Set the date we're counting down to
const countDownDate = new Date("Mar 14, 2025 15:00:00").getTime();

const timer = ref({
  days: {
    value: '',
    label: ''
  },
  hours: {
    value: '',
    label: 'Horas'
  },
  minutes: {
    value: '',
    label: 'Minutos'
  },
  seconds: {
    value: '',
    label: 'Segundos'
  }
})

const distance = ref()

const interval = setInterval(function () {

  var now = new Date().getTime()

  distance.value = countDownDate - now

  getTimer()

  sanitizeDays()

  verifyDistance()


}, SECOND);

/**
 * Updates the timer object with the calculated time remaining.
 * 
 * This function calculates the remaining time in seconds, minutes, hours, and days
 * based on the `distance` value and updates the `timer` object accordingly.
 * 
 * The `distance` value represents the time difference in milliseconds.
 * The `sanitizeNumber` function is used to format the calculated values.
 * 
 * The `timer` object structure:
 * {
 *   value: {
 *     seconds: { value: String },
 *     minutes: { value: String },
 *     hours: { value: String },
 *     days: { value: String }
 *   }
 * }
 * 
 * Constants used:
 * - SECOND: Number of milliseconds in a second.
 * - MINUTE: Number of milliseconds in a minute.
 * - HOUR: Number of milliseconds in an hour.
 * - DAY: Number of milliseconds in a day.
 */
function getTimer() {
  timer.value.seconds.value = sanitizeNumber(Math.floor((distance.value % MINUTE) / SECOND))
  timer.value.minutes.value = sanitizeNumber(Math.floor((distance.value % HOUR) / MINUTE))
  timer.value.hours.value = sanitizeNumber(Math.floor((distance.value % DAY) / HOUR));
  timer.value.days.value = Math.floor(distance.value / DAY).toString();
}

/**
 * Verifies the distance value and performs actions based on its value.
 * If the distance is less than 1, it clears the interval and redirects to the home page.
 */
function verifyDistance() {
  if (distance.value < 1) {
    clearInterval(interval);
    redirectToHome()
  }
}

/**
 * Redirects the user to the home page.
 * Utilizes the Vue Router's `useRouter` hook to navigate to the root path ('/').
 */
function redirectToHome() {
  useRouter().push('/')
}

/**
 * Sanitizes a number by adding a leading zero if it is less than 10.
 *
 * @param {number} number - The number to sanitize.
 * @returns {string} The sanitized number as a string.
 */
function sanitizeNumber(number: number) {
  return number < 10 ? `0${number}` : number.toString()
}

/**
 * Updates the label for the days in the countdown timer based on the value.
 * If the value of days is less than or equal to '1', the label is set to 'Dia' (singular).
 * Otherwise, the label is set to 'Dias' (plural).
 *
 * @returns {void}
 */
function sanitizeDays() {
  return (timer.value.days.value <= '1') ?
    timer.value.days.label = 'Dia' :
    timer.value.days.label = 'Dias'
}

</script>

<style scoped>
.countdown {
  height: 50vh;
}

.red-card {
  background-color: var(--color-red);
}

.yellow-card {
  background-color: var(--color-yellow);
  font-size: 2.3rem !important;
  font-weight: var(--font-black);
  border: solid 10px rgba(57, 57, 67, 1);
}

.green-card {
  background-color: var(--color-green);
}

@media (max-width: 575.98px) {
  .cards {
    height: 160px;
    width: 160px;

  }

  .yellow-card,
  .green-card,
  h1 {
    font-size: 1.3rem !important;
  }
}

@media (min-width: 576px) and (max-width: 991.98px) {
  .cards {
    height: 160px;
    width: 160px;

  }

  .yellow-card,
  .green-card,
  h1 {
    font-size: 1.3rem !important;
  }
}

@media (min-width: 992px) {
  .cards {
    height: 250px;
    width: 250px;
  }
}
</style>