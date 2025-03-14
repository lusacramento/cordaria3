import { Score } from "~/server/models/score";

export default defineEventHandler(async (event) => {
  const params = await getQuery(event);
  let top10 = [] as any[];

  let user = {} as any;
  let isUserTop = false;

  await verifyParams();

  top10 = await getTop10Scores();
  await addComplementaryData();

  if (!isUserTop) {
    await getUser();
    addUser();
  }

  function verifyParams() {
    if (!params)
      throw createError({
        statusCode: 400,
        statusMessage: "Bad Request",
        message: "Missing required fields",
      });
  }

  async function getTop10Scores() {
    return await Score.aggregate([
      {
        $match: { instrument: params.instrument },
      },
      {
        $lookup: {
          from: "users", // Name of the users collection
          localField: "userId",
          foreignField: "_id",
          as: "user",
        },
      },
      {
        $sort: { score: -1 },
      },
      {
        $project: {
          _id: 0,
          score: 1,
          awards: 1,
          username: { $arrayElemAt: ["$user.userName", 0] }, // Extract the username
        },
      },
      { $limit: 10 },
    ]);
  }

  function addComplementaryData() {
    top10.forEach((score: any, i) => {
      score.position = i + 1;

      if (score.username === params.userName) {
        score.isCurrentUser = true;
        isUserTop = true;
      } else {
        score.isCurrentUser = false;
      }
    });
  }

  function addUser() {
    top10.push(user);
  }

  async function getUser() {
    const score = await Score.findOne({
      instrument: params.instrument,
      userId: params.userId,
    });

    if (score) {
      user = {
        awards: score.awards,
        score: score.score,
        username: params.userName,
        position: await getUserRank(score.score),
        isCurrentUser: true,
      };
    }
  }

  async function getUserRank(score: number) {
    const userRank =
      (await Score.countDocuments({
        instrument: params.instrument,
        score: { $gt: score },
      })) + 1;
    return userRank;
  }

  return top10;
});
