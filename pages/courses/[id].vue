<script setup lang="ts">
import { type Query, type QuerySort } from '@directus/sdk';
import { debouncedRef } from '@vueuse/core';
import _ from 'lodash';
import { Course, Resource, Schema } from 'types/schema';

definePageMeta({
  // course id parameter must be a 5-digit number
  validate: (route) => /^\d{5}$/.test(route.params.id.toString()),
});

const { locale, t } = useI18n();
const { $directus, $readItems } = useNuxtApp();
const urlId = ref(useRoute().params.id as string);
const route = useRoute();

const sortOptions = ref<{ key: QuerySort<Schema, Resource>; title: string }[]>([
  {
    title: t('material.sort.year'),
    key: '-year',
  },
]);

const state = reactive({
  search: undefined as string | undefined,
  activeSort: sortOptions.value[0].key,
  activeTab: 0, // index of active tab
  activePage: 1,
  // activeFilters: undefined as ActiveFilters | undefined,
});

const listView = ref(false);

const tabValue = ref(state.activeTab);
const stateChange = ref<number>(0);

watch(state, () => {
  stateChange.value = (stateChange.value + 1) % 999;
});

const stateChangeDebounced = debouncedRef(stateChange, 100);

watch(stateChangeDebounced, () => {
  tabValue.value = state.activeTab;
});

const tabsList = ref<{ title: string; value: 'exam' | 'note'; indicator: string | number | null }[]>([
  {
    title: t('exams.title', 2),
    value: 'exam',
    indicator: null, // exams count
    disabled: false,
  },
  {
    title: t('notes.title', 2),
    value: 'note',
    indicator: null, // notes count
    disabled: false,
  },
]);

const query = computed(
  (): Query<Schema, Course> => ({
    fields: [
      'id',
      'name_en',
      'name_ar',
      'links',
      'additional_notes',
      // @ts-expect-error
      'resource.year',
      'resource.type',
      'resource.semester',
      'resource.id',
      'resource.exam_data.*',
      'resource.note_data.*',
      'resource.user_created.*',
      'resource.files.directus_files_id.*',
    ],
    deep: {
      resource: {
        _sort: state.activeSort ?? sortOptions.value[0].key,
        _limit: 18,
        _page: state.activePage,
        _filter: {
          type: {
            _eq: tabsList.value[state.activeTab].value,
          },
        },
      },
    },
    filter: {
      course_id: {
        _eq: urlId.value,
      },
    },
  }),
);

const countQuery = computed(
  (): Query<Schema, Course> => ({
    filter: query.value.filter,
    deep: {
      resource: {
        _filter: _.assign(query.value.deep!.resource!._filter, {
          course: { course_id: { _eq: urlId.value } },
        }),
        // @ts-expect-error
        _aggregate: {
          countDistinct: 'id',
        },
        _groupBy: ['course', 'type'],
        _sort: 'course',
      },
    },
  }),
);

const {
  data: course,
  pending,
  error,
} = useLazyAsyncData(
  'course',
  async () => {
    const result = await $directus.request($readItems('course', query.value));

    if (result.length === 0)
      throw showError({
        // TODO: use createError instead and handle it manually with a custom 404 page
        statusCode: 404,
        statusMessage: `Course #${urlId.value} not found.`,
      });

    return result[0];
  },
  { watch: [stateChangeDebounced] },
);

// Fetch resource counts directly from the resource table
const { data: resourceCounts } = useLazyAsyncData(
  'resourceCounts',
  async () => {
    // Query resources directly, grouped by type
    const result = await $directus.request(
      $readItems('resource', {
        // @ts-expect-error
        aggregate: {
          count: 'id',
        },
        groupBy: ['type'],
        filter: {
          course: {
            course_id: {
              _eq: urlId.value,
            },
          },
        },
      }),
    );

    return result;
  },
  { watch: [urlId] },
);

const { data: recordCount } = useLazyAsyncData(() => $directus.request($readItems('course', countQuery.value)), {
  watch: [stateChangeDebounced],
});

// Update tabs with disabled state
watch(
  resourceCounts,
  (data) => {
    if (data) {
      // @ts-expect-error
      const examItem = data.find((r) => r.type === 'exam');
      // @ts-expect-error
      const noteItem = data.find((r) => r.type === 'note');
      // @ts-expect-error
      const examCount = examItem?.count?.id ?? 0;
      // @ts-expect-error
      const noteCount = noteItem?.count?.id ?? 0;
      tabsList.value[0].disabled = examCount === 0;
      tabsList.value[1].disabled = noteCount === 0;

      // If current active tab is disabled, switch to the enabled one
      if (tabsList.value[state.activeTab].disabled) {
        const enabledTabIndex = tabsList.value.findIndex((tab) => !tab.disabled);

        if (enabledTabIndex !== -1) {
          state.activeTab = enabledTabIndex;
        }
      }
    }
  },
  { immediate: true },
);

const pageCount = computed(() => {
  if (!recordCount.value || recordCount.value![0].resource?.length === 0) return 0;
  // @ts-expect-error
  return Math.ceil(recordCount.value![0].resource![0].countDistinct.id / 18);
});

const currentTabResourceCount = computed(() => {
  if (!recordCount.value || !recordCount.value[0]?.resource || recordCount.value[0].resource.length === 0) return 0;
  const resources = recordCount.value[0].resource;
  // @ts-expect-error
  const count = resources[0]?.countDistinct?.id;
  if (count) return count;
  return 0;
});

const heading = computed<string>(() => (locale.value === 'en' ? course.value!.name_en : course.value!.name_ar));

const switchTab = (t: number) => {
  state.activeTab = t;
  state.activePage = 1;
};

onMounted(() => {
  const tabParam = route.query.tab as string;
  const pageParam = route.query.page as string;

  if (tabParam) {
    const tabIndex = tabsList.value.findIndex((tab) => tab.value === tabParam);

    if (tabIndex !== -1) {
      state.activeTab = tabIndex;
    }
  }

  if (pageParam) {
    const page = Number(pageParam);

    if (!isNaN(page) && page > 0) {
      state.activePage = page;
    }
  }
});

// Reset to exam tab when course ID changes
watch(
  () => route.params.id,
  () => {
    state.activeTab = 0;
    state.activePage = 1;
  },
  { immediate: true },
);

watch(state, () => {
  const query: Record<string, string> = {
    tab: tabsList.value[state.activeTab].value,
  };

  // Only add page parameter if it's not page 1
  if (state.activePage > 1) {
    query.page = state.activePage.toString();
  }

  return navigateTo({
    query,
    replace: true,
  });
});
</script>

<template>
  <div v-if="course" class="container mx-auto">
    <div class="container mx-auto flex flex-wrap gap-4 justify-between items-start">
      <div class="flex flex-col gap-2">
        <h2>
          {{ heading }}
        </h2>
        <h3>
          {{ course.additional_notes }}
        </h3>
        <!-- recorded lectures link -->
        <a
          v-for="(link, index) in course.links"
          :key="link.title"
          :href="link.url"
          target="_blank"
          class="link link-hover text-accent flex items-center gap-1"
        >
          {{ link.title.length === 0 ? `${$t('courses.link')} ${index + 1}` : link.title }}
          <Icon name="ion:md-open" size="22" class="rtl:-rotate-90" />
        </a>
      </div>
      <div class="info flex flex-col gap-4 items-center max-w-[10rem] ms-auto">
        <div class="flex gap-4 items-center justify-between">
          <span>#{{ urlId }}</span>
          <CourseFavoriteButton :id="course?.id as number" size="32" />
        </div>
        <!-- Temporarily hidden -->
        <ContributeUploadBtn v-if="false" />
      </div>
    </div>
    <List
      show-sort
      :pending="pending"
      :view="listView ? 'flex' : 'auto'"
      :tabs="tabsList"
      :search-placeholder="$t('material.search') + '...'"
      :sort-options="sortOptions"
      :resource-count="currentTabResourceCount"
      :active-tab="state.activeTab"
      :pagination="{
        end: pageCount,
        active: state.activePage,
      }"
      @sorted="(s: QuerySort<Schema, Resource>) => (state.activeSort = s)"
      @active-page="(p) => (state.activePage = p)"
      @active-tab="(t) => switchTab(t)"
      @switch-view="listView = !listView"
    >
      <TransitionGroup name="list">
        <div v-for="item in course.resource" :key="item.id">
          <ResourceCard :item="item" :course-id="urlId" :resource-id="item.id" :class="{ list: listView }" />
        </div>
      </TransitionGroup>
      <template v-if="!pending" #message>
        <!-- no data info message -->
        <UIMessage
          v-if="!error && course?.resource?.length === 0"
          :message="$t(`messages.no-data.${tabsList[tabValue].value}`)"
          class="bg-neutral text-neutral-content max-w-max mx-auto"
        />

        <!-- error message -->
        <UIMessage v-if="error" :message="$t('messages.error')" class="max-w-max mx-auto" type="error" />
      </template>
    </List>
  </div>
</template>

<style lang="postcss">
.list-enter-active,
.list-leave-active {
  transition: all 0.2s ease;
}
.list-enter-from,
.list-leave-to {
  opacity: 0;
  transform: translateX(30px);
}
.list-leave-active {
  position: absolute;
}

.resources.container .list.wrapper > div {
  @apply !w-full;
}
</style>
