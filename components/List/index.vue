<template>
  <!-- TODO: add pagination -->
  <div class="container">
    <!-- Heading -->
    <div
      v-if="heading || headingLink"
      class="flex justify-between flex-wrap items-center m-4 gap-2"
    >
      <h3
        v-if="props.heading"
      >
        {{ props.heading }}
      </h3>
      <NuxtLink
        v-if="props.headingLink"
        :to="headingLink.to"
        class="btn btn-sm btn-ghost p-1 ms-auto"
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
    <div
      v-if="props.showSearch"
      class="container flex flex-col my-8 justify-start gap-y-4 mx-auto"
    > 
      <ListSearch
        v-bind="$attrs"
        :search-placeholder="props.searchPlaceholder"
        @searched="q => $emit('searched', q)"
      />
      <!-- Sort and filter -->
      <div class="flex flex-wrap mx-auto w-full">
        <ListSort
          v-if="props.showSort"
          :sort-options="props.sortOptions"
          @sort="(q: string) => $emit('sorted', q)"
        />
      </div>
    </div>

    <!-- Tabs -->
    <div
      v-if="props.tabs.length"
      class="tabs tabs-boxed justify-center gap-4 bg-transparent mb-8"
    >
      <button
        v-for="tab, i in props.tabs"
        :key="i"
        class="tab"
        :class="{ 'tab-active': activeTab === i }"
        @click="activeTab = i; $emit('activeTab', i)"
      >
        {{ tab.title }}
      </button>
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
    <ListPagination
      v-if="props.pagination"
      :start="pagination?.start"
      :end="(pagination?.end as number)"
      :active="pagination?.active"
      :limit="pagination?.limit"
      :show-arrows="pagination?.showArrows"
      @active-page="p => $emit('activePage', p)"
    />
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
  type TabItem = {
    title: string
    value: string
  }
  type PaginationOptions = {
    start?: number
    end: number
    active?: number
    limit?: number
    showArrows?: boolean
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
    showSort: {
      type: Boolean,
      default: true,
    },
    sortOptions: {
      type: Array as PropType<SortOptions>,
      default: () => [],
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
    searchPlaceholder: {
      type: String,
      default: null,
    },
    tabs: {
      type: Array as PropType<TabItem[]>,
      default: () => [],
    },
    pagination: {
      type: Object as PropType<PaginationOptions | null>,
      default: null,
    }
  })
  const { locale } = useI18n()

  defineEmits(["searched", "sorted", "activeTab", 'activePage']);
  const activeTab = ref(0)

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
    @apply max-sm:flex sm:grid;
  }
  .list {
    transition: all 0.25s linear;
    -webkit-transition: all 0.25s linear;
  }
</style>