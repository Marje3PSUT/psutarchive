<template>
  <div class="z-10 dropdown md:hidden">
    <label
      tabindex="0"
      class="btn btn-ghost md:hidden p-0"
    >
      <Icon
        name="ion:menu"
        size="32"
      />
    </label>
    <ul
      tabindex="0"
      class="menu menu-compact dropdown-content"
    >
      <li
        tabindex="0"
        class="rounded-t-box"
      >
        <NuxtLink :to="localePath('/courses')">
          {{ $t("courses.title") }}
        </NuxtLink>
      </li>
      <li>
        <NuxtLink :to="localePath('/upload')">
          {{ $t("submit.title") }}
        </NuxtLink>
      </li>
      <li>
        <NuxtLink :to="localePath('/about')">
          {{ $t("about.title") }}
        </NuxtLink>
      </li>
      <li class="rounded-b-box">
        <UILangSwitcher />
      </li>
    </ul>
  </div>
</template>
<script setup>
  const localePath = useLocalePath()
</script>
<style scoped lang="postcss"> 
  .menu {
    --tw-bg-opacity: 0.8;
    @apply mt-2 p-2 w-60 -ms-[12.5rem];
    @apply rounded-b-box ltr:rounded-br-none rtl:rounded-bl-none border border-base-300 border-t-0;
    @apply shadow bg-base-200;
  }
  ul li {
    @apply bg-base-200;
    --tw-bg-opacity: 0.8;
  }
</style>