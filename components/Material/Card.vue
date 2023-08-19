<template>
  <!-- FIXME: make font a bit smaller on smaller screen -->
  <!-- FIXME: add an arabic font with light / extralight variants -->
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
      <Icon
        name="solar:download-minimalistic-linear"
        size="36"
        class="cursor-pointer hover:text-accent transition-[200ms]"
        @click="download()"
      />
      <span> {{ totalSize ? (totalSize / 1024).toFixed(1) : 0 }} {{ $t('material.megabyte') }} </span>
    </div>
    <span
      v-if="item.type === 'exam' && item.material[0].is_solved"
      class="indicator-item indicator-middle badge badge-secondary uppercase font-bold"
      :class="locale === 'en' ? 'indicator-start -rotate-90' : 'indicator-end rotate-90'"
    >{{ $t('material.resource.exam.solved') }}</span>
  </div>
</template>
<script setup lang="ts">
  const props = defineProps({
    item: {
      type: Object as PropType<ResourceAttributes>,
      required: true,
    },
    courseId: {
      type: String,
      required: false,
      default: ''
    }
  })
  const { locale } = useI18n()

  // get total size of all files of this resource
  const totalSize = ref(
    props.item.files?.data
      .reduce<number>(
        (sum: number, curr: StrapiItem<MediaAttributes>) => (sum + curr.attributes.size), 0)
  )

  const download = async () => {
    const files = props.item.files?.data

    // If there's only one file, download it directly
    if (files?.length === 1) {
      const baseUrl = ref('')
      if (files[0].attributes.provider === 'local') {
        const { data } = (await useFetch('/api/apiUrl'))
        baseUrl.value = String(data.value)
      }      
      return navigateTo(baseUrl.value.substring(0, baseUrl.value.lastIndexOf('/api')) + files[0].attributes.url, {external: true})
    }

    // get urls of files
    const urls = ref(files?.map(f => f.attributes.url))
    // zip files together
    const { data } = await useFetch('/api/zipFiles', {
      method: 'POST',
      body: {
        files: urls.value,
      }
    })
    const fileName = `PSUTArchive-${props.courseId}-${props.item.material[0].type}_${props.item.type}-${props.item.metadata?.semester?.toLowerCase()}_${props.item.metadata?.year}.zip`
    const file = new File([data.value], fileName , { type: 'application/zip'});
    const downloadLink = window.URL.createObjectURL(file);    
    navigateTo(downloadLink, {external: true})
  }
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
