<template>
  <select
    v-model="selected"
    class="select select-bordered select-sm"
    @change="$emit('sort', selected !== '0' ? selected : undefined)"
  >
    <option
      :selected="selected === '0'"
      :disabled="selected === '0'"
      value="0"
    >
      {{
        selected === '0'
          ? $t('lists.sort.title')
          : $t('lists.sort.default')
      }}
    </option>
    <option
      v-for="sortOption in props.sortOptions"
      :key="sortOption.key"
      :value="sortOption.key"
      :selected="selected === sortOption.key"
    >
      {{ sortOption.title }}
    </option>
    <!-- TODO: add a button to reverse sort (just append either ':asc' or ':desc' to the sort key) -->
  </select>
</template>

<script setup lang="ts">
  const props = defineProps({
    sortOptions: {
      type: Array as PropType<SortOptions>,
      required: true,
    },
  })
  defineEmits(['sort'])
  const selected = ref('0')
</script>

<style scoped lang="postcss"></style>
