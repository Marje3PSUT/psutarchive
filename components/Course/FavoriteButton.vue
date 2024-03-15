<script lang="ts" setup>
const props = defineProps({
  id: {
    type: Number,
    required: true,
  },
  isFavorite: {
    type: Boolean,
    default: false,
  },
  size: {
    type: String,
    default: '22',
  },
});

const isFav = ref(props.isFavorite);

const { addCourse, removeCourse, getCourses } = useFavCourses();

const switchFavState = (id: number) => {
  if (!isFav.value) {
    addCourse(id);
  } else {
    removeCourse(id);
  }

  isFav.value = !isFav.value;
};

onMounted(() => {
  const favList = getCourses();
  isFav.value = favList ? favList?.indexOf(props.id) !== -1 : false;
});
</script>

<template>
  <button :title="$t('courses.addToFavs')" :aria-label="$t('courses.addToFavs')" @click="switchFavState(id)">
    <Icon
      :name="isFav ? 'ion:heart' : 'ion:heart-outline'"
      class="cursor-pointer hover:scale-110 transition-all"
      :class="{ 'text-[#fb6f84]': isFav }"
      :size="props.size"
    />
  </button>
</template>

<style lang="postcss" scoped></style>
