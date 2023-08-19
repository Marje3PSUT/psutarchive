<template>
  <div
    :data-theme="useTheme().value"
    :dir="head.htmlAttrs.dir"
    :lang="head.htmlAttrs.lang"
  >
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
</script>
<style>
  html, body, #__nuxt, #__nuxt > div {
    height: 100%;
  }
</style>