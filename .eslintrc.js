module.exports = {
  root: true,
  extends: ["@nuxt/eslint-config"],
  overrides: [
    {
      files: ["*.vue"],
      rules: {
        "vue/multi-word-component-names": "off",
      },
    },
  ],
};
