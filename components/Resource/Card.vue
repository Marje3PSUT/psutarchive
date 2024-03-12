<script setup lang="ts">
import { DirectusFile, DirectusUser, ExamDatum, NoteDatum, Resource } from 'types/schema';

const props = defineProps({
  item: {
    type: Object as PropType<Resource>,
    required: true,
  },
  courseId: {
    type: String,
    required: false,
    default: '',
  },
  resourceId: {
    type: Number,
    required: true,
  },
});

const runtimeConfig = useRuntimeConfig();
const { locale } = useI18n();
const route = useRoute();

const loading = ref(false);

const filesList = computed(() =>
  props.item.files.map((resourceFileEntry) => resourceFileEntry.directus_files_id as DirectusFile),
);

const filesCount = computed(() => filesList.value!.length);

// Exam_data or Note_data
const resourceSubTypeData = computed(() =>
  props.item.type === 'exam' ? (props.item.exam_data as ExamDatum) : (props.item.note_data as NoteDatum),
);
/*
const getFileName = (file: DirectusFile) =>
  props.item.type==="note"?file.filename_download:
  [
    "PSUTArchive",
    props.courseId,
    props.item.type,
    props.item.year,
    props.item?.semester,
    (props.item.exam_data as ExamDatum).type,
    (props.item.exam_data as ExamDatum).solved?'solved':'unsolved',
  ].join("_")+'.'+file.filename_disk?.split('.')[1];
  */

const getFileUrl = (file: DirectusFile) => {
  return `${runtimeConfig.public.apiUrl}/assets/${file.filename_disk?.split('.')[0]}`;
};

const getBundleFileUrl = (resourceId: number) => {
  return `/resource/bundle/${resourceId}`;
};

// get total size of all files of this resource
const totalSize = computed(
  () => filesList.value?.reduce<number>((sum: number, curr) => sum + parseInt(curr.filesize), 0),
);

const modalIsOpen = ref(false);

const openModal = () => {
  // open modal
  modalIsOpen.value = true;

  (document.getElementById(`res_${props.resourceId}`) as HTMLDialogElement).showModal();

  // add url query
  const query = {
    ...route.query,
    res: props.resourceId,
  };

  return navigateTo({
    path: route.fullPath,
    query,
    replace: true,
  });
};

onMounted(() => {
  if (route.query.res === props.resourceId.toString()) {
    openModal();
  }
});
</script>

<template>
  <div class="card card-compact indicator h-full" :class="`res-${resourceId}`">
    <div class="card-info flex flex-col m-2 px-2 h-full justify-around items-start my-auto">
      <div class="res-type capitalize text-lg font-bold">
        <span class="text-secondary">
          {{ $t(`material.resource.${props.item.type}.type.${resourceSubTypeData.type}`) }}
        </span>
      </div>
      <div v-if="item" class="res-metadata">
        <span v-if="item.semester">{{ $t(`material.semesters.${item.semester?.toLowerCase()}`) }} -</span>
        <span class="text-secondary font-semibold">
          {{ item.year }}
        </span>
      </div>
      <div v-if="props.item.type === 'note'" class="res-title text-xs opacity-75 max-h-10 line-clamp-3 overflow-clip">
        {{ (resourceSubTypeData as NoteDatum).title }}
      </div>
      <div v-if="item.user_created" class="res-author text-xs opacity-50 whitespace-nowrap mt-2">
        {{ $t('misc.by') }}
        {{ `${(item.user_created as DirectusUser).first_name} ${(item.user_created as DirectusUser).last_name}` }}
      </div>
    </div>
    <div class="card-action flex flex-col items-center gap-y-2 text-xs font-extralight">
      <span class="res-count min-w-max font-normal">{{ filesCount }} {{ $t('material.files', filesCount) }}</span>
      <div class="res-actions flex justify-center items-center gap-1">
        <a
          v-if="!loading"
          aria-label="download-button"
          class="res-download tooltip tooltip-accent"
          :data-tip="$t('material.download', filesCount)"
          :href="filesCount > 1 ? getBundleFileUrl(props.resourceId) : getFileUrl(filesList[0]) + '?download'"
          target="_blank"
        >
          <Icon name="ion:md-download" size="32" class="cursor-pointer hover:text-accent transition-[200ms]" />
        </a>
        <span v-else class="res-loading loading loading-spinner w-9 text-accent" />
        <button
          v-if="filesCount > 1"
          aria-label="see-files-button"
          class="res-folder tooltip tooltip-accent"
          :data-tip="$t('material.preview')"
          @click="openModal()"
        >
          <Icon name="ion:folder" size="32" class="cursor-pointer hover:text-accent transition-[200ms]" />
        </button>
        <a
          v-else
          :href="getFileUrl(filesList[0])"
          target="_blank"
          class="res-open tooltip tooltip-accent"
          :data-tip="$t('material.open')"
        >
          <Icon name="ion:md-open" size="32" class="cursor-pointer hover:text-accent transition-[200ms]" />
        </a>
        <!-- <button
          aria-label="share-resource"
          class="tooltip tooltip-accent z-20"
          :data-tip="$t('material.preview')"
        >
          <Icon
            name="ion:md-share"
            size="32"
            class="cursor-pointer hover:text-accent transition-[200ms]"
          />
        </button> -->
      </div>
      <span v-if="totalSize" class="res-size min-w-max text-center">
        {{ totalSize / 2 ** 20 > 1 ? (totalSize / 2 ** 20).toFixed(2) : `< 1` }}
        {{ $t('material.megabyte') }}
      </span>
    </div>

    <!-- solved exam indicator -->
    <span
      v-if="item.type === 'exam' && (item.exam_data as ExamDatum).solved"
      class="indicator-item indicator-middle badge badge-secondary uppercase font-bold"
      :class="locale === 'en' ? 'indicator-start -rotate-90' : 'indicator-end rotate-90'"
    >
      {{ $t('material.resource.exam.solved') }}
    </span>

    <!-- preview files modal -->
    <ResourceModal v-if="filesCount > 1" :id="resourceId" @closed="modalIsOpen = false">
      <template v-if="modalIsOpen" #content>
        <div class="border-b border-base-content border-opacity-50 my-4">
          <div class="capitalize text-lg font-bold flex justify-between p-2">
            <span>
              {{ $t(`material.resource.type.${item.type}`) }} -
              <span class="text-secondary-focus">
                {{ $t(`material.resource.${item.type}.type.${resourceSubTypeData.type}`) }}
              </span>
            </span>
            <span>
              <span v-if="item?.semester">{{ $t(`material.semesters.${item.semester?.toLowerCase()}`) }} -</span>
              {{ item?.year }}
            </span>
          </div>
          <div v-if="item.type === 'note' && (item.note_data as NoteDatum).title" class="text-xs p-2">
            {{ (item.note_data as NoteDatum).title }}
          </div>
        </div>
        <div class="flex flex-col gap-2">
          <div
            v-for="file in filesList"
            :key="file.filename_disk!.split('.')[0]"
            dir="ltr"
            class="border-b border-base-content border-opacity-25 p-2 flex items-center gap-4 last:border-none"
          >
          <span class="font-mono sm:w-1/2 w-full truncate sm:truncate-none">{{ file.filename_download }}</span>
            <span class="text-center text-sm ms-auto">
              {{ (parseInt(file.filesize) / 2 ** 20).toFixed(2) }}
              {{ $t('material.megabyte') }}
            </span>
            <a :href="getFileUrl(file)" target="_blank" :title="$t('material.open')">
              <Icon name="ion:md-open" size="24" class="cursor-pointer hover:text-accent transition-[200ms]" />
            </a>
            <a aria-label="download-button" :title="$t('material.download')" :href="getFileUrl(file)">
              <Icon name="ion:md-download" size="24" class="cursor-pointer hover:text-accent transition-[200ms]" />
            </a>
          </div>
        </div>
      </template>
    </ResourceModal>
  </div>
</template>

<style scoped lang="postcss">
.card {
  @apply flex-row justify-between;
  @apply w-full max-h-40 p-4;
  @apply bg-base-100 shadow-xl;
  @apply card-bordered border-base-content;
  --tw-border-opacity: 0.2;
  /* List view style */
  &.list {
    .card-info,
    .card-action {
      @apply md:flex-row md:gap-4 md:items-center;
    }
    .res-actions {
      @apply md:order-3;
    }
    .res-author {
      @apply md:mt-0;
    }
  }
}
</style>
