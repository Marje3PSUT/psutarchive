<template>
  <div
    class="card card-compact w-full max-sm:h-24 max-h-32 bg-base-100 shadow-xl card-bordered border-base-content hover:bg-base-content hover:bg-opacity-10 transition-colors"
    :class="`hover:bg-${item.categories?.data[0]?.attributes.slug.toUpperCase()} border-${item.categories?.data[0]?.attributes.slug.toUpperCase()} ${$attrs.class ? $attrs.class : ''}`"
  >
    <div class="flex justify-between m-2 px-2 gap-2 items-center">
      <span class="text-xs badge bg-transparent border border-base-content border-opacity-40">
        #{{ item.course_id }}
      </span>
      <button
        :title="$t('courses.addToFavs')"
        :aria-label="$t('courses.addToFavs')"
        @click="switchFavState(id)"
      >
        <Icon
          :name="isFavorite ? 'ion:heart': 'ion:heart-outline'"
          class="cursor-pointer hover:scale-110 transition-all"
          :class="{ 'text-[#fb6f84]': isFavorite }"
          size="22"
        />
      </button>
    </div>
    <NuxtLink
      :to="$nuxt.$localePath(`/courses/${item.course_id}`)"
      class="card-body items-center"
    >
      <h4
        class="card-title text-lg max-sm:text-sm text-center -mt-5 line-clamp-1"
        :title="locale === 'ar' ?
          item.name_ar
          : item.name"
      >
        {{
          locale === 'ar' ?
            item.name_ar
            : item.name
        }}
      </h4>
      <div class="card-info flex justify-between items-center text-xs w-full mt-auto">
        <span
          v-if="item.categories?.data.length"
          :title="categories"
          class="badge badge-sm badge-ghost border-0 line-clamp-1 max-w-[100%]"
        >
          {{ categories }}
        </span>
        <span
          class="grow-0 ms-auto badge badge-sm bg-transparent border-0"
          :class="{ '!badge-secondary': resCount > 0 }"
        >
          {{ $t('papers.name', resCount) }}
        </span>
      </div>
    </NuxtLink>
  </div>
</template>
<script setup lang="ts">
  const props = defineProps({
    item: {
      type: Object as PropType<CourseAttributes>,
      required: true,
    },
    id: {
      type: Number,
      default: null
    },
  })

  const { locale } = useI18n();
  const { addCourse, removeCourse, getCourses } = useFavCourses()
  
  const isFavorite = ref(false)

  const switchFavState = (id: number) => {
    if (!isFavorite.value) {
      addCourse(id)
    }
    else {
      removeCourse(id)
    }
    isFavorite.value = !isFavorite.value
  }

  const categories = ref(props.item.categories?.data.map(c => locale.value === 'en' ? c.attributes.name : c.attributes.name_ar).join(', '))
  const resCount = ref(props.item.resources?.data.length ? props.item.resources.data.length : 0)

  onMounted(() => {
    const favList = getCourses()
    isFavorite.value = favList? favList?.indexOf(props.id) !== -1 : false
  })
</script>
<style scoped lang="postcss">
  .card {
    --tw-border-opacity: 0.7;
  }
  /* List view style */
  .card.list {
    @apply w-full md:flex-row md:items-center md:flex-wrap md:rounded-md;
    .card-body {
      @apply md:flex-row md:items-start md:p-2;
      .card-title {
        @apply md:m-0 md:text-start;
      }
      .card-info{
        @apply md:ms-auto md:my-auto md:w-fit md:justify-end md:gap-4;
      }
    }
  }
</style>
