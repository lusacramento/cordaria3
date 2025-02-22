<template>

  <div class="layout">
    <div ref="template" class="template" lang="en" dir="ltr">
      <html lang="en" dir="ltr">

      <body style="width: 100%; color: rgba(255,255,255,0.8); ">
        <div class="main"
          style="background-color: rgba(28, 31, 38, 1); justify-content: center; text-align: center;height: 400px;">
          <div class="img" style="display:flex; justify-content:center;">
            <img :src="cordariaLogo" alt="Cordaria"
              style="width: auto; height: auto; display: flex; justify-content:center; margin: 30px;">

          </div>
          <h1 style="margin:20px;">Bem vindo a nossa plataforma <strong>{{ getUserName
          }}</strong>!</h1>
          <p>Obrigado por se cadastrar. Estamos felizes em ter você conosco!</p>
          <p>Ah! E não se equeça de seguir nossas páginas no <a href="https://instagram.com/cordaria.app">Instagram</a>
            e
            no
            <a href="https://facebook.com/cordaria.app">Facebook</a>.
          </p>
          <p>Qualquer problema que estiver enfrentando para acessar e usar nossa plataforma, pode entrar em contato pelo
            nosso <a href="mailto:cordaria.app@gmail.com">email</a>.</p>
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

async function sendEmail() {
  return await useSmtp().sendEmail(getEmail.value, 'Mensagem de boas vindas - Cordaria App!', template.value.innerHTML)
}

</script>
