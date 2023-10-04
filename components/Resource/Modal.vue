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
  const emit = defineEmits(['closed'])
  const closeModal = () => {
    emit('closed')
  }
</script>

<style lang="postcss" scoped></style>
