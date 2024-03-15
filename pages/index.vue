<script setup lang="ts">
import { Course } from 'types/schema';

const { locale } = useI18n();
const { $directus, $readItems } = useNuxtApp();

const favList = ref<number[]>([]);

const { data: categories, pending } = useLazyAsyncData('categories', () =>
  $directus.request(
    $readItems('category', {
      sort: 'sort',
    }),
  ),
);

const { data: favCourses, pending: favPending } = useLazyAsyncData(
  'favCourses',
  async () => {
    if (!(favList.value.length === 0)) {
      return await $directus.request(
        $readItems('course', {
          // @ts-ignore
          fields: [
            'id',
            'name_en',
            'name_ar',
            'count(resource)',
            'course_id',
            'category.category_id.name_en',
            'category.category_id.name_ar',
            'category.category_id.color',
          ],
          filter: {
            id: {
              _in: favList.value,
            },
          },
        }),
      );
    }
  },
  {
    watch: [favList],
  },
);

onMounted(() => {
  const { getCourses } = useFavCourses();
  favList.value = getCourses();
});
</script>

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
        icon: true,
      }"
    >
      <NuxtLink
        v-for="cat in categories"
        :key="cat.id"
        class="card max-h-24 shadow-xl border max-md:w-40 flex-1 grow w-36 min-w-[9rem]"
        :style="{ borderColor: cat.color }"
        :to="$nuxt.$localePath({ name: 'courses', query: { category: cat.slug } })"
      >
        <div class="card-body p-4 font-bold justify-center items-center text-center">
          {{ locale === 'en' ? cat.name_en : cat.name_ar }}
        </div>
      </NuxtLink>
    </List>
    <!-- Favorite courses list -->
    <div class="divider my-10" />
    <ClientOnly>
      <List :pending="favPending" :heading="$t('courses.favorite')">
        <template v-if="favCourses">
          <CourseCard
            v-for="item in favCourses"
            :id="item.id"
            :key="item.id"
            :item="item as Course"
            :res-count="item.resource_count"
            class="border-base-content hover:bg-base-content hover:bg-opacity-10"
          />
        </template>
        <div v-else>
          {{ $t('courses.noFavsMsg') }}
        </div>
      </List>
    </ClientOnly>
  </div>
</template>
