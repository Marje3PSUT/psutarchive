<template>
  <dialog
    :id="`res_${id}`"
    class="modal modal-bottom sm:modal-middle"
  >
    <div class="modal-box">
      <form method="dialog">
        <button
          aria-label="close dialog"
          class="btn btn-sm text-xl btn-circle btn-ghost absolute right-2 top-2"
          @click="closeModal"
        >
          ✕
        </button>
      </form>
      <slot name="content" />
    </div>
    <form
      method="dialog"
      class="modal-backdrop"
    >
      <button
        aria-label="close dialog"
        class="cursor-default"
        @click="closeModal"
      >
        close
      </button>
    </form>
  </dialog>
</template>

<script lang="ts" setup>
  defineProps({
    id: {
      type: Number,
      required: true,
    },
  })
  const route = useRoute()
  const emit = defineEmits(['closed'])

  const closeModal = () => {
    emit('closed')

    // remove url query
    const query = {
      ...route.query,
      res: undefined,
    }
    return navigateTo({
      path: route.fullPath,
      query: query,
      replace: true,
    })
  }
</script>

<style lang="postcss" scoped></style>
