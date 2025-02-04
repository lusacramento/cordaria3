export const useIUser = () => {
  const registerUrl = "/api/auth/register";
  const userDetailsUrl = "/api/userdetails";
  const userUrl = "/api/user";
  const tokenUrl = "api/user/token";

  async function findUserByEmail(email: string) {
    return await $fetch(userUrl, {
      method: "get",
      params: { email: email },
    });
  }

  async function createUser(values: any) {
    return await $fetch(registerUrl, {
      method: "post",
      body: values,
    });
  }

  async function setUser(id: string, body: {}) {
    return await $fetch(userUrl, {
      method: "put",
      params: { id: id },
      body: body,
    });
  }

  async function getUserDetails(id: string | null) {
    return await $fetch(userDetailsUrl, {
      method: "get",
      params: { id: id },
    });
  }

  async function postUserDetails(values: any) {
    return await useFetch(userDetailsUrl, {
      method: "post",
      body: values,
    });
  }

  async function setUserDetails(body: {}) {
    return await $fetch(userDetailsUrl, {
      method: "post",
      body: body,
    });
  }

  async function getRescuePassword(token: string) {
    return $fetch(tokenUrl, {
      method: "get",
      params: { token: token },
    });
  }

  async function deleteUser(id: string, anonymousUser: {}) {
    return await $fetch(`${userUrl}/delete`, {
      method: "delete",
      body: anonymousUser,
      params: { id: id },
    });
  }

  return {
    findUserByEmail,
    createUser,
    setUser,
    getUserDetails,
    postUserDetails,
    setUserDetails,
    getRescuePassword,
    deleteUser,
  };
};
