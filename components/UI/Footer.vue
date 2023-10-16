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
      <nuxt-link
        v-for="link in siteLinks"
        :key="link.name"
        :to="$nuxt.$localePath(link.link)"
        class="link link-hover"
      >
        {{ $t(`footer.links.${link.name}`) }}
      </nuxt-link>
    </nav> 
    <nav class="flex flex-wrap gap-4 justify-center">
      <nuxt-link
        v-for="(link, i) in socialLinks"
        :key="i"
        :title="link.name"
        :to="link.link"
        :external="true"
        target="_blank"
        class="hover:scale-110 transition-all hover:text-accent"
      >
        <Icon
          :name="(link.icon as string)"
          size="24"
        />
      </nuxt-link>
    </nav>
  </footer>
</template>
<script setup lang="ts">
  type Link = {
    name: string
    icon?: string
    link: string
  } 
  const socialLinks: Link[] = [
    {
      name: "Marje3's website",
      icon: "ion:globe",
      link: "https://marje3.club/"
    },
    {
      name: "Instagram",
      icon: "ion:logo-instagram",
      link: "#"
    },
    {
      name: "Discord",
      icon: "ion:logo-discord",
      link: "#"
    },
    {
      name: "GitHub",
      icon: "ion:logo-github",
      link: "https://github.com/Marje3PSUT/"
    }
  ]
  const siteLinks: Link[] = [
    {
      name: "courses",
      link: "/courses", 
    },
    {
      name: "submit",
      link: "/upload",
    },
    {
      name: "about",
      link: "/about"
    },
    {
      name: "contact",
      link: "/about#contact"
    }
  ]
</script>
<style scoped lang="postcss"></style>
