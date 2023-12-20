<template>
  <div
    :data-theme="useTheme().value"
    :dir="head.htmlAttrs?.dir"
    :lang="head.htmlAttrs?.lang"
    class="flex flex-col"
  >
    <a
      href="#main"
      class="skip-to-content"
    >
      Skip to content
    </a>
    <NuxtLoadingIndicator />
    <LazyDevDeployInfo v-if="config.public.env === 'development'" />

    <!-- Announcements -->
    <LazyHomeAnnouncement
      v-if="!pending && announcements.list?.length"
      :id="announcements?.list[0].id"
      :data="announcements?.list[0].attributes"
    />

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

  const announcements = reactive({
    hiddenList: [] as number[],
    list: [] as StrapiItem<AnnouncementAttributes>[],
  })

  const { data, pending } = await useLazyAsyncData(async (): Promise<StrapiResponse<AnnouncementAttributes>> => 
    await $baseApi(`announcements`, { cache: true })
  )
 
  onMounted(() => {
    // Get theme and language from browser
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

    // Get list of hidden announcements from localStorage and filter them out
    const { getHidden } = useAnnouncements()
    announcements.hiddenList = getHidden() || []
    announcements.list = data.value?.data.filter(i => !announcements.hiddenList?.includes(i.id)) || []
  })
</script>
<style lang="postcss">
  body, #__nuxt, #__layout, #__nuxt > div {
    @apply min-h-screen h-full w-full;
  }
  #main {
    margin-bottom: auto;
  }
  .skip-to-content {
    @apply fixed right-full focus:left-0 z-50;
    @apply opacity-0 focus:opacity-100;
    @apply p-2 min-w-max border-neutral focus:border-2;
    @apply bg-base-content text-base-100;
  }
</style>
