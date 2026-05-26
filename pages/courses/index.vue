<script setup lang="ts">
import { type Query } from '@directus/sdk';
import _ from 'lodash';
import { debouncedRef } from '@vueuse/core';
import { Course, Schema } from 'types/schema';

const { $directus, $readItems } = useNuxtApp();
const { t, locale } = useI18n();

const filters = useCoursesFilters();
filters.initFromUrl();

const pageTitle = computed(() => `${t('courses.title')} - ${t('psutarchive')}`);

useHead(() => ({
  title: pageTitle.value,
}));

const sortOptions = ref<{ key: string; title: string }[]>([
  {
    key: 'alphabetical',
    title: t('courses.sort.alphapetical'),
  },
  {
    key: 'id',
    title: t('courses.sort.id'),
  },
]);

const listView = computed(() => filters.view.value === 'list');

const stateChange = ref<number>(0);
const stateChangeDebounced = debouncedRef(stateChange, 100);

const switchTab = (i: number) => {
  const slug = tabsList.value?.[i]?.value;
  if (slug && slug !== filters.categorySlug.value) {
    filters.categorySlug.value = slug;
    filters.page.value = 0;
  }
};

// Get categories tabs
const { data: categories } = useLazyAsyncData(() =>
  $directus.request(
    $readItems('category', {
      sort: 'sort',
    }),
  ),
);

const tabsList = computed(() => {
  if (!categories.value) return [];

  const tabs = categories.value!.map((item) => {
    return {
      title: locale.value === 'en' ? item?.name_en : item?.name_ar,
      value: item?.slug,
    };
  });

  tabs?.unshift({
    title: t('home.categories.all'),
    value: 'all',
  });

  return tabs;
});

const activeTabIndex = computed(() => {
  if (!tabsList.value) return 0;
  const idx = tabsList.value.findIndex((t) => t.value === filters.categorySlug.value);
  return idx >= 0 ? idx : 0;
});

const query = computed<Query<Schema, Course>>(
  (): Query<Schema, Course> => ({
    // @ts-ignore
    fields: [
      'id',
      'name_en',
      'name_ar',
      'count(resource)',
      'count(links)',
      'course_id',
      'category.category_id.name_en',
      'category.category_id.name_ar',
      'category.category_id.color',
    ],

    page: filters.page.value + 1,
    limit: 18,
    filter: {
      category:
        filters.categorySlug.value === 'all'
          ? undefined
          : {
              category_id: {
                slug: {
                  _eq: filters.categorySlug.value,
                },
              },
            },
      _or: filters.search.value
        ? [
            {
              name_en: {
                _icontains: filters.search.value,
              },
            },
            {
              name_ar: {
                _icontains: filters.search.value,
              },
            },
            {
              alt_names: {
                _icontains: filters.search.value,
              },
            },
            {
              course_id: {
                _icontains: filters.search.value,
              },
            },
          ]
        : undefined,
      ...(filters.res.value === 'yes'
        ? {
            _and: [
              {
                _or: [
                  {
                    'count(resource)': {
                      _gt: 0,
                    },
                  },
                  {
                    'count(links)': {
                      _null: false,
                    },
                  },
                ],
              },
            ],
          }
        : {}),
    },
    sort: filters.sort.value === 'id' ? 'course_id' : locale.value === 'en' ? 'name_en' : 'name_ar',
  }),
);

const {
  data: courses,
  pending,
  error,
} = useLazyAsyncData('courses', () => $directus.request($readItems('course', query.value)), {
  watch: [stateChangeDebounced],
});

const { data: recordCount } = useLazyAsyncData(
  'courseCount',
  () =>
    $directus.request(
      $readItems('course', {
        ..._.pick(query.value, ['filter']),
        aggregate: { countDistinct: 'id' },
      }),
    ),
  { watch: [stateChangeDebounced] },
);

const pageCount = computed(() => {
  if (!recordCount.value) return 0;
  return Math.ceil(recordCount.value![0].countDistinct.id / 18);
});

watch(
  [filters.search, filters.categorySlug, filters.page, filters.sort, filters.view, filters.res],
  () => {
    stateChange.value = (stateChange.value + 1) % 999;
    navigateTo({
      query: {
        query: filters.search.value ? encodeURIComponent(filters.search.value) : '',
        category: filters.categorySlug.value,
        page: String(filters.page.value + 1),
        sort: filters.sort.value,
        view: filters.view.value,
        res: filters.res.value,
      },
      replace: true,
    });
  },
);
</script>

<template>
  <div class="container mx-auto">
    <List
      show-search
      show-sort
      :initial-search="filters.search.value"
      :initial-value="filters.sort.value"
      :view="listView ? 'flex' : 'auto'"
      :heading="$t('courses.title')"
      :sort-options="sortOptions"
      :tabs="tabsList"
      :active-tab="activeTabIndex"
      :pagination="{
        end: pageCount,
        active: filters.page.value + 1,
      }"
      @sorted="(key: string) => { filters.sort.value = key; filters.page.value = 0 }"
      @searched="(q: string) => { filters.search.value = q; filters.page.value = 0 }"
      @active-page="(p: number) => (filters.page.value = p - 1)"
      @active-tab="(i: number) => switchTab(i)"
      @switch-view="filters.view.value = listView ? 'grid' : 'list'"
    >
      <template #list-option>
        <div class="form-control">
          <label class="label cursor-pointer gap-2">
            <span class="label-text">
              {{ $t('lists.filter.resources') }}
            </span>
            <input
              :checked="filters.res.value === 'yes'"
              type="checkbox"
              class="toggle toggle-accent"
              @change="filters.res.value = filters.res.value === 'yes' ? 'no' : 'yes'; filters.page.value = 0"
            />
          </label>
        </div>
      </template>
      <template v-if="pending">
        <CourseSkeleton v-for="index in 9" :key="index" />
      </template>
      <template v-else>
        <CourseCard
          v-for="item in courses"
          :id="item.id"
          :key="item.id"
          :item="item as Course"
          :res-count="item.resource_count"
          :links-count="item.links_count"
          :class="{ list: listView }"
        />
      </template>
      <template v-if="!pending" #message>
        <UIMessage
          v-if="!error && courses?.length === 0"
          :message="$t('messages.no-data.course')"
          class="!bg-base-300 !text-base-content max-w-max mx-auto"
        />
        <UIMessage v-if="error" :message="$t('messages.error')" class="max-w-max mx-auto" type="error" />
      </template>
    </List>
  </div>
</template>
