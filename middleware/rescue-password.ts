import type { RescuePassword } from "~/types/RescuePassword";

export default defineNuxtRouteMiddleware(async (to, from) => {
  const query = await to.query;
  if (!query.token) return;
  if (query.token) {
    const tokenResponse = (await useMyUserStore().getToken(
      query.token.toString()
    )) as unknown as RescuePassword;

    if (!tokenResponse) {
      showToast(
        "Token inexistente",
        "Por favor, informe novamente seu email.",
        "error"
      );
      isShowEmailModal.value = await true;
      isLoaded.value = true;
      return;
    }

    if (await useHelpers().isExpiredToken(tokenResponse.expiresAt)) {
      showToast(
        "Token expirado",
        "Por favor, informe novamente seu email.",
        "error"
      );
      isShowEmailModal.value = await true;
      isLoaded.value = true;

      return;
    }

    showToast("Token válido", "Por favor, informe uma nova senha.", "warn");

    isShowPasswordModal.value = await true;
    isLoaded.value = true;

    return;
  }
  isShowEmailModal.value = await true;
  isLoaded.value = true;
});
