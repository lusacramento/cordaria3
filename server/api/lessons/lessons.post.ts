import { Lesson } from "~/server/models/Lesson";
import { Lesson as LessonType } from "~/types/Lesson";

export default defineEventHandler(async (event) => {
  const body: LessonType[] = await readBody(event);

  try {
    const isExistsLesson: boolean = (await Lesson.findOne({
      _id: { $exists: true },
    })) as boolean;

    if (isExistsLesson) {
      new Error("Já existe lições");
      throw createError({
        statusCode: 400,
        statusMessage: "Bad Request",
        message: "Já existe lições cadastradas!",
      });
    }

    body.forEach(async (element: LessonType) => {
      await console.log(element.number, " - ", element.quantityOfStrings);
      if (
        !element.hasOwnProperty("number") ||
        !element.hasOwnProperty("level") ||
        !element.hasOwnProperty("firstFinger") ||
        !element.hasOwnProperty("stringNumber") ||
        !element.hasOwnProperty("bpm") ||
        !element.hasOwnProperty("message") ||
        !element.hasOwnProperty("quantityOfStrings") ||
        !element.hasOwnProperty("points")
      )
        throw createError({
          statusCode: 400,
          statusMessage: "Bad Request",
          message: "Campos obrigatórios ausentes.",
        });
    });

    await Lesson.insertMany(body);
    return "Lições inseridas no Banco de dados com sucesso!";
  } catch (error) {
    return error;
  }
  return;
});
