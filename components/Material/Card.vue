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
        <span v-if="item.metadata.semester">
          {{ $t(`material.semesters.${item.metadata.semester?.toLowerCase()}`) }} -
        </span>
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
      <button
        v-if="!loading"
        @click="download()"
      >
        <Icon
          name="solar:download-minimalistic-linear"
          size="36"
          class="cursor-pointer hover:text-accent transition-[200ms]"
        />
      </button>
      <span
        v-else
        class="loading loading-spinner loading-lg text-accent"
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
  const loading = ref(false)

  // get total size of all files of this resource
  const totalSize = ref(
    props.item.files?.data
      .reduce<number>(
        (sum: number, curr: StrapiItem<MediaAttributes>) => (sum + curr.attributes.size), 0)
  )

  const download = async () => {
    loading.value = true
    const files = props.item.files?.data

    // get urls of files
    const urls = ref(files?.map(f => f.attributes.url))

    const fileExt = ref('')
    const fileType = ref('')

    const { data } = await useFetch('/api/zipFiles', {
      method: 'POST',
      body: {
        files: urls.value,
      },
      onResponse({ response }) {
        const ext: string | null = response.headers.get('file-extension')
        fileExt.value = ext ? `.${ext}` : ''
        fileType.value = response.headers.get('content-type') as string
      }
    })
    const fileName = [
      'PSUTArchive',
      `${props.courseId}`,
      [
        props.item.material[0].type ? props.item.material[0].type : null,
        props.item.type ? props.item.type : null
      ].filter(Boolean).join('-'),
      [
        props.item.metadata?.semester? props.item.metadata?.semester?.toLowerCase() : null,
        props.item.metadata?.year
      ].filter(Boolean).join('-')
    ].join('.')

    const file = new File([data.value], `${fileName}${fileExt.value}` , { type: fileType.value});
    const downloadLink = window.URL.createObjectURL(file);

    loading.value = false
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
