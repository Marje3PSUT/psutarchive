<script setup lang="ts">
type Link = {
  name: string;
  icon?: string;
  url: string;
  external?: boolean;
};

const socialLinks: Link[] = [
  {
    name: 'Facebook',
    icon: 'ion:logo-facebook',
    url: 'https://www.facebook.com/marje3psut',
    external: true,
  },
  {
    name: 'Instagram',
    icon: 'ion:logo-instagram',
    url: 'https://www.instagram.com/marje3.psut/',
    external: true,
  },
  {
    name: 'Discord',
    icon: 'ion:logo-discord',
    url: 'https://discord.gg/SKEuduaVEC',
    external: true,
  },
  {
    name: 'GitHub',
    icon: 'ion:logo-github',
    url: 'https://github.com/Marje3PSUT/',
    external: true,
  },
];

const siteLinks: Link[] = [
  {
    name: 'courses',
    url: '/courses',
  },
  {
    name: 'submit',
    url: useRuntimeConfig().public.editorUrl,
    external: true,
  },
  {
    name: 'about',
    url: '/about',
  },
  {
    name: 'contact',
    url: '/about#contact',
  },
  {
    name: 'terms',
    url: '/about#terms',
  },
  {
    name: 'privacy',
    url: '/about#privacy',
  },
];
</script>

<template>
  <footer class="footer mt-16 gap-y-8 footer-center p-10 bg-base-200 text-base-content">
    <nuxt-link
      :to="$nuxt.$localePath('/')"
      title="homepage"
      class="hover:text-accent transition-colors text-lg font-bold"
    >
      {{ $t('psutarchive') }}
    </nuxt-link>
    <nav class="flex flex-wrap gap-4 justify-center">
      <template v-for="link in siteLinks" :key="link.name">
        <a v-if="link.external" :href="link.url" target="_blank" class="link link-hover">
          {{ $t(`footer.links.${link.name}`) }}
        </a>
        <nuxt-link
          v-else
          :to="{
            path: $nuxt.$localePath(link.url),
            hash: link.url.includes('#') ? link.url.substring(link.url.indexOf('#')) : undefined,
          }"
          class="link link-hover"
        >
          {{ $t(`footer.links.${link.name}`) }}
        </nuxt-link>
      </template>
    </nav>
    <nav class="flex flex-wrap gap-4 justify-center">
      <nuxt-link
        v-for="(link, i) in socialLinks"
        :key="i"
        :title="link.name"
        :to="link.url"
        external
        target="'_blank'"
        class="hover:scale-110 transition-all hover:text-accent"
      >
        <Icon :name="link.icon as string" size="24" />
      </nuxt-link>
    </nav>
  </footer>
</template>

<style scoped></style>
