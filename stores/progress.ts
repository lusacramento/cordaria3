import { useMyUserStore } from "./user";
import { type ObjectId } from "mongoose";
import { defineStore } from "pinia";
import { type Progress } from "~/types/Progress";
import { type Lesson } from "~/types/Lesson";
import type { Score } from "~/types/Score";

/**
 * Store for managing user progress, lessons, scores, and awards.
 */
export const useMyProgressStore = defineStore("myProgressStore", {
  state: () => ({
    /**
     * The current progress of the user.
     * @type {Progress}
     */
    progress: {} as Progress,

    /**
     * The current lesson of the user.
     * @type {Lesson}
     */
    lesson: {} as Lesson,

    /**
     * The current score of the user.
     * @type {number}
     */
    score: 0 as number,

    /**
     * The number of awards the user has received.
     * @type {number}
     */
    awards: 0 as number,
  }),

  getters: {
    /**
     * Get the current progress of the user.
     * @param {State} state - The state of the store.
     * @returns {Progress} The current progress.
     */
    getProgress(state) {
      return state.progress;
    },

    /**
     * Get the current lesson of the user.
     * @param {State} state - The state of the store.
     * @returns {Lesson} The current lesson.
     */
    getCurrentLesson(state) {
      return state.lesson;
    },

    /**
     * Get the current score of the user.
     * @param {State} state - The state of the store.
     * @returns {number} The current score.
     */
    getScore(state) {
      return state.score;
    },
  },

  actions: {
    /**
     * Generate a new progress object.
     * @returns {Progress} The generated progress object.
     */
    generate() {
      return {
        userId: useMyUserStore().getId as unknown as ObjectId,
        lesson: this.lesson._id as unknown as ObjectId,
        isCompleted: false,
        instrument: useMySettingsStore().getInstrument,
        currentLesson: this.lesson.number,
      } as Progress;
    },

    /**
     * Load the progress for the current or specified lesson.
     * @param {number} [currentLesson] - The lesson number to load.
     */
    async load(currentLesson?: number) {
      const progress: Ref<any> = ref();
      try {
        progress.value = !currentLesson
          ? ((await useIProgress().getLastProgress(
              useMyUserStore().getId,
              useMySettingsStore().getInstrument
            )) as Progress)
          : ((await useIProgress().getProgress(
              useMyUserStore().getId,
              useMySettingsStore().getInstrument,
              currentLesson
            )) as Progress);
      } catch (error) {
        console.error(error);
      }

      if (!progress.value) {
        const firstLessonNumber = 1;
        await this.getLesson(firstLessonNumber);
        const progress = this.generate();
        this.post(progress);
        return;
      }

      this.progress = progress as unknown as Progress;

      await this.getLessonById();
    },

    /**
     * Load the progress for the next lesson.
     */
    async loadNext() {
      const nextLessonNumber = this.progress.currentLesson + 1;
      await this.getLesson(nextLessonNumber);

      const progress = await this.generate();

      await this.post(progress);
    },

    /**
     * Post the progress to the server.
     * @param {Progress} progress - The progress to post.
     */
    async post(progress: Progress) {
      this.progress = (await useIProgress().postProgress(progress)) as Progress;
    },

    /**
     * Update the current progress as completed.
     */
    async update() {
      this.progress.isCompleted = true;
      this.progress = (await useIProgress().setProgress(
        this.progress
      )) as Progress;
    },

    /**
     * Get the lesson by its number.
     * @param {number} number - The lesson number.
     */
    async getLesson(number: number) {
      const quantityOfStrings = useHelpers().getQuantityOfStrings(
        useMySettingsStore().getInstrument
      );

      const lessonQuery = {
        number: number,
        quantityOfStrings: quantityOfStrings,
      };

      const lesson = await useILesson().getLesson(lessonQuery);
      if (lesson?.lesson) this.lesson = lesson.lesson as Lesson;
    },

    /**
     * Get the lesson by its ID.
     */
    async getLessonById() {
      this.lesson = (await useILesson().getLessonById(
        this.progress.lesson as unknown as string
      )) as Lesson;
    },

    /**
     * Generate a new score object.
     * @returns {Score} The generated score object.
     */
    generateScore() {
      return {
        userId: useMyUserStore().getId as unknown as ObjectId,
        instrument: useMySettingsStore().getInstrument,
        score: this.score,
        awards: this.awards,
      } as unknown as Score;
    },

    /**
     * Load the score for the current user.
     */
    async loadScore() {
      this.clearStore();
      const score = (await useIScore().getScore(
        useMyUserStore().getId,
        useMySettingsStore().getInstrument
      )) as Score;

      if (score) {
        this.score = score.score;
        this.awards = score.awards;
        return;
      }
      await this.postScore();
    },

    /**
     * Post the score to the server.
     */
    async postScore() {
      const score = this.generateScore() as unknown as Score;
      await useIScore().postScore(score);
    },

    /**
     * Update the current score.
     */
    updateScore() {
      this.calculateScore();

      this.verifyIfAwarded();

      this.postScore();
    },

    /**
     * Calculate the score based on the lesson completion status.
     */
    calculateScore() {
      this.score += !this.progress.isCompleted
        ? this.lesson.points
        : Math.round(this.lesson.points / 2);
    },

    /**
     * Clear the score store.
     */
    clearStore() {
      this.score = 0;
    },

    /**
     * Verify if the current lesson awards the user.
     */
    verifyIfAwarded() {
      if (this.lesson.message.isAwarded) this.awards++;
    },
  },
});
