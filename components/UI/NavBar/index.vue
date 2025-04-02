<script setup lang="ts">
const route = useRoute();

const path = computed(() =>
  route.fullPath.endsWith('/') ? route.fullPath.substring(0, route.fullPath.length - 1) : route.fullPath,
);
</script>

<template>
  <div class="main-navbar mb-16 sticky top-0 z-20">
    <div class="navbar container mx-auto">
      <div class="navbar-start">
        <!-- Back button -->
        <ClientOnly>
          <NuxtLink
            v-if="path && path.replace('ar', '') !== '/'"
            class="btn btn-circle btn-ghost"
            :to="path.substring(0, path.lastIndexOf('/')) || '/'"
            replace
          >
            <Icon class="rtl:rotate-180" name="ion:arrow-back" size="24" />
          </NuxtLink>
        </ClientOnly>
        <!-- Logo & Homepage -->
        <NuxtLink class="!btn !btn-ghost hover:!bg-transparent !normal-case !text-xl" :to="$nuxt.$localePath('/')">
          <img
            class="logo"
            :src="useTheme().value === 'dark' ? '/logo/logo_white.svg' : '/logo/logo_black.svg'"
            alt="PSUT Archive logo"
            width="40"
          />
          {{ $t('psutarchive') }}
        </NuxtLink>
      </div>

      <!-- Navigation menu on md/lg screens -->
      <div class="navbar-center max-lg:hidden">
        <UINavBarMenu />
      </div>

      <div class="navbar-end gap-x-2">
        <!-- Language toggle -->
        <UILangSwitcher class="max-lg:hidden" />

        <!-- Theme toggle -->
        <UIThemeSwitcher class="max-lg:hidden" />

        <!-- Navigation menu on small screens -->
        <UINavBarMobileMenu />
      </div>
    </div>
  </div>
</template>

<style scoped lang="postcss">
.main-navbar {
  @apply bg-base-100 bg-opacity-50 border border-base-100 border-opacity-50;
  box-shadow: 0 4px 30px rgba(0, 0, 0, 0.1);
  backdrop-filter: blur(15.8px);
  -webkit-backdrop-filter: blur(15.8px);
}
</style>
