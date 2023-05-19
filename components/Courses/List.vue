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
      <div class="card-body">
        <h4 class="card-title">
          {{ course.attributes.Name }}
        </h4>
        <p>{{ course.attributes.School }}</p>
        <p>{{ course.attributes.CourseID }}</p>
        <div class="card-actions justify-start mt-4">
          <button class="btn btn-primary">
            See Exams
          </button>
        </div>
      </div>
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
