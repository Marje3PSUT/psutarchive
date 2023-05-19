<template>
  <div class="card-body">
    <h4 class="card-title">
      {{ props.name }}
    </h4>
    <p>{{ props.school }}</p>
    <p>{{ props.courseId }}</p>
  </div>
</template>
<script setup>
const props = defineProps({
  name: {
    type: String,
    required: true
  },
  nameAr: {
    type: String,
    required: true
  },
  school: {
    type: String,
    required: true
  },
  courseId: {
    type: String,
    required: true
  },
  examsCount: {
    type: Number,
    required: false,
    default: 0
  },
  notesCount: {
    type: Number,
    required: false,
    default: 0
  },
  favorite: {
    type: Boolean,
    required: false,
    default: false
  },
  // if true,  courses will be shown in list view
  // if false, courses will be shown in grid view
  listView: {
    type: Boolean,
    required: false,
    default: false
  }
})
</script>