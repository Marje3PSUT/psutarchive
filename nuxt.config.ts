// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
head: {
    title: 'PSUT Archive - Marje3 Student Club',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: 'PSUT Archive is a comprehensive web archive for exams, past papers, and student notes, created by Marje3 Student Club. Find all the academic resources you need for PSUT courses.' },
      { name: 'keywords', content: 'PSUT, Archive, Marje3, Student Club, Exams, Past Papers, Notes, Study Materials, Academic Resources' },
      { property: 'og:title', content: 'PSUT Archive - Marje3 Student Club' },
      { property: 'og:description', content: 'A comprehensive web archive for exams, past papers, and student notes at PSUT. Created by Marje3 Student Club to support academic excellence.' },
      { property: 'og:type', content: 'website' },
      { property: 'og:url', content: 'https://psutarchive.com' },
      { property: 'og:image', content: 'https://psutarchive.com/Logo.svg' },
      { property: 'twitter:card', content: 'summary_large_image' },
    ],
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
      env: process.env.NODE_ENV
    }
  }
});
