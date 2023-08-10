<template>
  <ul class="menu menu-horizontal px-1">
    <li tabindex="0">
      <NuxtLink :to="localePath('/courses')">
        {{ $t("courses") }}
      </NuxtLink>
    </li>
    <li>
      <NuxtLink :to="localePath('/upload')">
        {{ $t("submit") }}
      </NuxtLink>
    </li>
    <li>
      <NuxtLink :to="localePath('/about')">
        {{ $t("about") }}
      </NuxtLink>
    </li>
  </ul>
</template>
<script setup></script>
