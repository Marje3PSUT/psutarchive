/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./components/**/*.{js,vue,ts}",
    "./layouts/**/*.vue",
    "./pages/**/*.vue",
    "./plugins/**/*.{js,ts}",
    "./nuxt.config.{js,ts}",
    "./app.vue",
  ],
  theme: {
    extend: {},
  },
  plugins: [require("daisyui")],
  // daisyUI config
  daisyui: {
    styled: true,
    themes: [
      'dracula',
      {
          "dracula-light": {
          "primary": "#ff79c6",      
          "secondary": "#bd93f9",
          "accent": "#ffb86c",
          "neutral": "#333c4d",
          "base-100": "#fafafa",
          "info": "#8be9fd",
          "success": "#50fa7b",
          "warning": "#f1fa8c",
          "error": "#ff5555",
        }
      },
    ],
    base: true,
    utils: true,
    logs: true,
    rtl: false,
    prefix: "",
    darkTheme: "dracula",
  },
};
