<template>
  <div class="flex justify-center m-4">
    <input
      type="text"
      placeholder="Search courses..."
      class="search-input input input-bordered input-primary w-full max-w-2xl"
    >
  </div>
</template>
<style scoped lang="postcss">
input.search-input {
  @apply bg-no-repeat;
  /* TODO: use mainly Solar svg icons https://icones.js.org/collection/solar */
  background-image: url('~/assets/icons/SolarMagniferLinear.svg');
  background-position: 97% center;
  background-size: 1.5rem;
}
</style>
