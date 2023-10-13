<template>
  <div class="container mx-auto">
      <div v-html="locale === 'en' ? aboutPageData.page_en : aboutPageData.page_ar"></div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue';
import { useI18n } from 'vue-i18n';

const { locale } = useI18n();

const aboutPageData = ref<{ page_en: string, page_ar: string }>({ page_en: '', page_ar: '' });

const fetchData = async () => {
  const response = await $baseApi('about-page');
  if (response && response.data) {
    aboutPageData.value = response.data.attributes;
  }
};

// Call when mounted
onMounted(fetchData);
</script>
