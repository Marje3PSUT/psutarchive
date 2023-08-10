<template>
  <div
    :data-theme="useTheme().value"
    class="w-screen h-screen"
    :dir="locale == 'ar' ? 'rtl' : 'ltr'"
  >
    <UINavBar />
    <NuxtPage />
  </div>
</template>
<script setup>
const { locale } = useI18n();
</script>
