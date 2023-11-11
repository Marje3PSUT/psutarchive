<template>
  <label class="h-28 block resource-card px-3">
    <input
      type="checkbox"
      name="resources"
      class="hidden absolute"
      @click="props.checkboxLogic"
    >
    <div class="relative border border-neutral-content rounded-xl h-full select-none shadow-xl bg-gradient-to-l rtl:bg-gradient-to-r from-secondary/10">
      <!-- Solved indicator -->
      <div
        v-if="item.material[0]?.is_solved"
        :class="indicator"
      >
        {{ $t("material.resource.exam.solved") }}
      </div>
      <!-- Drawer Div -->
      <div class="absolute w-full h-full overflow-hidden">
        <div
          class="top-1/2 absolute w-28 h-full -translate-y-1/2 bg-secondary text-secondary-content border-x border-x-neutral-content rounded-xl resource-drawer z-10"
        >
          <div class="arrow transition-opacity absolute h-full -left-12 rtl:-right-12 text-secondary flex flex-col justify-center -z-20">
            <Icon
              name="ic:sharp-keyboard-double-arrow-left"
              size="30"
              class="rtl:rotate-180"
            />
          </div>
          <div class="grid grid-cols-2 h-4/5">
            <button
              aria-label="report-button"
              :title="$t('material.report')"
              class="hover:text-neutral-50 transition-colors"
            >
              <Icon
                name="ion:flag-outline"
                size="24"
              />
            </button>

            <button
              aria-label="download-button"
              :title="$t('material.share')"
              class="hover:text-neutral-50 transition-colors"
              @click="share()"
            >
              <Icon
                name="ion:share-social-outline"
                size="24"
              />
            </button>
            <button

              aria-label="see-files-button"
              :title="$t('material.preview')"
              class="hover:text-neutral-50 transition-colors"
              @click="openModal()"
            >
              <Icon
                name="ion:list-outline"
                size="24"
              />
            </button>
            <button
              v-if="!loading"
              aria-label="download-button"
              :title="$t('material.download')"
              class="hover:text-neutral-50 transition-colors"
              @click="download(item.files?.data)"
            >
              <Icon
                name="ion:md-download"
                size="24"
              />
            </button>
            <div
              v-else
              class="flex justify-center items-center"
            >
              <span class="res-loading loading loading-spinner w-5" />
            </div>
          </div>
          <div class="text-xs opacity-75 text-center h-1/5 truncate">
            {{ filesCount }} {{ $t("material.files", filesCount) }},
            {{ totalSize ? (totalSize / 1024).toFixed(1) : 0 }}
            {{ $t("material.megabyte") }}
          </div>
        </div> 
      </div>
      <!-- Content Div-->
      <div class="absolute ml-6 w-3/4 h-full flex flex-col justify-center">
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
        <div class="font-mono text-xs">
          <span
            class="text-accent opacity-50 hover:text-accent-focus hover:opacity-100 tooltip"
            :data-tip="`${$t('misc.ownership')} TODO`"
          >
            <Icon
              name="ion:information-circle-outline"
              size="28"
            />
          </span>
          <span class="opacity-50 p-1 align-middle">
            {{
              item.createdBy
                ? `${$t("misc.by")} ${item.createdBy.firstname} ${item.createdBy.lastname
                }`
                : `${$t("misc.by")} ${$t("misc.anonymous")}`
            }}
          </span>
            
        </div>
      </div>
    </div>
  </label>

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
  },
  checkboxLogic: {
    type: Function,
    required: true
  }
});
const { locale } = useI18n();
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

const indicator = computed(() => {
  const style =
    "rounded-2xl w-20  text-center bg-accent text-accent-content font-mono absolute -translate-y-1/2 top-1/2 ";
  return style.concat(
    locale.value === "ar"
      ? "-right-10 rotate-90"
      : "left-0 -rotate-90 -translate-x-1/2 "
  );
});

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

<style scoped>

.resource-card .resource-drawer {
  @apply ltr:-right-[7rem];
  @apply rtl:-left-[7rem];
  transition-property: right left;
  transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
  transition-duration: 150ms;
  .arrow {
    @apply opacity-50
  }
}

.resource-card:hover .resource-drawer {
  @apply ltr:right-0;
  @apply rtl:left-0;
  .arrow {
    @apply opacity-0
  }
}

@media (hover: none) {
  .resource-card>input:checked+div .resource-drawer {
    @apply ltr:right-0;
    @apply rtl:left-0;
    .arrow {
    @apply opacity-0
  }
  }

  .resource-card:hover .resource-drawer {
    @apply ltr:-right-[7rem];
    @apply rtl:-left-[7rem];
    .arrow {
    @apply opacity-50
  }
  }
}

</style>
