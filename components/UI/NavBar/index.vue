<template>
  <div class="navbar bg-base-200 mb-16">
    <div class="navbar-start">
      <NuxtLink class="btn btn-ghost normal-case text-xl" :to="localePath('/')">
        {{ $t("psutarchive") }}
      </NuxtLink>
    </div>

    <!-- Navigation menu on md/lg screens -->
    <div class="navbar-center max-md:hidden">
      <UINavBarMenu />
    </div>

    <div class="navbar-end">
      <!-- Language toggle -->
      <UILangSwitcher class="max-md:hidden" />

      <!-- Theme toggle -->
      <UIThemeSwitcher />

      <!-- Navigation menu on small screens -->
      <UINavBarMobileMenu />
    </div>
  </div>
</template>
<script setup></script>
<style scoped lang="postcss">
.navbar {
  --tw-bg-opacity: 0.5;
}
</style>
