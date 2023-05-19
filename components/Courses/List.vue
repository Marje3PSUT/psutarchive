<!-- eslint-disable vue/multi-word-component-names -->
<template>
  <div
    v-if="props.courses"
    class="flex flex-wrap gap-2"
  >
    <div
      v-for="course, i in props.courses.data"
      :key="i"
      class="card-compact w-64 lg:w-96 bg-base-100 shadow-xl border rounded-md"
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
