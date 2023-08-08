// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  modules: ["@nuxtjs/i18n", "nuxt-icon"],
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
    locales: [
      {
        code: "en",
        name: "English",
        iso: "en",
        dir: "ltr",
        file: "en.json",
      },
      {
        code: "ar",
        name: "العربية",
        iso: "ar",
        dir: "rtl",
        file: "ar.json",
      },
    ],
    lazy: true,
    langDir: "lang",
    defaultLocale: "en",
    baseUrl: "http://localhost:3000/",
    debug: false,
  },
});
