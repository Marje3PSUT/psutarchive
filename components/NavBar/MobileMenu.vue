<template>
  <div class="dropdown md:hidden">
    <label
      tabindex="0"
      class="btn btn-ghost md:hidden"
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        class="h-5 w-5"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
      >
        <path
          stroke-linecap="round"
          stroke-linejoin="round"
          stroke-width="2"
          d="M4 6h16M4 12h8m-8 6h16"
        />
      </svg>
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