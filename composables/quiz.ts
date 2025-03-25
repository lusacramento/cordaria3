interface Note {
  id: number;
  value: string;
  symbol: string;
}

interface Answer {
  id: string;
  value: string;
  isCorrect: boolean;
  isSelected: boolean;
}

interface Question {
  id: string;
  type: string;
  value: string;
  answers: Answer[];
  userAnswer?: Answer;
  isHit: boolean;
}

export const useQuiz = () => {
  const values: string[] = [
    "Dó",
    "Ré bemol",
    "Dó sustenido",
    "Ré",
    "Mi bemol",
    "Ré sustenido",
    "Mi",
    "Fá",
    "Sol bemol",
    "Fá sustenido",
    "Sol",
    "Lá bemol",
    "Sol sustenido",
    "Lá",
    "Si bemol",
    "Lá sustenido",
    "Si",
  ];
  const symbols: string[] = [
    "C",
    "Db",
    "C#",
    "D",
    "Eb",
    "D#",
    "E",
    "F",
    "Gb",
    "F#",
    "G",
    "Ab",
    "G#",
    "A",
    "Bb",
    "A#",
    "B",
  ];

  const score = ref(0);

  const questionA = "Qual nota é representada pelo símbolo";
  const questionB = "Qual símbolo representa a nota";

  const questions: Ref<Array<Question>> = ref([]);

  let answers: Answer[] = [];

  let indexCurrentQuestion = ref(0);
  const notes = generateNotes();
  const currentQuestion: Ref<Question> = ref(questions.value[0]);

  const isFinished = ref(false);

  generateQuiz();

  function generateNotes() {
    const notes: Array<Note> = [];
    for (let index = 0; index < values.length; index++) {
      notes.push({ id: index, value: values[index], symbol: symbols[index] });
    }
    return notes;
  }

  function generateQuiz() {
    notes.forEach((element) => {
      const answerIndex = 1;
      answers = [];

      answers.push({
        id: `QA${element.id}-A${answerIndex}`,
        value: element.symbol,
        isCorrect: true,
        isSelected: false,
      });

      answers = getOtherAnswers(symbols, answers, element.id);

      const question: Question = {
        id: `QA${element.id}`,
        type: "1",
        value: `${questionB} "${element.value}"?`,
        answers: suffleArray(answers),
        isHit: false,
      };

      questions.value.push(question);
    });

    notes.forEach((element) => {
      const answerIndex = 1;
      answers = [];

      answers.push({
        id: `QB${element.id}-A${answerIndex}`,
        value: element.value,
        isCorrect: true,
        isSelected: false,
      });

      answers = getOtherAnswers(values, answers, element.id);

      const question: Question = {
        id: `QB${element.id}`,
        type: "1",
        value: `${questionA} "${element.symbol}"?`,
        answers: suffleArray(answers),
        isHit: false,
      };

      questions.value.push(question);
    });

    questions.value = suffleArray(questions.value);

    currentQuestion.value = questions.value[0];
  }

  function suffleArray(array: any[]) {
    let suffledArray = array.slice();

    for (let i = suffledArray.length; i > 0; i--) {
      const sortedIndex = useMath().sortIndex(i);
      const element = suffledArray[sortedIndex];
      suffledArray.push(element);
      suffledArray.splice(sortedIndex, 1);
    }

    return suffledArray;
  }

  function getOtherAnswers(
    arrayOrigin: any[],
    arrayDestination: Answer[],
    questionIndex: number
  ) {
    let index = 2;
    while (index < 5) {
      const element = arrayOrigin[ramdom(arrayOrigin.length)];

      const isElementExist = arrayDestination.some(
        (elementOnArray) => elementOnArray.value === element
      );

      if (!isElementExist) {
        arrayDestination.push({
          id: `Q${questionIndex}-A${index}`,
          value: element,
          isCorrect: false,
          isSelected: false,
        });
        index++;
      }
    }
    return arrayDestination;
  }

  function ramdom(index: number) {
    return Math.floor(Math.random() * index);
  }

  function next() {
    checkAnswer();
    getNewQuestion();
  }

  function checkAnswer() {
    if (currentQuestion.value.userAnswer?.isCorrect) {
      currentQuestion.value.isHit = true;
      score.value++;
    }
  }

  function getNewQuestion() {
    indexCurrentQuestion.value++;
    indexCurrentQuestion.value < questions.value.length
      ? (currentQuestion.value = questions.value[indexCurrentQuestion.value])
      : (isFinished.value = true);
  }

  function selectedAnswer(answer: Answer) {
    currentQuestion.value.userAnswer = answer;
    currentQuestion.value.answers.forEach((element) => {
      element.isSelected = element.id === answer.id ? true : false;
    });
  }

  return {
    questions,
    currentQuestion,
    next,
    isFinished,
    selectedAnswer,
    score,
  };
};
