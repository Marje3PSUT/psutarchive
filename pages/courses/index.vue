<template>
  <div class="container mx-auto">
    <List
      :pending="pending"
      show-search
      :heading="$t('courses.title')"
      :sort-options="sortOptions"
      @sorted="(s: string) => (state.activeSort = s)"
      @searched="q => (state.search = q)"
    >
      <CourseCard
        v-for="item in courses?.data"
        :key="item.id"
        :item="item.attributes"
      />
    </List>
  </div>
</template>
<script setup lang="ts">
  import qs from 'qs'
  const route = useRoute()
  const { t } = useI18n()

  const state = reactive({
    search: undefined as string | undefined,
    activeSort: undefined as string | undefined,
    // activeFilters: undefined as ActiveFilters | undefined,
  })

  const sortOptions : SortOptions = [
    {
      key: 'updatedAt:desc',
      title: t('courses.sort.last-updated')
    },
    {
      key: 'resources.count:desc',
      title: t('courses.sort.res-count')
    },
    {
      key: 'category.slug:desc',
      title: t('courses.sort.category')
    }
  ]

  const query = reactive({
    populate: [
      'category',
      'resources',
      'alt_names'
    ],
    filters: computed(() => {
      return {
        category: {
          slug: {
            $eqi: route.query.category ? route.query.category : undefined
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
    sort: computed(()  => state.activeSort ? state.activeSort : sortOptions[2].key)
  })

  const { data: courses, pending } = useLazyAsyncData<
    StrapiResponse<CourseAttributes>
  >(() => $baseApi(`courses?${qs.stringify(query, { encodeValuesOnly: true })}`, { cache: true }), {
    watch: [query]
  });
</script>
