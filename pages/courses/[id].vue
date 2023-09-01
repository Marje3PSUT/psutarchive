<template>
  <div class="container mx-auto">
    <List
      :heading="heading"
      :pending="pending"
      view="auto"
      show-search
      :search-placeholder="$t('material.search')+ '...'"
      :sort-options="sortOptions"
      @sorted="(s: string) => (state.activeSort = s)"
      @searched="q => (state.search = q)"
    >
      <TransitionGroup name="list">
        <div
          v-for="item in resources"
          :key="item.id"
        >
          <MaterialCard
            :item="item.attributes"
            :course-id="course?.data.attributes.course_id"
          />
        </div>
      </TransitionGroup>
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

  const state = reactive({
    search: undefined as string | undefined,
    activeSort: undefined as string | undefined,
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
  const filterQuery = qs.stringify({
    filters: {
      course_id: {
        '$eq': urlId.value
      }
    }
  }, { encodeValuesOnly: true })
  const { data: courses } = await  useAsyncData<StrapiResponse<CourseAttributes>>(
    async () => await $baseApi(`courses?${filterQuery}`, { cache: true }));


  // Get and populate the course attributes using its API ID
  const id = courses.value?.data[0]?.id
  const query = reactive({
    populate: [
      'category',
      'resources.metadata',
      'resources.metadata.uploader',
      'resources.files',
      'resources.material',
    ],
  });
  const { data: course, pending } = useAsyncData<StrapiResponseSingle<CourseAttributes>>(
    async () => {      
      if (!id) {
        // If the course does not exist throw 404
        throw showError({ // TODO: use createError instead and handle it manually with a custom 404 page
          statusCode: 404,
          statusMessage: `Course #${urlId.value} not found.`,
        })
      }
      return await $baseApi(`courses/${id}?${qs.stringify(query, { encodeValuesOnly: true })}`, {cache: true})
    },
    { watch: [query] }
  );

  const resources = computed(() => {
    // filter or search
    const list =  ref(course.value?.data.attributes.resources?.data).value?.filter(item => {
      if (!state.search) return true
      else return [
        item.attributes.type,
        item.attributes.material[0].type,
        item.attributes.material[0].title,
        item.attributes.metadata?.semester,
        item.attributes.metadata?.year
      ].some(item => String(item).toLowerCase().includes((state.search as string).toLowerCase()))
      
    })
    if (state.activeSort) {
      const selectedSort = unref(sortOptions).filter(option => option.key === state.activeSort)[0]
      if (selectedSort) {
        list?.sort(selectedSort.sortHandler)
      }
    }
    return list
  })

  const heading = computed<string>(
    () =>locale.value === 'en' ?
        `${course.value?.data.attributes.name} ${ t('material.resource.title', 2) }`
        : `${ t('material.resource.title', 2)} ${course.value?.data.attributes.name_ar}`
    )
</script>
<style scoped lang="postcss">
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
</style>