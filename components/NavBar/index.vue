<!-- eslint-disable vue/multi-word-component-names -->
<template>
  <div class="navbar bg-base-200 mb-16">
    <div class="navbar-start">
      <NuxtLink
        class="btn btn-ghost normal-case text-xl"
        :to="localePath('/')"
      >
        {{ $t("psutarchive") }}
      </NuxtLink>
    </div>

    <!-- Navigation menu on md/lg screens -->
    <div class="navbar-center max-md:hidden">
      <NavBarMenu />
    </div>

    <div class="navbar-end">
      <!-- Language toggle -->
      <NavBarLangSwitcher class="max-md:hidden" />
      
      <!-- Theme toggle -->
      <NavBarThemeSwitcher />
      
      <!-- Navigation menu on small screens -->
      <NavBarMobileMenu />
    </div>
  </div>
</template>
<script setup></script>
