<template>
  <div class="layout">
    <div ref="template" class="template" lang="en" dir="ltr">
      <html lang="en" dir="ltr">

      <body style="width: 100%; color: rgba(255,255,255,0.8); ">
        <div class="main"
          style="background-color: rgba(28, 31, 38, 1); justify-content: center; text-align: center;height: 400px;">
          <div class="img" style="display:flex; justify-content:center;">
            <img :src="cordariaLogo" alt="Cordaria" style="width: auto; height: auto; 
              display: flex; justify-content:center; margin: 30px;">

          </div>
          <h1 style="margin:20px;">Recuperação de Senha</h1>
          <p>
            Olá <strong>{{ getUserName }}</strong>! <a style="color:brown" :href="getRescueUrl">Clique aqui para
              recuperar
              sua
              senha</a>.
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
const { getUserName, getEmail, getRescueUrl } = storeToRefs(useMyUserStore())

async function sendEmail() {
  const to = getEmail.value
  const subject = 'Recuperação de senha - Cordaria App'

  return await useSmtp().sendEmail(to, subject, template.value.innerHTML)
}

</script>
