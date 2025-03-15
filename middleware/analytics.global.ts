export default defineNuxtRouteMiddleware(async (to, from) => {
  const isShowCountdown = stringToBoolean(
    await useRuntimeConfig().public.isShowCountdown
  );

  console.log(typeof isShowCountdown);
  if (isShowCountdown) {
    if (useCountDown().isLanched()) {
      return;
    }
    if (to.path === "/lancamento") {
      return;
    }

    return navigateTo("/lancamento", { redirectCode: 302 });
  }

  return;

  function stringToBoolean(string: string) {
    return string.toLowerCase() === "true";
  }
});
