<template>
  <div class="container mx-auto">
    <div class="container mx-auto flex flex-wrap gap-4 justify-between items-start">
      <div class="flex flex-col gap-2">
        <h2 class="text-2xl">
          {{ heading }}
        </h2>
        <!-- recorded lectures link -->
        <a
          v-if="course?.attributes.recordings_url"
          :href="course.attributes.recordings_url"
          target="_blank"
          class="link link-hover text-secondary flex items-center gap-1"
        >
          {{ $t('courses.recordings') }}
          <Icon
            name="ion:md-open"
            size="22"
            class="rtl:-rotate-90"
          />
        </a>
      </div>
      <div class="info flex flex-col gap-4 items-center max-w-[10rem] ms-auto">
        <div class="flex gap-4 items-center justify-between">
          <span>#{{ urlId }}</span>
          <CourseFavoriteButton
            :id="(course?.id as number)"
            size="32"
          />
        </div>
        <!-- Temporarily hidden -->
        <ContributeUploadBtn v-if="false" />
      </div>
    </div>
    <List
      :pending="pending"
      :view="state.listView ? 'flex' : 'auto'"
      :tabs="tabsList"
      show-search
      :search-placeholder="$t('material.search')+ '...'"
      :sort-options="sortOptions"
      :active-tab="state.activeTab"
      @sorted="(s: string) => (state.activeSort = s)"
      @searched="q => (state.search = q)"
      @active-tab="t => (state.activeTab = t)"
      @switch-view="state.listView = !state.listView"
    >
      <TransitionGroup name="list">
        <div
          v-for="item in resources"
          :key="item.id"
        >
          <ResourceCard
            :item="item.attributes"
            :course-id="course?.attributes.course_id"
            :resource-id="item.id"
            :class="{ list: state.listView }"
          />
        </div>
      </TransitionGroup>
      <template #message>
        <!-- no data info message -->
        <UIMessage
          v-if="!error && resources?.length === 0"
          :message="$t(`messages.no-data.${tabsList[state.activeTab].value}`)"
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
  definePageMeta({
    // course id parameter must be a 5-digit number
    validate: async route => /^\d{5}$/.test(route.params.id.toString())
  })

  const { locale, t } = useI18n()
  const urlId = ref(useRoute().params.id)
  const route = useRoute()

  const tabsList = ref([
    {
      title: t('exams.title', 2),
      value: 'exam',
      indicator: null as string | number | null, // exams count
    },
    {
      title: t('notes.title', 2),
      value: 'note',
      indicator: null as string | number | null, // notes count
    }
  ])

  const state = reactive({
    search: undefined as string | undefined,
    activeSort: undefined as string | undefined,
    activeTab: 0, // index of active tab
    listView: false,
    // activeFilters: undefined as ActiveFilters | undefined,
  })
  const sortOptions = ref<SortOptions>([
    {
      key: 'new',
      title: t('material.sort.new'),
      // @ts-ignore
      sortHandler: (a: StrapiItem<ResourceAttributes>, b: StrapiItem<ResourceAttributes>) => {
        const dateA = new Date(a.attributes.createdAt);
        const dateB = new Date(b.attributes.createdAt);
        return dateB.getTime() - dateA.getTime();
      }
    },
    {
      key: 'year',
      title: t('material.sort.year'),
      // @ts-ignore
      sortHandler: (a: StrapiItem<ResourceAttributes>, b: StrapiItem<ResourceAttributes>) => {
        const yearA = Number(a.attributes.metadata?.year)
        const yearB = Number(b.attributes.metadata?.year)
        return yearB - yearA
      }
    },
    {
      key: 'sem',
      title: t('material.sort.semester'),
      // @ts-ignore
      sortHandler: (a: StrapiItem<ResourceAttributes>, b: StrapiItem<ResourceAttributes>) => {
        const semA = a.attributes.metadata?.semester,
          semB = b.attributes.metadata?.semester
        if (semA && semB) return semB.toString() < semA.toString()
      }
    },
    {
      key: 'type',
      title: t('material.sort.type'),
      // @ts-ignore
      sortHandler: (a: StrapiItem<ResourceAttributes>, b: StrapiItem<ResourceAttributes>) => {
        const typeA = a.attributes.material[0].type,
          typeB = b.attributes.material[0].type
        if (typeA && typeB) return typeA.toString() < typeB.toString()
      }
    },
    {
      key: 'size',
      title: t('material.sort.size'),
      // @ts-ignore
      sortHandler: (a: StrapiItem<ResourceAttributes>, b: StrapiItem<ResourceAttributes>) => {
        const sizeA = a.attributes.files?.data.reduce<number>(
        (sum: number, curr: StrapiItem<MediaAttributes>) => (sum + curr.attributes.size), 0),
          sizeB = b.attributes.files?.data.reduce<number>(
        (sum: number, curr: StrapiItem<MediaAttributes>) => (sum + curr.attributes.size), 0)
        if (sizeA && sizeB) return sizeB - sizeA
      }
    }
  ])

  // Filter courses from API by their course_id attribute
  const coursesQuery = qs.stringify({
    filters: {
      course_id: {
        '$eq': urlId.value
      }
    }
  }, { encodeValuesOnly: true })
  const { data: courses } = await  useAsyncData<StrapiResponse<CourseAttributes>>(
    async () => await $baseApi(`courses?${coursesQuery}`, { cache: true }));

  const course = courses.value?.data[0]
  const id = course?.id // API id of the chosen course

  // Get and populate resources
  const query = reactive({
    populate: [
      'course',
      'metadata',
      'metadata.uploader',
      'files',
      'material',
    ],
    filters: {
      course: {
        course_id: {
          $eq: urlId.value
        }
      }
    } as StrapiRestFilters<ResourceAttributes>
  });
  const { data: resourcesList, pending, error } = useAsyncData<StrapiResponse<ResourceAttributes>>(
    async () => {
      if (!id) {
        // If the course does not exist throw 404
        throw showError({ // TODO: use createError instead and handle it manually with a custom 404 page
          statusCode: 404,
          statusMessage: `Course #${urlId.value} not found.`,
        })
      }
      return await $baseApi(`resources?${qs.stringify(query, { encodeValuesOnly: true })}`, {cache: true})
    },
    { watch: [query] }
  );

  const resources = computed(() => {
    // filter or search
    const list =  ref(resourcesList.value?.data).value?.filter(item => {
      if (!state.search) return true
      else return [
        item.attributes.material[0].type,
        item.attributes.material[0].title,
        item.attributes.metadata?.semester,
        item.attributes.metadata?.year
      ].some(item => String(item).toLowerCase().includes((state.search as string).toLowerCase()))
      
    }).filter(item => // filter by current active tab
      item.attributes.material[0].__component.includes(tabsList.value[state.activeTab].value.toLowerCase()))
    if (state.activeSort) {
      const selectedSort = unref(sortOptions).filter(option => option.key === state.activeSort)[0]
      if (selectedSort) {
        list?.sort(selectedSort.sortHandler)
      }
    }
    if (list && resourcesList.value) {
      // update resources count
      tabsList.value[state.activeTab].indicator = list?.length.toString()
      tabsList.value[(state.activeTab + 1) % tabsList.value.length].indicator
        = (resourcesList.value?.data.length - list?.length).toString()
    }
    return list
  })

  const heading = computed<string>(
    () => locale.value === 'en' ? course?.attributes?.name as string
        : course?.attributes?.name_ar as string
  )

  watch(state , () => {
    return navigateTo({
      query: {
        tab: tabsList.value[state.activeTab].value
      },
      replace: true,
    })
  })
  onMounted(() => {
    const tabs = tabsList.value.map(i => i.value)
    if (route.query.tab && tabs.includes(route.query.tab as string)) {
      state.activeTab = tabs.indexOf(route.query.tab as string)
    }
  })
</script>
<style lang="postcss">
  .list-enter-active,
  .list-leave-active {
    transition: all 0.5s ease;
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