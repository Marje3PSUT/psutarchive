<template>
  <div
    v-if="open"
    class="announcement-container"
    :class="{ 'flex-wrap': expanded }"
  >
    <Icon
      name="ion:speakerphone"
      size="24"
      class="min-w-[24px]"
    />
    <!-- title -->
    <span
      class="font-bold capitalize cursor-default"
      @click="expanded = !expanded"
    >
      {{ locale === 'en' ? data.title : data.title_ar }}
    </span>
    <!-- description -->
    <span
      v-if="data.description || data.description_ar"
      class="line-clamp-3 cursor-default"
      :class="{ 'w-full': expanded }"
      :title="locale === 'en' ? data.description : data.description_ar"
      @click="expanded = !expanded"
    >
      {{ locale === 'en' ? data.description : data.description_ar }}
    </span>
    <!-- link -->
    <a
      v-if="data.link"
      :href="data.link"
      class="btn btn-circle"
      target="_blank"
    >
      <Icon
        name="ion:open-outline"
        size="24"
        class="min-w-[24px]"
      />
    </a>
    <!-- close -->
    <button
      title="Hide announcement."
      class="btn btn-circle ms-auto"
      @click="hide()"
    >
      <Icon name="ion:close" />
    </button>
  </div>
</template>

<script lang="ts" setup>
  const props = defineProps({
    data: {
      type: Object as PropType<AnnouncementAttributes>,
      required: true,
    },
    shown: {
      type: Boolean,
      default: true,
    },
    id: {
      type: Number,
      required: true,
    },
  })
  const { locale } = useI18n()
  const open = ref(props.shown)
  const expanded = ref(false)

  const hide = () => {
    open.value = false
    const { addItem } = useAnnouncements()
    addItem(props.id)
  }
</script>

<style lang="postcss" scoped>
  .announcement-container {
    @apply flex flex-row gap-2 items-center;
    @apply px-4 py-0.5;
    @apply bg-primary-focus text-primary-content;
  }
  .btn {
    @apply btn-ghost btn-sm;
    @apply cursor-pointer text-xl;
    @apply hover:bg-primary-content hover:text-primary;
  }
</style>

