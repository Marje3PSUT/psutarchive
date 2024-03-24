<script setup>
const runtimeConfig = useRuntimeConfig();
</script>

<template>
  <ul class="menu menu-horizontal px-1">
    <li tabindex="0">
      <NuxtLink :to="localePath('/courses')">
        {{ $t('courses.title') }}
      </NuxtLink>
    </li>
    <li>
      <NuxtLink :to="runtimeConfig.public.editorUrl" target="_blank" class="animate-pulseColor">
        {{ $t('submit.title') }}
      </NuxtLink>
    </li>
    <li>
      <NuxtLink :to="localePath('/about')">
        {{ $t('about.title') }}
      </NuxtLink>
    </li>
  </ul>
</template>

<style scoped lang="postcss">
@keyframes pulseColor {
  0%,
  100% {
    background-color: #0f1729;
    color: #adafb5;
  }
  50% {
    background-color: #adafb5;
    color: #0f1729;
  }
}
.animate-pulseColor {
  animation: pulseColor 1s infinite;
}
</style>
