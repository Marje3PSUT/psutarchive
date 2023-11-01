<template>
  <div
    :data-theme="useTheme().value"
    :dir="head.htmlAttrs?.dir"
    :lang="head.htmlAttrs?.lang"
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
<script setup lang="ts">
  const { locale } = useI18n()
  const head = useLocaleHead({
    addDirAttribute: true,
    addSeoAttributes: true,
  })
  useHead({
    htmlAttrs: {
      lang: locale.value,
    },
  })
  const config = useRuntimeConfig()

  // Get theme and language from browser
  onMounted(() => {
    if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
      useTheme().value = 'dark'
    }
    else {
      useTheme().value = 'light'
    }
    if (navigator.language.includes('ar')) {
      const switchLocalePath = useSwitchLocalePath()
      navigateTo(switchLocalePath('ar'), {
        replace: true
      })
    }
    // listen to browser theme changes
    window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', event => {
      useTheme().value = event.matches ? "dark" : "light";
    });
  })
</script>
<style lang="postcss">
  body, #__nuxt, #__layout, #__nuxt > div {
    @apply min-h-screen h-full w-full;
  }
  #main {
    margin-bottom: auto;
  }
</style>
