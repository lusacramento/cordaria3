import { expect, test } from "vitest";
import type { User } from "~/types/User";
import { useIUser } from "#imports";

let users = [] as Array<User>;

function generateFakeUsers() {
  const asciiA = 97;
  const asciiZ = 122;
  for (let i = asciiA; i <= asciiZ; i++) {
    const symbol = String.fromCharCode(i);
    users.push(generateFakeUser(symbol));
  }
}

function generateFakeUser(fakeName: string) {
  return {
    userName: `user${fakeName}`,
    email: `email@${fakeName}.com`,
    password: "123123123",
    repeatPassword: "123123123",
    acceptTerms: true,
  } as User;
}

async function postUser(user: User) {
  return await useIUser().createUser(user);
}

function getUser() {}

function deleteUser() {}

test("generate fake users", () => {
  generateFakeUsers();
  expect(users.length).toBe(26);
});

test("post user", () => {
  expect(postUser(users[0])).toBe(undefined);
});
test("testing-hello-world", () => {
  expect(3).toBe(3);
});
test("testing-hello-world", () => {
  expect(3).toBe(3);
});
test("testing-hello-world", () => {
  expect(3).toBe(3);
});
test("testing-hello-world", () => {
  expect(3).toBe(3);
});
