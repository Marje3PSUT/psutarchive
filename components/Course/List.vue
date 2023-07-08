<template>
  <div
    v-if="props.courses"
    class="courses-list container"
  >
    <CourseCard
      v-for="course, i in props.courses.data"
      :key="i"
      :name="course.attributes.Name"
      :name-ar="course.attributes.ArabicName"
      :category="course.attributes.Category.data"
      :course-id="course.attributes.CourseID"
    />
  </div>
</template>
<script setup>
const props = defineProps({
  courses: {
    type: Object,
    required: true
  }
})
</script>
<style scoped lang="postcss">
.courses-list {
  @apply mx-auto justify-center p-4;
  @apply grid grid-cols-1;
  @apply sm:grid-cols-2 lg:grid-cols-3;
  grid-gap: 1rem;
}
</style>
