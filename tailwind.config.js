const customDaisyUiVariables = {
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
  },
  plugins: [require("tailwindcss-flip"), require("daisyui")],
  // daisyUI config
  daisyui: {
    styled: true,
    themes: [
      {
        "dark": {
          ...require("daisyui/src/colors/themes")["[data-theme=dracula]"],
          ...customDaisyUiVariables,
        },
      },
      {
        "light": {
          ...require("daisyui/src/colors/themes")["[data-theme=dracula]"],
          // light colors
          "neutral": "#333c4d",
          "base-100": "#fafafa",
          "base-content": "#080802",
          ...customDaisyUiVariables,
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
