<template>
  <div class="flex justify-center m-4">
    <input
      type="text"
      :placeholder="$t('search') + '...'"
      class="search-input input input-bordered input-primary w-full max-w-2xl"
      :style="locale == 'ar' ? 'background-position: 3% center;' : ''"
    >
  </div>
</template>
<script setup>
const { locale } = useI18n();
</script>
<style scoped lang="postcss">
input.search-input {
  @apply bg-no-repeat;
  background-image: url('~/assets/icons/SolarMagniferLinear.svg');
  background-position: 97% center;
  background-size: 1.5rem;
}
</style>
