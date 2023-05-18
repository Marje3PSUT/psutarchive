<template>
  <div class="container mx-auto">
    <!-- TODO: Separate this into a component -->
    <div
      v-if="state.courses"
      class="flex flex-wrap"
    >
      <div
        v-for="item, i in state.courses.data"
        :key="i"
        class="card w-96 bg-base-100 shadow-xl"
      >
        <div class="card-body">
          <h2 class="card-title">
            {{ item.attributes.Name }}
          </h2>
          <p>{{ item.attributes.School }}</p>
          <p>{{ item.attributes.CourseID }}</p>
          <div class="card-actions justify-start mt-4">
            <button class="btn btn-primary">
              See Exams
            </button>
          </div>
        </div>
      </div>
    </div>
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
