// TODO corrigir test

// import type { User } from "~/types/User";
// import type { Score } from "~/types/Score";

// export const useTest = () => {
//   // users
//   const fakeUsers: Ref<Array<User>> = ref([]);
//   const begin = 65;
//   const end = 90;

//   function generateFakeUsers() {
//     for (let i = begin; i <= end; i++) {
//       const ascii = String.fromCharCode(i);
//       fakeUsers.value.push({
//         email: `user${i}@gmail.com`,
//         userName: `user${ascii}`,
//         password: "123456789",
//         confirmPassword: "123456789",
//         acceptTerms: true,
//       });
//     }
//   }

//   async function postFakeUsers() {
//     await generateFakeUsers();
//     fakeUsers.value.forEach(async (user: User) => {
//       await useIUser().createUser(user);
//     });
//   }

//   async function getFakeUsers() {
//     fakeUsers.value = await $fetch("/api/test", { method: "GET" });
//   }

//   async function deleteFakeUsers() {
//     setTimeout(async () => {
//       const response = await $fetch("/api/test", { method: "DELETE" });
//       if (response === "204") clearFakeUsers();
//     }, 20000);
//   }

//   function clearFakeUsers() {
//     fakeUsers.value = [];
//   }

//   // scores

//   const fakeScores: Ref<Array<Score>> = ref([]);
//   const instrument = "Bass";

//   function generateScore(userId: string) {
//     return {
//       userId: userId as string,
//       instrument: instrument,
//       score: getRandomInt(10000),
//       awards: getRandomInt(8),
//     } as Score;
//   }

//   async function postFakeScores() {
//     fakeUsers.value.forEach(async (user: User) => {
//       try {
//         if (user._id)
//           await useIScore().postScore(await generateScore(user._id));
//       } catch (error) {}
//     });
//   }

//   async function getFakeScores() {
//     fakeUsers.value.forEach(async (user: User) => {
//       fakeScores.value.push(
//         await $fetch("/api/scores", {
//           query: { userId: user._id, instrument: instrument },
//           method: "GET",
//         })
//       );
//     });
//   }

//   function getRandomInt(max: number) {
//     return Math.floor(Math.random() * max);
//   }

//   // Main function

//   async function start() {
//     await postFakeUsers();
//     await getFakeUsers();

//     await postFakeScores();
//     await getFakeScores();
//     // await deleteFakeUsers();
//   }
//   return { start, fakeUsers, fakeScores };
// };
