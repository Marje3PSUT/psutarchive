// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: true },
  modules: ["@nuxtjs/i18n", "nuxt-icon", "nuxt-api-party"],
  css: ["~/assets/css/main.css", "~/assets/css/typography.css"],
  postcss: {
    plugins: {
      'tailwindcss/nesting': {},
      tailwindcss: {},
      autoprefixer: {},
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
  apiParty: {
    endpoints: {
      baseApi: {
        url: process.env.API_BASE_URL!,
        token: process.env.API_BASE_TOKEN!,
      },
    },
  },
  runtimeConfig:{
    public: {
      buildCommitSha: process.env.NUXT_ENV_VERCEL_GIT_COMMIT_SHA,
      buildCommitMessage: process.env.NUXT_ENV_VERCEL_GIT_COMMIT_MESSAGE,
      buildCommitBranch: process.env.NUXT_ENV_VERCEL_GIT_COMMIT_REF,
      repoUrl: '',
      env: 'dev'
    }
  }
});
