<script lang="ts" setup>
const props = defineProps({
  start: {
    type: Number,
    default: 1,
  },
  end: {
    type: Number,
    required: false,
    default: null,
  },
  active: {
    type: Number,
    default: 1,
  },
  limit: {
    // the number of pages to show before and after the current active page
    type: Number,
    default: 3,
  },
  showArrows: {
    type: Boolean,
    default: true,
  },
});

const { locale } = useI18n();
const emit = defineEmits(['activePage']);

const activePage = ref(props.active);

const pagesToShow = computed<number[]>(() => {
  const pages = [];
  // ensure that we do not go over / below the range
  let startPage = Math.max(activePage.value - props.limit, props.start);
  let endPage = Math.min(activePage.value + props.limit, props.end);

  if (endPage - startPage < props.limit * 2) {
    // Set the range based on the limit
    if (startPage === props.start) {
      endPage = Math.min(startPage + props.limit * 2, props.end);
    } else if (endPage === props.end) {
      startPage = Math.max(endPage - props.limit * 2, props.start);
    }
  }

  for (let i = startPage; i <= endPage; i++) {
    pages.push(i);
  }

  return pages;
});

const showEllipsisBefore = computed(() => props.start < activePage.value - props.limit);

const showEllipsisAfter = computed(() => props.end > activePage.value + props.limit);

const movePage = (n: number) => {
  activePage.value += n;
  emit('activePage', activePage.value);
};

watch(props, () => {
  activePage.value = props.active;
});
</script>

<template>
  <div class="join flex-wrap w-full justify-center">
    <button
      v-if="showArrows"
      class="btn join-item max-sm:btn-sm"
      :class="{ 'btn-disabled': activePage === start }"
      @click="movePage(-1)"
    >
      <Icon :name="locale === 'en' ? 'ion:ios-arrow-left' : 'ion:ios-arrow-right'" />
    </button>
    <template v-if="showEllipsisBefore">
      <button
        class="join-item btn max-sm:btn-sm"
        @click="
          activePage = start;
          emit('activePage', activePage);
        "
      >
        {{ start }}
      </button>
      <button class="join-item btn btn-disabled max-sm:btn-sm">...</button>
    </template>

    <button
      v-for="page in pagesToShow.filter((p) =>
        showEllipsisAfter ? p !== props.end : showEllipsisBefore ? p !== props.start : true,
      )"
      :key="page"
      :class="{ 'btn-secondary': page === activePage }"
      class="join-item btn max-sm:btn-sm"
      @click="
        activePage = page;
        emit('activePage', activePage);
      "
    >
      {{ page }}
    </button>

    <template v-if="showEllipsisAfter">
      <button class="join-item btn btn-disabled max-sm:btn-sm">...</button>
      <button
        class="join-item btn max-sm:btn-sm"
        @click="
          activePage = end;
          emit('activePage', activePage);
        "
      >
        {{ end }}
      </button>
    </template>
    <button
      v-if="showArrows"
      class="btn join-item max-sm:btn-sm"
      :class="{ 'btn-disabled': activePage === end }"
      @click="movePage(1)"
    >
      <Icon :name="locale === 'en' ? 'ion:ios-arrow-right' : 'ion:ios-arrow-left'" />
    </button>
  </div>
</template>

<style lang="postcss" scoped></style>
