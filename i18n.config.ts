export default defineI18nConfig((nuxt) => ({
  legacy: false,
  locale: "en",
  messages: {
    en: {
      courses: "Courses",
      submit: "Submit Papers",
      about: "About Us",
      search: "Search courses"
    },
    ar: {
      courses: "المواد",
      submit: "أرسل مواد", //to be modified later
      about: "عنا",
      search: "ابحث في المواد"
    },
  },
}));
