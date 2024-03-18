// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  app: {
    head: {
      link: [
        {
          rel: 'icon',
          href: '/logo/logo_black.svg',
          type: 'image/svg+xml',
        },
      ],
      script: [
        {
          'data-domain': 'psutarchive.com',
          src: 'https://plausible.psutarchive.com/js/script.js',
        },
      ],
      // TODO: add them dynamically for i18n
      meta: [
        {
          name: 'description',
          content:
            'PSUT Archive is your go-to web archive for accessing past exam papers and course notes designed specifically for students at Princess Sumaya University for Technology (PSUT). Dive into a comprehensive resource collection to enhance your academic journey.',
        },
      ],
      title: 'PSUT Archive - Find Academic Resources for PSUT',
    },
  },
  devtools: { enabled: true },
  modules: ['@nuxtjs/i18n', 'nuxt-icon' /*, "nuxt-api-party" */],
  css: ['~/assets/css/main.css', '~/assets/css/typography.css'],
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
        code: 'en',
        name: 'English',
        iso: 'en',
        dir: 'ltr',
        file: 'en.json',
      },
      {
        code: 'ar',
        name: 'العربية',
        iso: 'ar',
        dir: 'rtl',
        file: 'ar.json',
      },
    ],
    lazy: true,
    langDir: 'lang',
    defaultLocale: 'en',
    baseUrl: 'http://localhost:3000/',
    debug: false,
  },
  runtimeConfig: {
    public: {
      buildCommitSha: process.env.NUXT_ENV_VERCEL_GIT_COMMIT_SHA,
      buildCommitMessage: process.env.NUXT_ENV_VERCEL_GIT_COMMIT_MESSAGE,
      buildCommitBranch: process.env.NUXT_ENV_VERCEL_GIT_COMMIT_REF,
      repoUrl: '',
      env: process.env.NODE_ENV,
      apiUrl: 'http://localhost:8055',
      editorUrl: 'https://editor.psutarchive.com',
    },
  },
  plugins: ['~/plugins/directus.ts'],
});
