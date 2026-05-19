<script setup>
import DefaultTheme from 'vitepress/theme'
import AiAssistant from './AiAssistant.vue'
</script>

<template>
  <DefaultTheme.Layout>
    <template #layout-bottom>
      <AiAssistant />
    </template>
  </DefaultTheme.Layout>
</template>
