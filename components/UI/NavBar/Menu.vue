<script setup></script>

<template>
  <ul class="menu menu-horizontal px-1">
    <li tabindex="0">
      <NuxtLink :to="localePath('/courses')">
        {{ $t('courses.title') }}
      </NuxtLink>
    </li>
    <li>
      <NuxtLink :to="localePath('/upload')">
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
