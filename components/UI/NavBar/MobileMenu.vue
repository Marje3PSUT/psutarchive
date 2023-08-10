<template>
  <div class="dropdown md:hidden">
    <label
      tabindex="0"
      class="btn btn-ghost md:hidden"
    >
      <Icon
        name="solar:hamburger-menu-outline"
        size="32"
      />
    </label>
    <ul
      tabindex="0"
      class="menu menu-compact dropdown-content mt-4 p-2 shadow bg-base-100 rounded-box w-60 border -ms-48"
    >
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
      <li><NavBarLangSwitcher /></li>
    </ul>
  </div>
</template>
<script setup></script>
<style scoped lang="postcss"></style>