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
  const { data: courses, pending } = useLazyAsyncData<
    StrapiResponse<CourseAttributes>
  >(() => $baseApi("courses?populate=category"));
</script>
