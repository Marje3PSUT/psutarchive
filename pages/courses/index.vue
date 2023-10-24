<template>
  <div class="container mx-auto">
    <List
      show-search
      :view="state.listView ? 'flex' : 'auto'"
      :heading="$t('courses.title')"
      :sort-options="sortOptions"
      :pagination="{
        end: courses?.meta.pagination?.pageCount as number,
        active: courses?.meta.pagination?.page
      }"
      @sorted="(s: string) => (state.activeSort = s)"
      @searched="q => (state.search = q)"
      @active-page="p => (state.activePage = p)"
      @switch-view="state.listView = !state.listView"
    >
      <template v-if="pending">
        <CourseSkeleton
          v-for="index in 9"  
          :key="index"
        />
      </template>
      <template v-else>
        <CourseCard
          v-for="item in list"
          :id="item.id"
          :key="item.id"
          :item="item.attributes"
          :class="{ list: state.listView }"
        />
      </template>
      <template
        v-if="!pending"
        #message
      >
        <!-- no data info message -->
        <UIMessage
          v-if="!error && list?.length === 0"
          :message="$t('messages.no-data.course')"
          class="bg-neutral text-neutral-content max-w-max mx-auto"
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
  import qs from 'qs'
  const route = useRoute()
  const { t, locale } = useI18n()

  const state = reactive({
    search: undefined as string | undefined,
    activeSort: undefined as string | undefined,
    activePage: 1 as number | undefined,
    listView: false
    // activeFilters: undefined as ActiveFilters | undefined,
  })

  // sort keys that start with '!' are handled locally, not from the API
  const sortOptions = ref<SortOptions>([
    {
      key: 'updatedAt:desc',
      title: t('courses.sort.last-updated')
    },
    {
      key: '!resources.count',
      title: t('courses.sort.res-count')
    },
    {
      key: locale.value === 'en' ? 'name:asc' : 'name_ar:asc',
      title: t('courses.sort.alphapetical')
    },
    {
      key: 'categories.slug:desc',
      title: t('courses.sort.category')
    }
  ])

  const query = reactive({
    populate: [
      'categories',
      'resources',
      'alt_names'
    ],
    pagination: computed(() => {
      return {
        page: state.activePage,
        pageSize: 18,
      }
    }),
    filters: computed(() => {
      return {
        categories: {
          slug: {
            $contains: route.query.category
          }
        },
        // search query
        $or: [
          {
            name: {
              $containsi: state.search?.length ? state.search : undefined,
            }
          },
          {
            name_ar: {
              $containsi: state.search?.length ? state.search : undefined,
            }
          },
          {
            alt_names: {
              name: {
                $containsi:  state.search?.length ? state.search : undefined,
              },
            }
          },
          {
            course_id: {
              $containsi:  state.search?.length ? state.search : undefined,
            }
          }
        ]
      }
    }),
    sort: computed(()  => state.activeSort && !state.activeSort?.startsWith('!') ? state.activeSort : sortOptions.value[2].key)
  })

  const { data: courses, pending, error } = useLazyAsyncData<
    StrapiResponse<CourseAttributes>
  >(() => $baseApi(`courses?${qs.stringify(query, { encodeValuesOnly: true })}`, { cache: true }), {
    watch: [query]
  });
  const list = computed(() => {
    if (state.activeSort?.startsWith('!')) {
      // sort by resources count
      if (state.activeSort === sortOptions.value[1].key) {
        return courses.value?.data.sort((a, b) =>
          (b.attributes.resources?.data.length as number) - (a.attributes.resources?.data.length as number))
      }
    }
    return courses.value?.data
  })
</script>
