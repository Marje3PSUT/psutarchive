<template>
  <div class="container mx-auto">
    <!-- <ListSearch />
    <HomeCategoriesList /> -->
    <List
      :pending="pending"
      view="flex"
      :heading="$t('home.categories.title')"
      class="mx-auto flex-row flex-wrap gap-4"
      :heading-link="{
        to: $nuxt.$localePath('/courses'),
        text: $t('home.categories.all'),
        icon: true
      }"
    >
      <NuxtLink
        v-for="cat in categories?.data"
        :key="cat.id"
        class="card max-h-24 shadow-xl border max-md:w-40"
        :class="`hover:bg-${cat.attributes.slug.toUpperCase()} border-${cat.attributes.slug.toUpperCase()}`"
        :to="$nuxt.$localePath({ name: 'courses', query: { category: cat.attributes.slug.toLowerCase()}})"
      >
        <div class="card-body p-4 font-bold justify-center items-center text-center">
          {{ locale === "en" ? cat.attributes.name : cat.attributes.name_ar }}
        </div>
      </NuxtLink>
    </List>
  </div>
</template>
<script setup lang="ts">
  const { locale } = useI18n();
  const { data: categories, pending } = useLazyAsyncData<
    StrapiResponse<CategoryAttributes>
  >(() => $baseApi("categories", { cache: true }));
</script>
