<template>
  <div class="container mx-auto">
    <CoursesListItem :courses="state.courses" />
  </div>
</template>
<script setup>
// TODO: use typescript to create a type for courses and exams
// TODO: use a global state (pinia) to save fetched content to it
const state = reactive({
  courses: []
})
const { find } = useStrapi()
console.log(useStrapiUrl()) // FIXME: Strapi can only read the URL in .env on the client side
onMounted(async() => {
  const courses = await find('courses');
  state.courses = courses;
})
</script>
