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
        v-for="cat in categories?.data"
        :key="cat.id"
        class="card max-h-24 shadow-xl border max-md:w-40 flex-1 grow w-36 min-w-[9rem]"
        :class="`hover:bg-${cat.attributes.slug.toUpperCase()} border-${cat.attributes.slug.toUpperCase()}`"
        :to="$nuxt.$localePath({ name: 'courses', query: { category: cat.attributes.slug.toLowerCase()}})"
      >
        <div class="card-body p-4 font-bold justify-center items-center text-center">
          {{ locale === "en" ? cat.attributes.name : cat.attributes.name_ar }}
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
          v-for="item in favCourses?.data"
          :id="item.id"
          :key="item.id"
          :item="item.attributes"
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
  import qs from 'qs';
  const { locale } = useI18n();

  const { data: categories, pending } = useLazyAsyncData<
    StrapiResponse<CategoryAttributes>
  >(() => $baseApi("categories", { cache: true }));

  // Get the list of favorite courses
  const favList = ref<number[] | null>([])
  const favQuery = reactive({
    populate: ['resources'],
    filters: computed(() => {
      if (favList.value && favList.value.length > 0)
        return {
          id: {
            $in: favList.value
          }
        } as StrapiRestFilters<StrapiItem<CourseAttributes>>
      else return null
    })
  })

  const { data: favCourses, pending: favPending } =
    await useLazyAsyncData(async (): Promise<StrapiResponse<CourseAttributes> | undefined> => {
    if (favQuery.filters) {
      // fetch favorite courses only if they exist
      return await $baseApi(`courses?${qs.stringify(favQuery, { encodeValuesOnly: true })}`, { cache: true })
    }
    else return
  }, {
    watch: [favQuery]
  });

  onMounted(() => {
    const { getCourses } = useFavCourses()
    favList.value = getCourses()
  })
</script>
