<template>
  <div class="deploy-info-container">
    <div>
      v{{ version }}
    </div>
    <NuxtLink
      :to="`${config.public.repoUrl}/commits/${config.public.buildCommitBranch}`"
      :title="config.public.buildCommitMessage"
      class="link hover:text-primary"
    >
      {{ config.public.buildCommitSha ? config.public.buildCommitSha.slice(0, 7) : 'commits' }}
    </NuxtLink>
  </div>
</template>
<script setup lang="ts">
  const {data: version} = await useFetch('/api/getVersion')
  const config = useRuntimeConfig()
</script>
<style scoped lang="postcss">
  .deploy-info-container {
    @apply flex flex-col justify-center items-center gap-2;
    @apply p-2 mx-auto absolute bottom-5 right-0 left-0 w-72;
    @apply rounded-xl bg-neutral font-mono text-[white];
    --tw-bg-opacity: 0.4;
  } 
</style>
