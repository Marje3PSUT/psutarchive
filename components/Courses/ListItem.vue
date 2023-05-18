<template>
  <div
    v-if="props.courses"
    class="flex flex-wrap"
  >
    <div
      v-for="course, i in props.courses.data"
      :key="i"
      class="card w-96 bg-base-100 shadow-xl"
    >
      <div class="card-body">
        <h2 class="card-title">
          {{ course.attributes.Name }}
        </h2>
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
