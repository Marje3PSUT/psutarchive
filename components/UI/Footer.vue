<script setup lang="ts">
const { siteLinks, socialLinks, sponsorLinks } = useLinks();
</script>

<template>
  <footer class="footer mt-16 gap-y-8 footer-center p-10 pb-32 bg-base-200 text-base-content">
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
    <div class="flex flex-col justify-center items-center">
      <div class="text-lg font-bold">
        {{ $t('footer.sponsors.title') }}
      </div>
      <div class="flex flex-wrap gap-4 justify-center">
        <nuxt-link
          v-for="(sponsor, i) in sponsorLinks"
          :key="i"
          :title="sponsor.name"
          :to="sponsor.url"
          external
          target="_blank"
          class="hover:scale-110 transition-all hover:text-accent"
        >
          <img
            v-if="sponsor.logoUrl"
            :src="sponsor.logoUrl(useTheme().value)"
            :alt="sponsor.name"
            class="h-16 object-contain"
          />
          <div v-else>{{ sponsor.name }}</div>
        </nuxt-link>
      </div>
    </div>
  </footer>
</template>

<style scoped></style>
