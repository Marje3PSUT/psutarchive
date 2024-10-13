<script setup>
const runtimeConfig = useRuntimeConfig();
</script>

<template>
  <ul
    class="menu items-center gap-4 menu-horizontal px-1 [&_a]:border [&_a]:border-transparent hover:[&_a]:border-base-content"
  >
    <li>
      <NuxtLink :to="localePath('/courses')" class="max-lg:!bg-base-200">
        {{ $t('courses.title') }}
      </NuxtLink>
    </li>
    <li>
      <NuxtLink
        target="_blank"
        :to="runtimeConfig.public.editorUrl"
        class="btn btn-sm btn-outline btn-secondary !border-secondary font-bold"
      >
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
