import { startSession } from "mongoose";
import { DeletedUser } from "~/server/models/deletedUser";
import { User } from "~/server/models/User";
import { UserDetails } from "~/server/models/UserDetails";
import { Progress } from "~/server/models/progress";
import { Score } from "~/server/models/score";
import { Settings } from "~/server/models/Settings";

export default defineEventHandler(async (event) => {
  const { id } = await getQuery(event);
  const body = await readBody(event);

  const session = await startSession();
  session.startTransaction();

  try {
    await User.deleteOne({ _id: id }, { session });
    await UserDetails.deleteOne({ userId: id }, { session });
    await Progress.deleteMany({ userId: id }, { session });
    await Score.deleteMany({ userId: id }, { session });
    await Settings.deleteOne({ userId: id }, { session });

    await DeletedUser.create([body], { session });

    await session.commitTransaction();
  } catch (error) {
    await session.abortTransaction();
    console.error("Transaction aborted due to error: ", error);
    throw error; // or handle the error as needed
  } finally {
    session.endSession();
  }

  return;
});
