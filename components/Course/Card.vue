<template>
  <div
    class="card card-compact w-full max-h-32 bg-base-100 shadow-xl card-bordered"
    :class="`hover:bg-${item.category?.data.attributes.abbreviation} border-${item.category?.data.attributes.abbreviation}`"
  >
    <div class="card-body">
      <NuxtLink :to="$nuxt.$localePath(`/courses/${item.course_id}`)">
        <h4 class="card-title">
          {{
            locale === 'ar' ?
              item.name_ar
              : item.name
          }}
        </h4>
        <p>
          {{
            locale === 'ar' ?
              item.category?.data.attributes.name_ar
              : item.category?.data.attributes.name
          }}
        </p>
        <p>{{ item.course_id }}</p>
      </NuxtLink>
    </div>
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