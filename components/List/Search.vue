<template>
  <form
    class="mt-4"
    @submit.prevent
  >
    <div class="search-input">
      <Icon
        v-if="searchTerm.length > 0"
        name="ion:close-sharp"
        size="22"
        class="ms-2 cursor-pointer"
        @click="clear()"
      />
      <input
        v-model="searchTerm"
        type="search"
        list="search-data"
        :placeholder="
          props.searchPlaceholder
            ? props.searchPlaceholder
            : $t('lists.search') + '...'
        "
        class="input w-full focus:outline-none"
        name="q"
        autocomplete="off"
      >
      <Icon
        name="ion:search-outline"
        size="36"
        class="search-icon"
      />
    </div>
    <div
      v-if="searchError"
      class="alert flex alert-error w-max h-12 mx-auto mt-2"
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        class="stroke-current shrink-0 h-6 w-6 cursor-pointer hover:text-white transition-all"
        fill="none"
        viewBox="0 0 24 24"
        @click="clear()"
      >
        <path
          stroke-linecap="round"
          stroke-linejoin="round"
          stroke-width="2"
          d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z"
        />
      </svg>
      <p>{{ $t('misc.lists.searchErr') }}</p>
    </div>
  </form>
</template>
<script setup lang="ts">
const props = defineProps({
  list: {
    type: Array as PropType<StrapiItem<Record<string, unknown>>[]>,
    required: false,
    default: () => [],
  },
  searchPlaceholder: {
    type: String,
    required: false,
    default: null,
  },
  searchError: {
    type: Boolean,
    required: false,
    default: false,
  },
});
const emit = defineEmits(["searched"]);

const searchTerm = ref("");

watch(searchTerm, (newSearchTerm) => {
  emit('searched', newSearchTerm)
})

const clear = () => {
  searchTerm.value = ''
}
</script>
<style scoped lang="postcss">
.search-input {
  @apply flex justify-between items-center;
  @apply mx-auto p-1;
  @apply border border-base-content rounded-xl bg-base-100;
  --tw-border-opacity: 0.5;

  .search-icon {
    @apply w-1/12 max-sm:w-1/3 h-12;
    @apply p-2 rounded-e-xl;
  }
}

/* hide datalist arrow indicator and clear icon in chromium-based browsers */
input[list]::-webkit-calendar-picker-indicator,
input::-webkit-search-cancel-button {
  display: none !important;
}
</style>
