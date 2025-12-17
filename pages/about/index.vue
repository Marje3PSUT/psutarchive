<!-- eslint-disable vue/no-v-html -->
<script setup lang="ts">
const { locale } = useI18n();
const { $directus, $readItem } = useNuxtApp();

const { data: about } = await useAsyncData(async () => {
  return await $directus.request($readItem('about_page', 1));
});
</script>

<template>
  <div class="about-page container mx-auto" v-html="locale === 'en' ? about?.page_en : about?.page_ar" />
</template>

<style lang="postcss">
.about-page {
  h1,
  h2,
  h3 {
    @apply my-4;
  }

  h2 {
    @apply my-8;
  }

  li {
    @apply list-item my-2;
  }

  ul {
    @apply list-disc list-inside my-5;
  }

  strong {
    @apply font-extrabold;
  }

  a {
    @apply link link-hover text-accent;
  }
}
</style>
