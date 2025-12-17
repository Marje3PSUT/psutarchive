<script setup>
import { ref } from 'vue';

const runtimeConfig = useRuntimeConfig();
const detailsElement = ref(null);

const close = () => {
  detailsElement.value.removeAttribute('open');
};
</script>

<template>
  <details ref="detailsElement" class="z-10 dropdown lg:hidden rounded-lg">
    <summary tabindex="0" class="btn btn-ghost lg:hidden p-0">
      <Icon name="ion:menu" size="32" />
    </summary>
    <ul class="menu dropdown-content gap-y-4 [&_a]:border [&_a]:border-transparent hover:[&_a]:border-base-content">
      <li>
        <NuxtLink :to="$nuxt.$localePath('/courses')" @click="close">
          {{ $t('courses.title') }}
        </NuxtLink>
      </li>
      <li>
        <NuxtLink
          target="_blank"
          :href="runtimeConfig.public.editorUrl"
          class="btn btn-sm btn-primary !border-primary font-bold"
          @click="close"
        >
          {{ $t('submit.title') }}
        </NuxtLink>
      </li>
      <li>
        <NuxtLink :to="$nuxt.$localePath('/about')" @click="close">
          {{ $t('about.title') }}
        </NuxtLink>
      </li>
      <li class="rounded-b-box" @click="close()">
        <UILangSwitcher />
      </li>
      <li class="rounded-b-box" @click="close()">
        <UIThemeSwitcher />
      </li>
    </ul>
    <div class="h-screen w-screen -z-10 bg-base-100 bg-opacity-10 absolute top-0 end-0" @click="close"></div>
  </details>
</template>

<style scoped lang="postcss">
.menu {
  @apply mt-2 p-2 w-60 -ms-[12.5rem];
  @apply rounded-b-box ltr:rounded-br-none rtl:rounded-bl-none;
  @apply shadow bg-base-100 bg-opacity-100;
  @apply border  border-t-0 border-base-100 border-opacity-50;
  backdrop-filter: blur(15.8px);
  -webkit-backdrop-filter: blur(15.8px);
}

/* Firefox */
@-moz-document url-prefix() {
  .menu {
    @apply bg-opacity-20;
  }
}

/* Safari */
_::-webkit-full-page-media,
_:future,
:root .menu {
  @apply bg-opacity-20;
}
</style>
