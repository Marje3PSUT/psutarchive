<template>
  <div
    :data-theme="useTheme().value"
    :dir="head.htmlAttrs.dir"
    :lang="head.htmlAttrs.lang"
  >
    <LazyDevDeployInfo v-if="config.public.env === 'dev'" />
    <NuxtLoadingIndicator />
    <UINavBar />
    <slot />
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
  body, #__nuxt, #__layout, #__nuxt > div {
    @apply min-h-screen h-full w-full;
  }
</style>