<template>
  <div class="container mx-auto">
    <List :pending="pending">
      <CourseCard
        v-for="item in courses?.data"
        :key="item.id"
        :item="item.attributes"
      />
    </List>
  </div>
</template>
<script setup lang="ts">
  import qs from 'qs'
  const route = useRoute()

  const query = qs.stringify({
    populate: [
      'category',
      'resources'
    ],
    filters: {
      category: {
        slug: {
          $eqi: route.query.category ? route.query.category : undefined
        }
      }
    },
  }, { encodeValuesOnly: true })

  const { data: courses, pending } = useLazyAsyncData<
    StrapiResponse<CourseAttributes>
  >(() => $baseApi(`courses?${query}`));
</script>
