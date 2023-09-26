const customDaisyUiVariables = {
  "primary": "#38bdf8",
  "secondary": "#818CF8",
  "accent": "#F471B5",
  "neutral": "#1E293B",
  "neutral-focus": "#273449",
  "base-100": "#0F172A",
  "info": "#0CA5E9",
  "success": "#2DD4BF",
  "warning": "#F4BF50",
  "error": "#FB7085",
  "--rounded-box": "1rem", // border radius rounded-box utility class, used in card and other large boxes
  "--rounded-btn": "0.5rem", // border radius rounded-btn utility class, used in buttons and similar element
  "--rounded-badge": "1.9rem", // border radius rounded-badge utility class, used in badges and similar
  "--animation-btn": "0.25s", // duration of animation when you click on button
  "--animation-input": "0.2s", // duration of animation for inputs like checkbox, toggle, radio, etc
  "--btn-text-case": "uppercase", // set default text transform for buttons
  "--btn-focus-scale": "0.95", // scale transform of button when you focus on it
  "--border-btn": "1px", // border width of buttons
  "--tab-border": "1px", // border width of tabs
  "--tab-radius": "0.5rem", // border radius of tabs
};

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
    colors: {
      "course-cat-IT": "#ED8B00",
      "course-cat-ENG": "#F9423A",
      "course-cat-BUSINESS": "#FFCD00", // business
      "course-cat-MATH": "#20ADA6", // just random colors for now
      "course-cat-ELECT": "#BE986A",
    }
  },
  plugins: [require("tailwindcss-flip"), require("daisyui")],
  // daisyUI config
  daisyui: {
    styled: true,
    themes: [
      {
        "dark": {
          "color-scheme": "dark",
          ...customDaisyUiVariables,
        },
      },
      {
        "light": {
          // light colors
          ...customDaisyUiVariables,
          "base-100": "#fafafa",
          "base-content": "#080802",
          "color-scheme": "light",
      }
      },
    ],
    base: true,
    utils: true,
    logs: true,
    rtl: false,
    prefix: "",
    darkTheme: "dark",
  },
};
