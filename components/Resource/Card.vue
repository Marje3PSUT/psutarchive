<template>
  <label class="h-28 block resource-card">
    <input type="radio" name="resources" class="hidden absolute" />
    <div
      class="relative border border-neutral-content rounded-xl h-full cursor-pointer select-none"
    >
      <!-- Solved indicator -->
      <div v-if="item.material[0]?.is_solved" :class="indicator">
        {{ $t("material.resource.exam.solved") }}
      </div>
      <div class="relative w-full h-full overflow-hidden">
        <div
          class="top-1/2 absolute w-24 h-full -translate-y-1/2 bg-base-100 border-l border-l-neutral-content rounded-xl resource-drawer z-10"
        >
          <div class="grid grid-cols-2 h-4/5">
            <button
              aria-label="report-button"
              :title="$t('material.report')"
              class="hover:text-accent transition-colors"
            >
              <Icon name="ion:flag-outline" size="24" />
            </button>

            <button
              aria-label="download-button"
              :title="$t('material.share')"
              class="hover:text-accent transition-colors"
            >
              <Icon name="ion:share-social-outline" size="24" />
            </button>
            <a
              v-if="!containsMultipleFiles"
              :href="item.files?.data[0].attributes.url"
              :title="$t('material.open')"
              :download="item.files?.data[0].attributes.name"
              target="_blank"
              class="flex justify-center items-center cursor-pointer hover:text-accent transition-colors"
            >
              <Icon name="ion:md-open" size="24" />
            </a>
            <button
              v-else
              aria-label="see-files-button"
              :title="$t('material.preview')"
              class="hover:text-accent transition-colors"
              @click="openModal()"
            >
              <Icon name="ion:list-outline" size="24" />
            </button>
            <button
              aria-label="download-button"
              :title="$t('material.download')"
              class="hover:text-accent transition-colors"
              @click="download(item.files?.data)"
            >
              <Icon name="ion:md-download" size="24" />
            </button>
          </div>
          <div class="text-xs opacity-75 text-center h-1/5">
            {{ filesCount }} {{ $t("material.files", filesCount) }},
            {{ totalSize ? (totalSize / 1024).toFixed(1) : 0 }}
            {{ $t("material.megabyte") }}
          </div>
        </div>
        <div class="ml-6 w-3/4 h-full pt-1">
          <div :class="'text-lg font-bold mb-1 ' + titleSize">
            {{ $t(`material.resource.type.${resourceType}`) }} -
            <span class="text-secondary">{{
              item?.material[0]?.type &&
              $t(
                `material.resource.${resourceType}.type.${item.material[0].type}`
              )
            }}</span>
          </div>
          <div :class="'text-md font-bold ' + titleSize">
            {{
              item?.metadata?.semester &&
              $t(`material.semesters.${item.metadata.semester.toLowerCase()}`)
            }}
            <span class="text-secondary">{{ item?.metadata?.year }}</span>
          </div>
          <div
            v-if="resourceType === 'note'"
            class="text-xs opacity-75 line-clamp-2 h-2/5"
          >
            {{ item.material[0]?.title }}
          </div>
          <div class="font-mono text-xs opacity-50 h-1/5">
            {{
              item.createdBy
                ? `${$t("misc.by")} ${item.createdBy.firstname} ${
                    item.createdBy.lastname
                  }`
                : `${$t("misc.by")} ${$t("misc.team")}`
            }}
          </div>
        </div>
      </div>
    </div>
  </label>

  <!-- preview files modal -->
  <ResourceModal
    v-if="filesCount > 1"
    :id="resourceId"
    @closed="modalIsOpen = false"
  >
    <template v-if="modalIsOpen" #content>
      <div class="border-b border-base-content border-opacity-50 my-4">
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
        <div v-if="item.material[0]?.title" class="text-xs p-2">
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
  },
});
const { locale } = useI18n();
const route = useRoute();

const loading = ref(false);
const resourceType = ref(
  props.item.material[0]?.__component?.includes("exam") ? "exam" : "note"
);
const filesCount = ref<number>(props.item.files?.data.length as number);

const indicator = computed(() => {
  const style =
    "rounded-md w-20  text-center bg-accent text-accent-content font-mono absolute -translate-y-1/2 top-1/2 ";
  return style.concat(
    locale.value === "ar"
      ? "-right-10 rotate-90"
      : "left-0 -rotate-90 -translate-x-1/2 "
  );
});

const titleSize = computed(() => {
  return resourceType.value === "note" ? "h-1/5" : "h-2/5";
});

const containsMultipleFiles = computed(() => {
  return filesCount.value > 1;
});

// get total size of all files of this resource
const totalSize = ref(
  props.item.files?.data.reduce<number>(
    (sum: number, curr: StrapiItem<MediaAttributes>) =>
      sum + curr.attributes.size,
    0
  )
);

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

const modalIsOpen = ref(false);
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

onMounted(() => {
  if (route.query.res === props.resourceId.toString()) {
    openModal();
  }
});
</script>

<style scoped>
.resource-card .resource-drawer {
  right: -7rem;
  transition-property: right;
  transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
  transition-duration: 150ms;
}
.resource-card > input:checked + div .resource-drawer {
  right: 0;
}
</style>
