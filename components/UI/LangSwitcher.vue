<script setup>
const { locale } = useI18n();
const switchLocalePath = useSwitchLocalePath();
</script>

<template>
  <NuxtLink
    class="me-2"
    :to="locale === 'en' ? switchLocalePath('ar') : switchLocalePath('en')"
    :dir="locale === 'en' ? 'rtl' : 'ltr'"
    replace
  >
    {{ locale === 'en' ? 'العربية' : 'English' }}
  </NuxtLink>
</template>
