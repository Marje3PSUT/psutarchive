<template>
  <div class="indicator card card-compact p-4 border border-neutral-content rounded-xl h-full w-full resource-card flex flex-row justify-between">
    <!-- Solved exam indicator -->
    <span
      v-if="item.material[0]?.is_solved"
      class="indicator-item indicator-start indicator-middle rounded-2xl text-sm w-20 text-center badge badge-secondary font-mono left-0 -rotate-90 rtl:-right-10 rtl:rotate-90"
    >
      {{ $t("material.resource.exam.solved") }}
    </span>

    <!-- Main card content -->
    <div class="h-full select-none flex flex-col justify-center">
      <div class="text-lg font-bold">
        <span class="text-secondary-focus">
          {{
            item?.material[0]?.type &&
              $t(
                `material.resource.${resourceType}.type.${item.material[0].type}`
              )
          }}
        </span>
      </div>
      <div class="text-md font-bold">
        {{
          item?.metadata?.semester &&
            $t(`material.semesters.${item.metadata.semester.toLowerCase()}`)
        }}
        <span class="text-secondary-focus">{{ item?.metadata?.year }}</span>
      </div>
      <div
        v-if="resourceType === 'note'"
        dir="ltr"
        class="text-xs opacity-75 truncate text-secondary rtl:text-right"
      >
        {{ item.material[0]?.title }}
      </div>
    </div>
    <!-- Action Buttons -->
    <div class="w-36 h-full border-s border-neutral-content border-opacity-40">
      <div class="grid grid-cols-2 h-4/5">
        <button
          aria-label="report-button"
          :title="$t('material.report')"
          class="action-btn"
        >
          <Icon
            name="ion:flag-outline"
            size="26"
          />
        </button>

        <button
          aria-label="download-button"
          :title="$t('material.share')"
          class="action-btn"
          @click="share()"
        >
          <Icon
            name="ion:share-social-outline"
            size="26"
          />
        </button>
        <button
          aria-label="see-files-button"
          :title="$t('material.preview')"
          class="action-btn"
          @click="openModal()"
        >
          <Icon
            name="ion:list-outline"
            size="26"
          />
        </button>
        <button
          v-if="!loading"
          aria-label="download-button"
          :title="$t('material.download')"
          class="action-btn"
          @click="download(item.files?.data)"
        >
          <Icon
            name="ion:md-download"
            size="26"
          />
        </button>
        <div
          v-else
          class="flex justify-center items-center"
        >
          <span class="res-loading loading loading-spinner w-5" />
        </div>
      </div>
      <div class="flex gap-2 items-center justify-center">
        <div class="text-xs opacity-75 text-center h-1/5 truncate">
          {{ filesCount }} {{ $t("material.files", filesCount) }},
          {{ totalSize ? (totalSize / 1024).toFixed(1) : 0 }}
          {{ $t("material.megabyte") }}
        </div>
        <div
          class="ltr:tooltip-left rtl:tooltip-right w-max font-mono text-xs text-secondary tooltip whitespace-pre-line !text-start"
          :data-tip="attributionText"
        >
          <Icon
            name="ion:information-circle-outline"
            size="24"
          />
        </div>
      </div>
    </div> 
  </div>
  <!-- preview files modal -->
  <ResourceModal
    :id="resourceId"
    @closed="modalIsOpen = false"
  >
    <template
      v-if="modalIsOpen"
      #content
    >
      <div class="border-b border-base-content border-opacity-50 my-4 w-full">
        <div class="capitalize text-lg font-bold flex justify-between p-2">
          <span>
            {{ $t(`material.resource.type.${resourceType}`) }} -
            <span class="text-secondary-focus">
              {{
                $t(
                  `material.resource.${resourceType}.type.${item.material[0].type}`
                )
              }}
            </span>
          </span>
          <span>
            <span v-if="item.metadata?.semester">
              {{
                $t(
                  `material.semesters.${item.metadata.semester?.toLowerCase()}`
                )
              }}
              -
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
      <div class="flex flex-col gap-4">
        <div
          v-for="file in item.files?.data"
          :key="file.id"
          class="flex w-full justify-end items-center border-b border-base-content border-opacity-25 gap-3 last:border-none pb-4"
        >
          <span
            dir="ltr"
            class="font-mono grow truncate rtl:text-right"
          >{{ file.attributes.name }}</span>
          <span class="text-center text-sm w-20 shrink-0">
            {{ (file.attributes.size / 1024).toFixed(2) }}
            {{ $t("material.megabyte") }}
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
            v-if="!loading"
            aria-label="download-button"
            class="res-download tooltip tooltip-accent z-20"
            :data-tip="$t('material.download', filesCount)"
            @click="download(item.files?.data)"
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
    default: "",
  },
  resourceId: {
    type: Number,
    required: true,
  }
});
const route = useRoute();
const router = useRouter();

const modalIsOpen = ref(false);
const loading = ref(false);
const resourceType = ref(
  props.item.material[0]?.__component?.includes("exam") ? "exam" : "note"
);
const filesCount = ref<number>(props.item.files?.data.length as number);
const totalSize = ref(
  props.item.files?.data.reduce<number>(
    (sum: number, curr: StrapiItem<MediaAttributes>) =>
      sum + curr.attributes.size,
    0
  )
);

const { t } = useI18n()

const attributionText = ref( 
  props.item.createdBy
    ? `${t("misc.by")} ${props.item.createdBy.firstname} ${props.item.createdBy.lastname
    }`
    : `${t("misc.by")} ${t("misc.anonymous")}` + '\n' +
    `${t('misc.ownership')} TODO`
  )

onMounted(() => {
  if (route.query.res === props.resourceId.toString()) {
    openModal();
  }
});

const share = () => {
  const query = {
    ...route.query,
    res: props.resourceId,
  };

  const url = router.resolve({
    path: route.fullPath,
    query: query,
  });

  const fullUrl = window.location.origin + url.fullPath;

  if (navigator.share && navigator.canShare({ url: fullUrl })) {
    navigator.share({ url: fullUrl });
} else {
  navigator.clipboard.writeText(fullUrl);
}
}

const download = async (
  files: StrapiItem<MediaAttributes>[] | undefined = props.item.files?.data
) => {
  loading.value = true;

  // get urls of files
  const urls = ref(
    files?.map((f) => ({
      url: f.attributes.url,
      source: f.attributes.provider,
    }))
  );

  const fileExt = ref("");
  const fileType = ref("");

  const { data } = await useFetch<Blob>("/api/download", {
    method: "POST",
    body: {
      files: urls.value,
    },
    onResponse({ response }) {
      const ext: string | null = response.headers.get("file-extension");
      fileExt.value = ext ? `.${ext}` : "";
      fileType.value = response.headers.get("content-type") as string;
    },
  });
  const fileName = [
    "PSUTArchive",
    `${props.courseId}`,
    [props.item.material[0]?.type, resourceType.value]
      .filter(Boolean)
      .join("-"),
    [props.item.metadata?.semester?.toLowerCase(), props.item.metadata?.year]
      .filter(Boolean)
      .join("-"),
  ].join(".");

  const file = new File([data.value as Blob], `${fileName}${fileExt.value}`, {
    type: fileType.value,
  });
  const downloadLink = window.URL.createObjectURL(file);
  const a = document.createElement("a");
  a.href = downloadLink;
  a.download = `${fileName}${fileExt.value}`;
  a.click();
  loading.value = false;
};
const openModal = () => {
  // open modal
  modalIsOpen.value = true;
  (
    document.getElementById(`res_${props.resourceId}`) as HTMLDialogElement
  ).showModal();

  // add url query
  const query = {
    ...route.query,
    res: props.resourceId,
  };
  return navigateTo({
    path: route.fullPath,
    query: query,
    replace: true,
  });
};
</script>

<style scoped lang="postcss">
.action-btn {
  @apply hover:text-secondary transition-colors;
}
</style>
