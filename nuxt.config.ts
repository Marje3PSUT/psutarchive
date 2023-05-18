// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  modules: ["@nuxtjs/strapi", "@nuxtjs/i18n"],
  css: ["~/assets/css/main.css"],
  postcss: {
    plugins: {
      tailwindcss: {},
      autoprefixer: {},
    },
  },
  runtimeConfig: {
    public: {
      strapi: {
        url: "http://localhost:1337", // can be overridden by NUXT_PUBLIC_STRAPI_URL env var
      },
    },
  },
  i18n: {
    vueI18n: "./i18n.config.ts",
    locales: ["en", "ar"], // used in URL path prefix
    defaultLocale: "en", // default locale of your project for Nuxt pages and routings
  },
});
