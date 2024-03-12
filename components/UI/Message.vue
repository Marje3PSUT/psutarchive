<script lang="ts" setup>
defineProps({
  type: {
    // alert-info / alert-success /  alert-warning / alert-error (to generate tailwind styles for them in build time)
    type: String as PropType<'info' | 'success' | 'warning' | 'error'>,
    default: () => 'info',
  },
  message: {
    type: String,
    required: true,
  },
  showIcon: {
    type: Boolean,
    default: true,
  },
});

const icons = {
  info: 'ion:information-circle-outline',
  success: 'ion:ios-checkmark-circle-outline',
  warning: 'ion:warning-outline',
  error: 'ion:close-circle-outline',
};
</script>

<template>
  <div class="alert" :class="`alert-${type} bg-${type} text-${type}-content ${$attrs.class ? $attrs.class : ''}`">
    <Icon v-if="showIcon" :name="icons[type]" :class="`stroke-${type}`" size="24" class="min-w-[24px]" />
    <span class="flex flex-col items-start">
      {{ message }}
      <slot />
    </span>
  </div>
</template>

<style lang="postcss" scoped></style>
