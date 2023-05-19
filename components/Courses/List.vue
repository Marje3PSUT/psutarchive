<!-- eslint-disable vue/multi-word-component-names -->
<template>
  <div
    v-if="props.courses"
    class="courses-list container flex flex-wrap mx-auto justify-center gap-4 p-4"
  >
    <div
      v-for="course, i in props.courses.data"
      :key="i"
      class="card-compact w-64 bg-base-100 shadow-xl border rounded-md sm:max-w-xs"
    >
      <CoursesListItem
        :name="course.attributes.Name"
        :name-ar="course.attributes.ArabicName"
        :school="course.attributes.School"
        :course-id="course.attributes.CourseID"
      />
    </div>
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
.courses-list > .card-compact {
  flex: 1 0 33.333333%;
  min-width: 200px;
}
</style>
