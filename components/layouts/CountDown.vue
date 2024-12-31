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
const countDownDate = new Date("Jan 1, 2025 21:14:0").getTime();

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

function getTimer() {
  timer.value.seconds.value = sanitizeNumber(Math.floor((distance.value % MINUTE) / SECOND))
  timer.value.minutes.value = sanitizeNumber(Math.floor((distance.value % HOUR) / MINUTE))
  timer.value.hours.value = sanitizeNumber(Math.floor((distance.value % DAY) / HOUR));
  timer.value.days.value = Math.floor(distance.value / DAY).toString();
}

function verifyDistance() {
  if (distance.value < 1) {
    clearInterval(interval);
    redirectToHome()
  }
}

function redirectToHome() {
  useRouter().push('/')
}

function sanitizeNumber(number: number) {
  return number < 10 ? `0${number}` : number.toString()
}

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