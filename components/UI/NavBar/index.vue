<template>
  <div class="navbar bg-base-200 mb-16 sticky top-0 z-20">
    <div class="navbar-start">
      <button
        v-if="route.fullPath.replace('ar', '') !== '/'"
        class="btn btn-circle btn-ghost"
        @click="$nuxt.$router.back()"
      >
        <Icon
          class="rtl:rotate-180"
          name="ion:arrow-back"
          size="24"
        />
      </button>
      <NuxtLink
        class="btn btn-ghost hover:bg-base-200 normal-case text-xl"
        :to="$nuxt.$localePath('/')"
      >
        {{ $t("psutarchive") }}
      </NuxtLink>
    </div>

    <!-- Navigation menu on md/lg screens -->
    <div class="navbar-center max-md:hidden">
      <UINavBarMenu />
    </div>

    <div class="navbar-end gap-x-2">
      <!-- Language toggle -->
      <UILangSwitcher class="max-md:hidden" />

      <!-- Theme toggle -->
      <UIThemeSwitcher />

      <!-- Navigation menu on small screens -->
      <UINavBarMobileMenu />
    </div>
  </div>
</template>
<script setup lang="ts">
  const route = useRoute()
</script>
<style scoped lang="postcss"></style>
