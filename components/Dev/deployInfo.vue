<script setup lang="ts">
const { data: version } = await useFetch('/api/version');
const config = useRuntimeConfig();
const open = ref(true);
</script>

<template>
  <div v-if="open" class="deploy-info-container" dir="ltr">
    <div class="ms-auto">Development v{{ version }}</div>
    <span class="mx-2">•</span>
    <p class="me-auto">
      Last update:
      <NuxtLink
        :to="`${config.public.repoUrl}/commits/${config.public.buildCommitBranch}`"
        :title="config.public.buildCommitMessage"
        class="link hover:text-primary"
        target="_blank"
      >
        {{ config.public.buildCommitSha ? config.public.buildCommitSha.slice(0, 7) : 'commits' }}
      </NuxtLink>
    </p>
    <button title="close banner" class="cursor-pointer hover:text-primary" @click="open = false">[x]</button>
  </div>
</template>

<style scoped lang="postcss">
.deploy-info-container {
  @apply flex flex-row justify-center items-center gap-x-2 p-1;
  @apply bg-neutral font-mono text-[white];
}
</style>
