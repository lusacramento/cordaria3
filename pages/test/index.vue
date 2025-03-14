<template>
  <div class="container">
    <ul>
      <li v-for="(user, i) in fakeUsers" :key="user.email"><strong>{{ i + 1 }}</strong>: {{ user._id }} - {{
        user.userName }} -
        {{ user.email }} - {{
          user.password }}</li>
    </ul>
    <hr />
    <ul>
      <li v-for="(score, i) in fakeScores" :key="score._id"><strong>{{ i + 1 }}</strong>: {{ score._id }} - {{
        score.userId }}
        - {{ score.instrument }} -
        {{ score.score }} - {{ score.awards }}</li>
    </ul>
  </div>
</template>

<script lang="ts" setup>
import { useTest } from '~/composables/test'

const { fakeUsers, fakeScores, start } = useTest()

onBeforeMount(() => {
  start()
})
</script>

<style></style>