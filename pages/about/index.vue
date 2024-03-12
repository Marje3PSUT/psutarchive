<!-- eslint-disable vue/no-v-html -->
<template>
  <div
    class="about-page container mx-auto"
    v-html="
      locale === 'en'
        ? about?.data.attributes.page_en
        : about?.data.attributes.page_ar
    "
  />
</template>

<script setup lang="ts">
const { locale } = useI18n();
const { data: about } = await useAsyncData<
  StrapiResponseSingle<AboutAttributes>
>(async () => {
  return $baseApi("about-page");
});
</script>

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
    @apply link link-hover text-secondary;
  }
}
</style>
