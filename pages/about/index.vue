<!-- eslint-disable vue/no-v-html -->
<template>
  <div
    class="container mx-auto"
    v-html="locale === 'en' ? about?.data.attributes.page_en : about?.data.attributes.page_ar"
  />
</template>

<script setup lang="ts">
const { locale } = useI18n();

const { data: about } =
  await useAsyncData<StrapiResponseSingle<AboutAttributes>>(async () => {
  return $baseApi('about-page');
});
</script>
