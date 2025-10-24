<template>

  <div class="layout">
    <div ref="template" class="template" lang="en" dir="ltr">
      <html lang="en" dir="ltr">

      <body style="width: 100%; ">
        <div class="main"
          style="background-color: rgba(28, 31, 38, 1); justify-content: center; text-align: center;height: 400px;">
          <div class="img" style="display:flex; justify-content:center;">
            <img :src="cordariaLogo" alt="Cordaria"
              style="width: auto; height: auto; display: flex; justify-content:center; margin: 30px;">

          </div>
          <h1 style="margin:20px; color: rgba(255,255,255,0.8);">Bem vindo a nossa plataforma <strong>{{ getUserName
              }}</strong>!</h1>
          <p style="color: rgba(255,255,255,0.8)"><strong>Obrigado</strong> por se cadastrar. Estamos felizes em ter
            você conosco!</p>
          <p style="color: rgba(255,255,255,0.8)">Ah! E não se equeça de seguir nossas páginas no <a
              href="https://instagram.com/cordaria.app">Instagram</a>
            e
            no
            <a href="https://facebook.com/cordaria.app">Facebook</a>.
          </p>
          <p style="color: rgba(255,255,255,0.8)"><strong><a href="/report-spam">Não foi você? clique aqui</a></strong>
            para que possamos
            proteger seus dados.
          </p>
          <p style="color: rgba(255,255,255,0.8)">Se você tiver alguma dúvida, sugestão ou qualquer problema que estiver
            enfrentando para acessar e usar nossa plataforma,<br />não hesite em entrar em contato conosco. pelo email
            <a href="mailto:cordaria.app@gmail.com">cordaria.app@gmail.com</a>.
          </p>
        </div>
      </body>

      </html>

    </div>
  </div>
</template>

<script lang="ts" setup>
import { useSmtp } from '~/composables/smtp';
import cordariaLogo from '~/assets/imgs/logo-cordaria-disabled.png'

defineExpose({ sendEmail })

const template = ref() as Ref<HTMLElement>
const { getUserName, getEmail } = storeToRefs(useMyUserStore())

/**
 * Sends a welcome email using SMTP.
 *
 * This function uses the `useSmtp` composable to send an email with a welcome message.
 * The email content is retrieved from the `template` element's innerHTML.
 *
 * @returns {Promise<void>} A promise that resolves when the email is sent.
 */
async function sendEmail() {
  return await useSmtp().sendEmail(getEmail.value, 'Mensagem de boas vindas - Cordaria App!', template.value.innerHTML)
}

</script>
