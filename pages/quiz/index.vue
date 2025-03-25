<template>
  <div>
    <LayoutsHeader>
      <template #center>
        <div class="d-flex justify-content-center align-items-center">
          <LayoutsBox :box="box" />
        </div>
      </template>
    </LayoutsHeader>
    <div class="container d-flex align-items-center justify-content-center quiz">
      <div v-if="!isFinished" class="question">
        <div class="row mb-3 mt-3 text-center">
          <div class="col">
            <h2>{{ currentQuestion.value }}</h2>
          </div>
        </div>
        <div class="row d-flex justify-content-center align-items-center">
          <div class="answers col-5 justify-content-center align-items-center d-flex m-2"
            v-for="answer of currentQuestion.answers" :key="answer.id" @click.prevent="selectedAnswer(answer)"
            :class="{ selected: answer.isSelected }">
            {{ answer.value }}
          </div>
        </div>
        <hr>
        <div class="d-flex justify-content-center text-center">
          <button type="button" class="btn btn-primary text-center" @click.prevent="next">Próximo</button>
        </div>
      </div>
      <div v-else>
        <div class="score d-flex text-center justify-content-center align-items-center mb-3 mt-3">
          <h2>SEU APROVEITAMENTO É: <strong>{{ Math.round(score * 100 / questions.length) }}% !</strong></h2>
        </div>
        <div v-for="(question, index) of questions" :key="question.id">
          Questão {{ index + 1 }}: <strong>{{ question.value }}</strong><br />
          <div v-for="answer of question.answers" :key="answer.id">
            <div v-if="answer.isCorrect">
              Resposta correta: <strong>{{ answer.value }}</strong>
            </div>
          </div>
          Sua resposta: <strong>{{ question.userAnswer?.value }}</strong><br />
          Acertou? <strong>{{ question.isHit ? 'SIM' : 'NÃO' }}</strong>
          <hr />
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import type { Box } from '~/types/Box';

useHead({
  meta: [
    {
      hid: 'titlequiz',
      name: 'title',
      content: 'Cordaria - Quiz',
    },
    {
      hid: 'quizz',
      name: 'description',
      content:
        'Treine os símbolos de cifras',
    },
    {
      hid: 'projetokeys',
      name: 'keywords',
      content: 'música, cifra, método',
    },
  ],
  link: [
    {
      rel: 'canonical',
      href: 'https://cordaria.app',
    },
  ],
})

const { questions, currentQuestion, next, isFinished, selectedAnswer, score } = useQuiz()
const box: Box = {
  content: '<h1>QUIZ<h1>',
  schema: 'index',
  leftLogo: true,
}
</script>

<style scoped>
.quiz {
  color: var(--text-color)
}

.answers {
  border: solid 4px rgba(57, 57, 67, 1);
  height: 20vh;
  width: 25vw;
  font-size: 2rem;
}

.answers:hover {
  background-color: var(--color-yellow);
}

.selected {
  background-color: var(--color-green) !important;
  color: var(--color-extreme);
  font-size: 2.5rem;
}

.score {
  border: solid 2px rgba(255, 255, 255, 0.5)
}
</style>