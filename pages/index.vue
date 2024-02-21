<template>
  <div class="container mx-auto">
    <List
      :pending="pending"
      view="flex"
      :heading="$t('home.categories.title')"
      class="mx-auto !flex-row flex-wrap gap-4"
      :heading-link="{
        to: $nuxt.$localePath('/courses'),
        text: $t('home.categories.all'),
        icon: true
      }"
    >
      <NuxtLink
        v-for="cat in categories"
        :key="cat.id"
        class="card max-h-24 shadow-xl border max-md:w-40 flex-1 grow w-36 min-w-[9rem]"
        :class="`hover:bg-${cat.slug.toUpperCase()} border-${cat.slug.toUpperCase()}`"
        :to="$nuxt.$localePath({ name: 'courses', query: { category: cat.slug }})"
      >
        <div class="card-body p-4 font-bold justify-center items-center text-center">
          {{ locale === "en" ? cat.name_en : cat.name_ar }}
        </div>
      </NuxtLink>
    </List>
    <!-- Favorite courses list -->
    <div class="divider my-10" />
    <List
      :pending="favPending"
      :heading="$t('courses.favorite')"
    >
      <template v-if="favCourses">
        <CourseCard
          v-for="item in favCourses"
          :id="item.id"
          :key="item.id"
          :item="item"
          class="border-base-content hover:bg-base-content hover:bg-opacity-10"
        />
      </template>
      <div v-else>
        {{ $t('courses.noFavsMsg') }}
      </div>
    </List>
  </div>
</template>
<script setup lang="ts">
  const { locale } = useI18n();
  const { $directus, $readItems } = useNuxtApp()

  const favList = ref<number[]>([])
  
  const { data: categories, pending } = useLazyAsyncData(() => $directus.request($readItems('category', {
    sort: 'sort'
  })))

  const { data: favCourses, pending: favPending } = useLazyAsyncData(async () => {
    if (!(favList.value.length == 0)){
      return $directus.request($readItems('course', {
        // @ts-ignore
        fields: ['*', 'category.category_id.*'],
        filter: {
          'id': {
            '_in': favList.value
          }
        }
      }))
    }
  }, {
    watch: [favList]
  })

  onMounted(() => {
    const { getCourses } = useFavCourses()
    favList.value = getCourses()
  })
</script>
