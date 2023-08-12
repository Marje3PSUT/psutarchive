<template>
  <div
    class="card card-compact w-full max-h-32 bg-base-100 shadow-xl card-bordered"
    :class="`hover:bg-${item.category?.data.attributes.abbreviation} border-${item.category?.data.attributes.abbreviation}`"
  >
    <div class="flex justify-between m-2 px-2">
      <p class="text-xs">
        {{ item.course_id }}
      </p>
      <div :title="$t('courses.addToFavs')">
        <Icon
          name="ion:heart-outline"
          class="cursor-pointer"
          size="22"
        />
      </div>
    </div>
    <NuxtLink
      :to="$nuxt.$localePath(`/courses/${item.course_id}`)"
      class="card-body items-center"
    >
      <h4 class="card-title text-center -mt-5">
        {{
          locale === 'ar' ?
            item.name_ar
            : item.name
        }}
      </h4>
      <div class="flex justify-between text-xs w-full mt-auto">
        <p class="grow-0">
          {{ $t('exams.name', item.exams?.data.length) }}
        </p>
        <p class="grow-0">
          {{ $t('notes.name', item.notes?.data.length) }}
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
    favorite: {
      type: Boolean,
      required: false,
      default: false
    },
    listView: {
      type: Boolean,
      required: false,
      default: false
    }
  })
const { locale } = useI18n();
</script>