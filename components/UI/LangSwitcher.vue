<template>
  <!-- FIXME: when we switch language, it should replace the route, not push to it -->
  <NuxtLink
    class="me-2"
    :to="locale === 'en' ? switchLocalePath('ar') : switchLocalePath('en')"
    :dir="locale === 'en' ? 'rtl' : 'ltr'"
  >
    {{ locale === 'en' ? 'العربية' : 'English' }}
  </NuxtLink>
</template>
<script setup>
  const { locale } = useI18n();
  const switchLocalePath = useSwitchLocalePath()
</script>
