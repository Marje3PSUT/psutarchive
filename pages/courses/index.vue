<script setup lang="ts">
import { type Query, type QuerySort } from '@directus/sdk';
import _ from 'lodash';
import { debouncedRef } from '@vueuse/core';
import { Course, Schema } from 'types/schema';

const route = useRoute();
const { $directus, $readItems } = useNuxtApp();
const { t, locale } = useI18n();

const sortOptions = ref<{ key: QuerySort<Schema, Course>; title: string }[]>([
  {
    key: locale.value === 'en' ? 'name_en' : 'name_ar',
    title: t('courses.sort.alphapetical'),
  },
  {
    key: 'course_id',
    title: t('courses.sort.id'),
  },
]);

const state = reactive({
  search: undefined,
  activeSort: sortOptions.value[0].key,
  activePage: 1,
  listView: false,
  activeTab: 0,
  withResourcesOnly: true, // filter courses that only have resources
  // activeFilters: undefined as ActiveFilters | undefined,
});

const stateChange = ref<number>(0);

watch(state, () => {
  stateChange.value = (stateChange.value + 1) % 999;
});

const stateChangeDebounced = debouncedRef(stateChange, 700);

const switchTab = (t: number) => {
  state.activeTab = t;
  state.activePage = 1;
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

const query = computed<Query<Schema, Course>>(
  (): Query<Schema, Course> => ({
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

    page: state.activePage,
    limit: 18,
    filter: {
      category:
        !route.query.category || route.query.category === 'all'
          ? undefined
          : {
              category_id: {
                slug: {
                  _eq: route.query.category,
                },
              },
            },
      _or: state?.search
        ? [
            {
              name_en: {
                _icontains: state.search,
              },
            },
            {
              name_ar: {
                _icontains: state.search,
              },
            },
            {
              alt_names: {
                _icontains: state.search,
              },
            },
            {
              course_id: {
                _icontains: state.search,
              },
            },
          ]
        : undefined,
      ...(state.withResourcesOnly
        ? {
            'count(resource)': {
              _gt: 0, // Check if count of resources is > 0
            },
          }
        : {}),
    },
    sort: state.activeSort ?? sortOptions.value[0].key,
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

// Change tab based on url query, and vice versa
watch(state, () => {
  return navigateTo({
    query: {
      category: tabsList.value ? tabsList.value[state.activeTab].value : undefined,
    },
    replace: true,
  });
});

onMounted(() => {
  const tabs = tabsList.value?.map((i) => i.value);

  if (route.query.category && tabs?.includes(route.query.category as string)) {
    state.activeTab = tabs?.indexOf(route.query.category as string);
  }
});
</script>

<template>
  <div class="container mx-auto">
    <List
      show-search
      show-sort
      :view="state.listView ? 'flex' : 'auto'"
      :heading="$t('courses.title')"
      :sort-options="sortOptions"
      :tabs="tabsList"
      :active-tab="state.activeTab"
      :pagination="{
        end: pageCount,
        active: state.activePage,
      }"
      @sorted="(s: QuerySort<Schema, Course>) => (state.activeSort = s)"
      @searched="(q) => (state.search = q)"
      @active-page="(p) => (state.activePage = p)"
      @active-tab="(t) => switchTab(t)"
      @switch-view="state.listView = !state.listView"
    >
      <template #list-option>
        <div class="form-control">
          <label class="label cursor-pointer gap-2">
            <span class="label-text">
              {{ $t('lists.filter.resources') }}
            </span>
            <input
              v-model="state.withResourcesOnly"
              type="checkbox"
              class="toggle toggle-secondary"
              @change="state.activePage = 1"
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
          :res-count="parseInt(item.resource_count as unknown as string)"
          :class="{ list: state.listView }"
        />
      </template>
      <template v-if="!pending" #message>
        <!-- no data info message -->
        <UIMessage
          v-if="!error && courses?.length === 0"
          :message="$t('messages.no-data.course')"
          class="!bg-base-300 !text-base-content max-w-max mx-auto"
        />

        <!-- error message -->
        <UIMessage v-if="error" :message="$t('messages.error')" class="max-w-max mx-auto" type="error" />
      </template>
    </List>
  </div>
</template>
