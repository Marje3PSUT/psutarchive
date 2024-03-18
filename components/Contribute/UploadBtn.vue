<script setup>
const runtimeConfig = useRuntimeConfig();
</script>

<template>
  <NuxtLink class="btn btn-primary btn-md text-start" :to="runtimeConfig.public.editorUrl">
    <span class="max-w-min">{{ $t('submit.title') }}</span>
    <Icon name="ion:md-cloud-upload" size="28" />
  </NuxtLink>
</template>

<style scoped lang="postcss"></style>
