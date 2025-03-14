export default defineNuxtRouteMiddleware((to, from) => {
  if (useCountDown().isLanched()) {
    return;
  }
  if (to.path === "/lancamento") {
    return;
  }

  return navigateTo("/lancamento", { redirectCode: 302 });
});
