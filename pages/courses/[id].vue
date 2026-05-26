<script setup lang="ts">
import { type Query, type QuerySort } from '@directus/sdk';
import { debouncedRef } from '@vueuse/core';
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

const tabsList = computed(() => [
  {
    title: t('exams.title', 2),
    value: 'exam' as const,
    indicator: typeCounts.value.exam,
  },
  {
    title: t('notes.title', 2),
    value: 'note' as const,
    indicator: typeCounts.value.note,
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
        statusMessage: t('messages.course-not-found-with-id', { id: urlId.value }),
      });

    return result[0];
  },
  { watch: [stateChangeDebounced] },
);

const { data: recordCount } = useLazyAsyncData(
  'resourceCounts',
  () =>
    $directus.request(
      $readItems('resource', {
        // @ts-expect-error
        aggregate: { countDistinct: 'id' },
        groupBy: ['type'],
        filter: {
          course: { course_id: { _eq: urlId.value } },
        },
      }),
    ),
  { watch: [stateChangeDebounced] },
);

const typeCounts = computed(() => {
  if (!recordCount.value) return { exam: null, note: null };
  return {
    exam: (recordCount.value as any[]).find((r: any) => r.type === 'exam')?.countDistinct?.id ?? 0,
    note: (recordCount.value as any[]).find((r: any) => r.type === 'note')?.countDistinct?.id ?? 0,
  };
});

const pageTitle = computed(() => {
  const appName = String(t('psutarchive'));
  const localizedCourseName = locale.value === 'en' ? course.value?.name_en : course.value?.name_ar;

  if (localizedCourseName?.trim()) {
    return `${localizedCourseName} - ${appName}`;
  }

  if (error.value) {
    return `${t('messages.course-not-found')} - ${appName}`;
  }

  return appName;
});

useHead(() => ({
  title: pageTitle.value,
}));

const pageCount = computed(() => {
  if (!recordCount.value) return 0;
  const currentType = tabsList.value[state.activeTab].value;
  const typeEntry = (recordCount.value as any[]).find((r: any) => r.type === currentType);
  if (!typeEntry) return 0;
  return Math.ceil(typeEntry.countDistinct.id / 18);
});

const heading = computed<string>(() => (locale.value === 'en' ? course.value!.name_en : course.value!.name_ar));

const switchTab = (t: number) => {
  state.activeTab = t;
  state.activePage = 1;
};

watch(state, () => {
  return navigateTo({
    query: {
      tab: tabsList.value[state.activeTab].value,
    },
    replace: true,
  });
});

const hasAutoSwitched = ref(false);

watch(recordCount, () => {
  if (hasAutoSwitched.value) return;
  const counts = typeCounts.value;
  if (counts.exam === null || counts.note === null) return;

  hasAutoSwitched.value = true;

  if (counts.exam === 0 && counts.note > 0 && state.activeTab !== 1) {
    switchTab(1);
  } else if (counts.note === 0 && counts.exam > 0 && state.activeTab !== 0) {
    switchTab(0);
  }
});

onMounted(() => {
  const tabs = ['exam', 'note'];

  if (route.query.tab && tabs.includes(route.query.tab as 'note' | 'exam')) {
    state.activeTab = tabs.indexOf(route.query.tab as 'note' | 'exam');
  }
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
          :message="
            typeCounts.exam === 0 && typeCounts.note === 0
              ? $t('messages.no-resources')
              : $t(`messages.no-data.${tabsList[tabValue].value}`)
          "
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
