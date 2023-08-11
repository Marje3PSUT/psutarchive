<template>
  <form
    class="container mt-4 !p-0"
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
            : $t('search') + '...'
        "
        class="input w-full focus:outline-none"
        name="q"
        autocomplete="off"
      >
      <Icon
        name="ion:search-outline"
        size="36"
        class="search-icon"
        @click="$emit('searched', searchTerm)"
      />
    </div>
  </form>
</template>
<script setup lang="ts">
const props = defineProps({
  list: {
    type: Array as PropType<StrapiItem<any>[]>,
    required: false,
    default: () => [],
  },
  searchPlaceholder: {
    type: String,
    required: false,
    default: "",
  },
  listTitleField: {
    type: String,
    required: false,
    default: "title",
  },
  searchError: {
    type: Boolean,
    required: false,
    default: false,
  },
});
const emit = defineEmits(["searched"]);
const searchTerm = ref("");
const { locale } = useI18n();
</script>
<style scoped lang="postcss">
.search-input {
  @apply flex justify-between items-center;
  @apply max-w-[768px] mx-auto;
  @apply border rounded-xl bg-base-100;

  .search-icon {
    @apply w-1/12 max-sm:w-1/3 h-12;
    @apply p-2 rounded-e-xl;
    @apply hover:cursor-pointer transition-colors hover:bg-secondary hover:text-[#fff];
  }
}

/* hide datalist arrow indicator and clear icon in chromium-based browsers */
input[list]::-webkit-calendar-picker-indicator,
input::-webkit-search-cancel-button {
  display: none !important;
}
</style>
