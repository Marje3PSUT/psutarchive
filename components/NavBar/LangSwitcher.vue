<template>
  <NuxtLink
    class="me-2"
    :to="locale === 'en' ? switchLocalePath('ar') : switchLocalePath('en')"
  >
    {{ locale === 'en' ? 'العربية' : 'English' }}
  </NuxtLink>
</template>
<script setup>
  const { locale } = useI18n();
  const switchLocalePath = useSwitchLocalePath()
</script>
