<script setup lang="ts">
import { Category, Course } from 'types/schema';

const props = defineProps({
  item: {
    type: Object as PropType<Course>,
    required: true,
  },
  id: {
    type: Number,
    default: null,
  },
});

const { locale } = useI18n();

const categories = ref(
  props.item
    .category!.map((categoryCourse) =>
      locale.value === 'en'
        ? (categoryCourse.category_id as Category)!.name_en
        : (categoryCourse.category_id as Category)!.name_ar,
    )
    .join(', '),
);

const resCount = ref(props.item.category!.length ? props.item.resource!.length : 0);
</script>

<template>
  <div
    class="card card-compact w-full max-sm:h-24 max-h-32 bg-base-100 shadow-xl card-bordered border-base-content hover:bg-base-content hover:bg-opacity-10 transition-colors"
    :style="{
      borderColor: props.item.category![0] ? (props.item.category![0].category_id as Category).color : undefined,
    }"
  >
    <div class="flex justify-between m-2 px-2 gap-2 items-center">
      <span class="text-xs badge bg-transparent border border-base-content border-opacity-40">
        #{{ item.course_id }}
      </span>
      <CourseFavoriteButton :id="id" />
    </div>
    <NuxtLink :to="$nuxt.$localePath(`/courses/${item.course_id}`)" class="card-body items-center">
      <h4
        class="card-title text-lg max-sm:text-sm text-center -mt-5 line-clamp-1"
        :title="locale === 'ar' ? item.name_ar : item.name_en"
      >
        {{ locale === 'ar' ? item.name_ar : item.name_en }}
      </h4>
      <div class="card-info flex justify-between items-center text-xs w-full mt-auto">
        <span
          v-if="item.category?.length"
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

<style scoped lang="postcss">
.card {
  --tw-border-opacity: 0.7;
}
/* List view style */
.card.list {
  @apply w-full md:flex-row md:items-center md:flex-wrap;
  .card-body {
    @apply md:flex-row md:items-start md:p-2;
    .card-title {
      @apply md:m-0 md:text-start;
    }
    .card-info {
      @apply md:ms-auto md:my-auto md:w-fit md:justify-end md:gap-4;
    }
  }
}
</style>
