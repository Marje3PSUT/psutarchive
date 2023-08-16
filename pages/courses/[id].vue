<template>
  <div class="container mx-auto">
    <List
      :heading="course?.data.attributes.name + ' Resources'"
      :pending="pending"
      view="auto"
    >
      <MaterialCard
        v-for="item in course?.data.attributes.resources?.data"
        :key="item.id"
        :item="item.attributes"
      />
    </List>
  </div>
</template>
<script setup lang="ts">
  import qs from 'qs'
  definePageMeta({
    // course id parameter must be a 5-digit number
    validate: async route => /^\d{5}$/.test(route.params.id.toString())
  })

  const urlId = ref(useRoute().params.id)

  // Filter courses from API by their course_id attribute
  const filterQuery = qs.stringify({
    filters: {
      course_id: {
        '$eq': urlId.value
      }
    }
  }, { encodeValuesOnly: true })
  const { data: courses } = await  useAsyncData<StrapiResponse<CourseAttributes>>(
    async () => await $baseApi(`courses?${filterQuery}`), {
      watch: [urlId]
  });


  // Get and populate the course attributes using its API ID
  const id = courses.value?.data[0]?.id
  const query = qs.stringify({
    populate: [
      'category',
      'resources.metadata',
      'resources.metadata.uploader',
      'resources.files',
      'resources.material',
    ],
  }, { encodeValuesOnly: true });
  const { data: course, pending } = useAsyncData<StrapiResponseSingle<CourseAttributes>>(
    async () => {      
      if (!id) {
        // If the course does not exist throw 404
        throw showError({ // TODO: use createError instead and handle it manually with a custom 404 page
          statusCode: 404,
          statusMessage: `Course #${urlId.value} not found.`,
        })
      }
      return await $baseApi(`courses/${id}?${query}`)
    }, {
    watch: [urlId],
  });
</script>
