<template>
  <div class="container mx-auto">
    <List
      show-search
      :view="state.listView ? 'flex' : 'auto'"
      :heading="$t('courses.title')"
      :sort-options="sortOptions"
      :tabs="tabsList"
      :active-tab="state.activeTab"

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
              {{ $t("lists.filter.resources") }}
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
        <UIMessage
          v-if="error"
          :message="$t('messages.error')"
          class="max-w-max mx-auto"
          type="error"
        />
      </template>
    </List>
  </div>
</template>
<script setup lang="ts">
import { Query, QuerySort } from "@directus/sdk";
import { Course, Schema } from "types/schema";
const route = useRoute();
const { $directus, $readItems } = useNuxtApp();
const { t, locale } = useI18n();

const state = reactive({
  search: undefined,
  activeSort: "course_id" as QuerySort<Schema, Course>,
  activePage: 1,
  listView: false,
  activeTab: 0,
  withResourcesOnly: true, // filter courses that only have resources
  // activeFilters: undefined as ActiveFilters | undefined,
});

const switchTab = (t: number) => {
  state.activeTab = t;
  state.activePage = 1;
};

// Get categories tabs
const { data: categories } = useLazyAsyncData(() =>
  $directus.request(
    $readItems("category", {
      sort: "sort",
    })
  )
);

const tabsList = computed(() => {
  const tabs = categories.value!.map((item) => {
    return {
      title: locale.value === "en" ? item?.name_en : item?.name_ar,
      value: item?.slug,
    };
  });
  tabs?.unshift({
    title: t("home.categories.all"),
    value: "all",
  });
  return tabs;
});

// sort keys that start with '!' are handled locally, not from the API
const sortOptions = ref<{ key: QuerySort<Schema, Course>; title: string }[]>([
  //{
  //  key: 'updatedAt:desc',
  //  title: t('courses.sort.last-updated')
  //},
  {
    key: locale.value === "en" ? "name_en" : "name_ar",
    title: t("courses.sort.alphapetical"),
  },
  {
    key: "category",
    title: t("courses.sort.category"),
  },
]);

const query = reactive<Query<Schema, Course>>({
  // @ts-ignore
  fields: ["*", "category.category_id.*"],

  offset: (state.activePage - 1) * 18,
  limit: 18,
  filter: {
    category: {
      category_id: {
        slug: {
          _eq: route.query.category === 'all' ? undefined : route.query.category,
        },
      },
    },
    /*
        'count(resource)': {
          _nempty: state.withResourcesOnly
        },
        */
    // search query
    _or: state?.search
      ? [
          {
            name_en: {
              _contains: state?.search,
            },
          },
          {
            name_ar: {
              _contains: state?.search,
            },
          },
          {
            alt_names: {
              _contains: state?.search,
            },
          },
          {
            course_id: {
              _contains: state?.search,
            },
          },
        ]
      : undefined,
  },
  sort: state.activeSort
    ? state.activeSort
    : sortOptions.value[0].key /* Default sort option,*/,
});

const { data: courses, pending, error } = useLazyAsyncData(() => $directus.request($readItems("course", query)), { watch: [query] });

const { data: recordCount } = useLazyAsyncData(() => $directus.request($readItems("course", { ...query, aggregate: { count: "*" }})), { watch: [query] });
/*
  const list = computed(() => {
    if (((state?.activeSort as unknown as string)?.startsWith('!'))) {
      // sort by resources count
      if (state.activeSort === sortOptions.value[1].key) {
        return courses.value?.sort((a, b) =>
          (b.resource?.length as number) - (a.resource?.length as number))
      }
    }
    return courses.value
  })
*/
// Change tab based on url query, and vice versa
watch(state, () => {
  return navigateTo({
    query: {
      category: tabsList.value
        ? tabsList.value[state.activeTab].value
        : undefined,
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
