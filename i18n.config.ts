export default defineI18nConfig(nuxt => ({
  legacy: false,
  locale: 'en',
  messages: {
    en: {
      courses: 'Courses',
      submit: 'Submit Papers',
      about: 'About Us'
    },
    ar: {
      courses: 'المواد',
      submit: 'أرسل مواد',  //to be modified later
      about: 'عنا'
    }
  }
}))
