import type { Lesson } from "~/types/Lesson";
import lesson4 from "~/docs/lesson4Strings.json";
import lesson6 from "~/docs/lesson6Strings.json";
import type { LessonMessage } from "~/types/LessonMessage";

/**
 * Converts an array of original lesson objects to an array of Lesson objects.
 *
 * @param {any[]} originalLessons - The array of original lesson objects to be converted.
 * @returns {Lesson[]} An array of converted Lesson objects.
 */
function convertJSONtoLessons(originalLessons: any[]) {
  const lessons: Lesson[] = [];
  originalLessons.forEach((element) => {
    const lesson = {} as Lesson;
    lesson.number = parseInt(element.number);
    lesson.level = element.level;
    lesson.firstFinger = parseInt(element.firstfinger);
    lesson.stringNumber = element.stringnumber;
    lesson.bpm = parseInt(element.bpm);

    const message: LessonMessage = {
      title: element.title,
      description: element.description,
      icon: element.icon,
      isAwarded: element.isawarded === "true",
      awardNumber: parseInt(element.awardnumber),
    };

    lesson.message = message;
    lesson.points = parseInt(element.points);
    lesson.quantityOfStrings = parseInt(element.quantityofstrings);
    lessons.push(lesson);
  });

  return lessons;
}

/**
 * Retrieves and combines lessons from different sources.
 *
 * This function converts JSON data from `lesson4` and `lesson6` into lesson objects
 * and concatenates them into a single array.
 *
 * @returns {Array} An array of lesson objects combined from `lesson4` and `lesson6`.
 */
function getLessons() {
  const lessons4 = convertJSONtoLessons(lesson4);
  const lessons6 = convertJSONtoLessons(lesson6);
  return lessons4.concat(lessons6);
}

export const useLessonsData = () => {
  return { getLessons };
};
