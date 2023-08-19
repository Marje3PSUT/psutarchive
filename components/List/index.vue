<template>
  <!-- TODO: add pagination -->
  <div class="container">
    <!-- Heading -->
    <div class="flex justify-between flex-wrap items-center m-8 max-sm:m-4">
      <h3
        v-if="props.heading"
      >
        {{ props.heading }}
      </h3>
      <NuxtLink
        v-if="props.headingLink"
        :to="headingLink.to"
        class="btn btn-sm btn-ghost"
      >
        {{ headingLink.text }}
        <Icon
          v-if="headingLink.icon"
          :name="locale === 'en' ? 'ion:ios-arrow-right' : 'ion:ios-arrow-left'"
          size="22"
        />
      </NuxtLink>
    </div>
    <!-- Search, filters, and sort -->
    <div v-if="props.showSearch"> 
      <!-- TODO -->
    </div>
    <!-- grid / list / auto views -->
    <Transition name="fade">
      <div
        v-if="!pending"
        class="list container"
        :class="`view-${props.view} ${$attrs.class}`"
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
  type HeadingLink = {
    to: string
    text: string
    icon: boolean
  }
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
    maxGridCols: {
      type: Number,
      required: false,
      default: 3,
    },
    minGridCols: {
      type: Number,
      required: false,
      default: 1,
    },
    pending: {
      type: Boolean,
      required: false,
      default: false,
    },
    headingLink: {
      type: Object as PropType<HeadingLink>,
      required: false,
      default: null,
    },
  })
  const { locale } = useI18n()
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
    @apply max-md:grid-cols-1 md:grid-cols-2 lg:grid-cols-3;
    grid-gap: 1rem;
  }
  
  @media not all and (min-width: 768px) {
    .list.list.view-auto,
    .list.list.list.view-grid  {
      grid-template-columns: repeat(v-bind(props.minGridCols), minmax(0, 1fr));
    }
  }
  @media (min-width: 1024px){
    .list.list.view-auto,
    .list.list.list.view-grid {
      grid-template-columns: repeat(v-bind(props.maxGridCols), minmax(0, 1fr));
    }
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