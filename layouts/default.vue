<template>
  <div
    :data-theme="useTheme().value"
    :dir="head.htmlAttrs.dir"
    :lang="head.htmlAttrs.lang"
  >
    <NuxtLoadingIndicator />
    <UINavBar />
    <slot />
    <LazyDevDeployInfo v-if="config.public.env === 'dev' " />
  </div>
</template>
<script setup>
  const head = useLocaleHead({
    addDirAttribute: true,
    addSeoAttributes: true,
  })
  const config = useRuntimeConfig()
</script>
<style>
  html, body, #__nuxt, #__nuxt > div {
    height: 100%;
  }
</style>