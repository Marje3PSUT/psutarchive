<template>
  <div class="list-component container">
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
      <div class="flex flex-wrap mx-auto w-full items-center gap-4">
        <ListSort
          v-if="props.showSort"
          :sort-options="props.sortOptions"
          @sort="(q: string) => $emit('sorted', q)"
        />
        <slot name="list-option" />

        <button
          v-if="showViewControl"
          aria-label="switch view"
          class="btn btn-ghost p-0.5 ms-auto tooltip tooltip-accent max-md:hidden"
          :data-tip="$t('lists.view.switch')"
          @click="$emit('switchView')"
        >
          <Icon
            :name="props.view === 'flex' ? 'ion:grid-outline' : 'ion:menu'"
            :size="props.view === 'flex' ? '28' : '32'"
          />
        </button>
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
        :class="{ 'tab-active': activeTab === i, 'indicator': tab.indicator }"
        @click="$emit('activeTab', i)"
      >
        <span
          v-if="tab.indicator !== null"
          class="indicator-item badge badge-secondary"
        >
          {{ tab.indicator }}
        </span> 
        {{ tab.title }}
      </button>
    </div>

    <!-- grid / list / auto views -->
    <Transition name="fade">
      <div
        v-if="!pending"
        class="list wrapper container"
        :class="`view-${props.view} ${$attrs.class}`"
      >
        <!-- list of items / cards -->
        <slot />
      </div>
    </Transition>
    
    <!-- Loading animation -->
    <div
      v-if="pending"
      class="flex justify-center"
    >
      <div
        class="loading loading-infinity loading-lg"
      />
    </div>

    <!-- Messages -->
    <slot name="message" />

    <!-- Pagination -->
    <ListPagination
      v-if="props.pagination"
      :start="pagination?.start"
      :end="(pagination?.end as number)"
      :active="pagination?.active"
      :limit="pagination?.limit"
      :show-arrows="pagination?.showArrows"
      class="my-12"
      @active-page="p => $emit('activePage', p)"
    />
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
    indicator?: string | number | null
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
    showViewControl: {
      type: Boolean,
      default: true,
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
    activeTab: {
      type: Number,
      default: 0,
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

  defineEmits(["searched", "sorted", "activeTab", 'activePage', 'switchView']);

</script>

<style scoped lang="postcss">
  .list.view-flex {
    @apply flex gap-4 flex-col;
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
    @apply max-sm:flex max-sm:flex-col sm:grid;
  }
  .list {
    transition: all 0.25s linear;
    -webkit-transition: all 0.25s linear;
  }
</style>