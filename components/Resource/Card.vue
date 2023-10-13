<template>
  <div
    class="card card-compact indicator"
  >
    <div class="flex flex-col m-2 px-2 h-full justify-around items-start my-auto">
      <div class="capitalize text-lg font-bold">
        {{ $t(`material.resource.type.${resourceType}`) }} -
        <span class="text-secondary-focus">
          {{ $t(`material.resource.${resourceType}.type.${item.material[0].type}`) }}
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
        v-if="item.material[0]?.title"
        class="text-xs opacity-75 max-h-10 line-clamp-3 overflow-clip"
      >
        {{ item.material[0]?.title }}
      </div>
    </div>
    <div class="flex flex-col items-center gap-y-2 text-xs font-extralight">
      <span class="font-normal">{{ filesCount }} {{ $t('material.files', filesCount) }}</span>
      <div class="flex justify-center items-center gap-1">
        <button
          v-if="!loading"
          aria-label="download-button"
          class="tooltip tooltip-accent z-20"
          :data-tip="$t('material.download', filesCount)"
          @click="download(item.files?.data)"
        >
          <Icon
            name="ion:md-download"
            size="36"
            class="cursor-pointer hover:text-accent transition-[200ms]"
          />
        </button>
        <span
          v-else
          class="loading loading-spinner w-9 text-accent"
        />
        <button
          v-if="filesCount > 1"
          aria-label="see-files-button"
          class="tooltip tooltip-accent z-20"
          :data-tip="$t('material.preview')"
          @click="openModal()"
        >
          <Icon
            name="ion:folder"
            size="36"
            class="cursor-pointer hover:text-accent transition-[200ms]"
          />
        </button>
        <a
          v-else
          :href="item.files?.data[0].attributes.url"
          target="_blank"
          class="tooltip tooltip-accent"
          :download="item.files?.data[0].attributes.name"
          :data-tip="$t('material.open')"
        >
          <Icon
            name="ion:md-open"
            size="36"
            class="cursor-pointer hover:text-accent transition-[200ms]"
          />
        </a>
      </div>
      <span class="text-center">
        {{ totalSize ? (totalSize / 1024).toFixed(2) : 0 }}
        {{ $t('material.megabyte') }}
      </span>
      <div
        v-if="item.createdBy"
        class="text-xs opacity-50 whitespace-nowrap"
      >
        {{ $t('misc.by') }} {{ `${item.createdBy.firstname} ${item.createdBy.lastname}` }}
      </div>
    </div>

    <!-- solved exam indicator -->
    <span
      v-if="resourceType === 'exam' && item.material[0]?.is_solved"
      class="indicator-item indicator-middle badge badge-secondary uppercase font-bold"
      :class="locale === 'en' ? 'indicator-start -rotate-90' : 'indicator-end rotate-90'"
    >{{ $t('material.resource.exam.solved') }}</span>

    <!-- preview files modal -->
    <ResourceModal
      v-if="filesCount > 1"
      :id="resourceId"
      @closed="modalIsOpen = false"
    >
      <template
        v-if="modalIsOpen"
        #content
      >
        <div class="border-b border-base-content border-opacity-50 my-4">
          <div class="capitalize text-lg font-bold  flex justify-between p-2">
            <span>
              {{ $t(`material.resource.type.${resourceType}`) }} -
              <span class="text-secondary-focus">
                {{ $t(`material.resource.${resourceType}.type.${item.material[0].type}`) }}
              </span>
            </span>
            <span>
              <span v-if="item.metadata?.semester">
                {{ $t(`material.semesters.${item.metadata.semester?.toLowerCase()}`) }} -
              </span>
              {{ item.metadata?.year }}
            </span>
          </div>
          <div
            v-if="item.material[0]?.title"
            class="text-xs p-2"
          >
            {{ item.material[0]?.title }}
          </div>
        </div>
        <div class="flex flex-col gap-2">
          <div
            v-for="file in item.files?.data"
            :key="file.id"
            dir="ltr"
            class="border-b border-base-content border-opacity-25 p-2 flex items-center gap-4 last:border-none"
          >
            <span class="font-mono">{{ file.attributes.name }}</span>
            <span class="text-center text-sm ms-auto">
              {{ (file.attributes.size / 1024).toFixed(2) }}
              {{ $t('material.megabyte') }}
            </span>
            <a
              :href="file.attributes.url"
              target="_blank"
              :download="file.attributes.name"
              :title="$t('material.open')"
            >
              <Icon
                name="ion:md-open"
                size="24"
                class="cursor-pointer hover:text-accent transition-[200ms]"
              />
            </a>
            <button
              aria-label="download-button"
              :title="$t('material.download')"
              @click="download([file])"
            >
              <Icon
                name="ion:md-download"
                size="24"
                class="cursor-pointer hover:text-accent transition-[200ms]"
              />
            </button>
          </div>
        </div>
      </template>
    </ResourceModal>
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
    },
    resourceId: {
      type: Number,
      required: true,
    }
  })
  const { locale } = useI18n()
  const route = useRoute()

  const loading = ref(false)
  const resourceType = ref(props.item.material[0]?.__component?.includes('exam') ? 'exam' : 'note')
  const filesCount = ref<number>(props.item.files?.data.length as number)

  // get total size of all files of this resource
  const totalSize = ref(
    props.item.files?.data
      .reduce<number>(
        (sum: number, curr: StrapiItem<MediaAttributes>) => (sum + curr.attributes.size), 0)
  )

  const download = async (files: StrapiItem<MediaAttributes>[] | undefined = props.item.files?.data) => {
    loading.value = true

    // get urls of files
    const urls = ref(files?.map(f => ({
      url: f.attributes.url,
      source: f.attributes.provider
    })))

    const fileExt = ref('')
    const fileType = ref('')

    const { data } = await useFetch<Blob>('/api/download', {
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
        props.item.material[0]?.type,
        resourceType.value,
      ].filter(Boolean).join('-'),
      [
        props.item.metadata?.semester?.toLowerCase(),
        props.item.metadata?.year,
      ].filter(Boolean).join('-')
    ].join('.')

    const file = new File([data.value as Blob], `${fileName}${fileExt.value}` , { type: fileType.value});
    const downloadLink = window.URL.createObjectURL(file);
    const a = document.createElement("a");
    a.href = downloadLink;
    a.download = `${fileName}${fileExt.value}`;
    a.click();
    loading.value = false
  }

  const modalIsOpen = ref(false)
  const openModal = () => {
    // open modal
    modalIsOpen.value = true;
    (document.getElementById(`res_${props.resourceId}`) as HTMLDialogElement).showModal()

    // add url query
    const query = {
      ...route.query,
      res: props.resourceId,
    }
    return navigateTo({
      path: route.fullPath,
      query: query,
      replace: true,
    })
  }

  onMounted(() => {
    if (route.query.res === props.resourceId.toString()) {
      openModal()
    }
  })
</script>
<style scoped lang="postcss">
  .card {
    @apply flex-row justify-between;
    @apply w-full max-h-40 p-4;
    @apply bg-base-100 shadow-xl;
    @apply card-bordered border-base-content;
    --tw-border-opacity: 0.2;
  }
</style>
