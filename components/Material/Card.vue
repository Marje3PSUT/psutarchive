<template>
  <div
    class="card card-compact indicator"
  >
    <div class="flex flex-col m-2 px-2 h-full justify-around items-start my-auto">
      <div class="capitalize text-lg font-bold">
        {{ $t(`material.resource.type.${item.type.toLowerCase()}`) }} -
        <span class="text-secondary-focus">
          {{ $t(`material.resource.${item.type.toLowerCase()}.type.${item.material[0].type}`) }}
        </span>
      </div>
      <div v-if="item.metadata">
        {{ $t(`material.semesters.${item.metadata.semester?.toLowerCase()}`) }} -
        <span class="text-secondary font-semibold">
          {{ item.metadata.year }}
        </span>
      </div>
      <div
        v-if="item.metadata?.uploader?.name"
        class="text-xs opacity-50"
      >
        {{ $t('misc.by') }} {{ item.metadata.uploader.name }}
      </div>
    </div>
    <div class="flex flex-col items-center gap-y-2 text-xs font-extralight">
      <span class="font-normal">{{ item.files?.data.length }} {{ $t('material.files', item.files?.data.length) }}</span>
      <div class="flex gap-2">
        <div
          v-for="file in item.files?.data"
          :key="file.id"
          :title="file.attributes.name"
        >
          <!-- FIXME: remove hardcoded api link, proxy the request to the server side -->
          <!-- TODO[idea]: If there's more than one file, zip them in the server side and return them to the client -->
          <NuxtLink
            :to="'http://localhost:1337' + file.attributes.url"
            target="_blank"
            class="flex flex-col items-center gap-y-2 hover:text-accent transition-[200ms]"
          >
            <Icon
              name="solar:download-minimalistic-linear"
              size="36"
            />
            <!-- FIXME: add an arabic font with light / extralight variants -->
            {{ (file.attributes.size / 1024).toFixed(1) }} {{ $t('material.megabyte') }}
          </NuxtLink>
        </div>
      </div>
    </div>
    <span
      v-if="item.type === 'exam' && item.material[0].is_solved"
      class="indicator-item indicator-middle badge badge-secondary uppercase font-bold"
      :class="locale === 'en' ? 'indicator-start -rotate-90' : 'indicator-end rotate-90'"
    >{{ $t('material.resource.exam.solved') }}</span>
  </div>
</template>
<script setup lang="ts">
  defineProps({
    item: {
      type: Object as PropType<ResourceAttributes>,
      required: true,
    }
  })
  const { locale } = useI18n()
</script>
<style scoped lang="postcss">
  .card {
    @apply flex-row justify-between;
    @apply w-full max-h-32 p-4;
    @apply bg-base-100 shadow-xl;
    @apply card-bordered border-base-content;
    --tw-border-opacity: 0.2;
  }
</style>
