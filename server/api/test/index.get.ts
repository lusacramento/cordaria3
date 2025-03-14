import { User } from "~/server/models/User";

export default defineEventHandler(async (event) => {
  try {
    const user = await User.find();
    return user;
  } catch (error) {
    throw createError({
      statusCode: 400,
      statusMessage: "Bad Request",
      message: "Missing required fields",
    });
  }
});
