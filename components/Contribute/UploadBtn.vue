<template>
  <NuxtLink
    class="btn btn-primary btn-md text-start"
    :to="$nuxt.$localePath('/upload')"
  >
    <span class="max-w-min">{{ $t('submit.title') }}</span>
    <Icon
      name="ion:md-cloud-upload"
      size="28"
    />
  </NuxtLink>
</template>
<script setup></script>
<style scoped lang="postcss"></style>
