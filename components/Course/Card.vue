<template>
  <div
    class="card card-compact w-full max-sm:h-24 max-h-32 bg-base-100 shadow-xl card-bordered"
    :class="`hover:bg-${item.category?.data.attributes.slug.toUpperCase()} border-${item.category?.data.attributes.slug.toUpperCase()}`"
  >
    <div class="flex justify-between m-2 px-2">
      <p class="text-xs">
        {{ item.course_id }}
      </p>
      <button
        :title="$t('courses.addToFavs')"
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
      <div class="flex justify-between text-xs w-full mt-auto">
        <p class="grow-0">
          {{ $t('papers.name', item.resources?.data.length ? item.resources.data.length : 0 ) }}
        </p>
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
    listView: {
      type: Boolean,
      required: false,
      default: false
    }
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

  onMounted(() => {
    isFavorite.value = getCourses()?.indexOf(props.id) !== -1
  })
</script>
<style scoped lang="postcss">
  .card {
    --tw-border-opacity: 0.7;
  }
</style>