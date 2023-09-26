<template>
  <div
    :data-theme="useTheme().value"
    :dir="head.htmlAttrs.dir"
    :lang="head.htmlAttrs.lang"
    class="flex flex-col"
  >
    <a
      href="#main"
      class="absolute right-full p-2 opacity-0 focus:left-0 focus:opacity-100 min-w-max bg-base-100 focus:border-2 border-neutral"
    >
      Skip to content
    </a>
    <LazyDevDeployInfo v-if="config.public.env === 'development'" />
    <NuxtLoadingIndicator />
    <UINavBar />
    <main id="main">
      <slot />
    </main>
    <UIFooter />
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