<template>
  <div id="released" class="release">

    <LayoutsHeader>
      <template #center>
        <div class="d-flex justify-content-center align-items-center">
        </div>
      </template>
    </LayoutsHeader>
    <div class="container content d-flex align-items-center justify-content-center">
      <CountDown />
    </div>
  </div>
</template>

<script lang="ts" setup>
definePageMeta({
  title: 'Lançamento',
  description: 'Página de lançamento',
  layout: 'clean'
})

import CountDown from '~/components/layouts/CountDown.vue';
</script>