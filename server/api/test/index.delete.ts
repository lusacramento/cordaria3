import { User } from "~/server/models/User";

export default defineEventHandler(async (event) => {
  try {
    await User.deleteMany();
  } catch (error) {
    throw createError({
      statusCode: 400,
      statusMessage: "Bad Request",
      message: "Missing required fields",
    });
  }
  return "204";
});
