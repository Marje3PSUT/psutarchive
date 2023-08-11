<template>
  <div class="container">
    <h3
      v-if="props.heading"
      class="container text-start my-0 !p-0"
    >
      {{ props.heading }}
    </h3>
    <!-- Search, filters, and sort -->
    <div v-if="props.showSearch"> 
      <!-- TODO -->
    </div>
    <!-- grid / list / auto views -->
    <Transition name="fade">
      <div
        v-if="!pending"
        class="list container"
        :class="`view-${props.view}`"
      >
        <!-- list of items / cards -->
        <slot />
      </div>
    </Transition>
    <div
      v-if="pending"
      class="flex justify-center"
    >
      <div
        class="loading loading-infinity loading-lg"
      />
    </div>
  </div>
</template>
<script setup lang="ts">
  const props = defineProps({
    heading: {
      type: String,
      required: false,
      default: null,
    },
    showSearch: {
      type: Boolean,
      required: false,
      default: false,
    },
    view: {
      type: String as PropType<"grid" | "flex" | "auto">,
      required: false,
      default: "auto",
    },
    pending: {
      type: Boolean,
      required: false,
      default: false,
    },
  })
</script>
<style scoped lang="postcss">
  .list.view-flex {
    @apply flex;
  }
  .list.view-grid {
    @apply grid;
  }
  /* Auto view */
  .list.view-grid,
  .list.view-auto {
    @apply mx-auto justify-center w-full;
    @apply grid-cols-1 md:grid-cols-2 lg:grid-cols-3;
    grid-gap: 1rem;
  }
  .list.view-flex,
  .list.view-auto {
    @apply flex-wrap justify-center;
  }
  .list.view-auto {
    /* Always list / full-width view on mobile */
    @apply max-sm:flex md:grid;
  }
  .list {
    transition: all 0.25s linear;
    -webkit-transition: all 0.25s linear;
  }
</style>