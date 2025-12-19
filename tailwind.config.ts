const mainColorTheme = {
  primary: '#38bdf8',
  secondary: '#818CF8',
  accent: '#F471B5',
  neutral: '#1E293B',
  'neutral-focus': '#273449',
  'base-100': '#0F172A',
  info: '#0CA5E9',
  success: '#2DD4BF',
  warning: '#F4BF50',
  error: '#FB7085',
};

const ramadanTheme = {
  primary: '#e779c1',
  secondary: '#5778f2',
  accent: '#FFCA29',
  neutral: '#221551',
  info: '#53c0f3',
  success: '#71ead2',
  warning: '#f3cc30',
  error: '#e24056',
  'base-100': '#1a103c',
  'neutral-focus': '#273449',
};

const christmasTheme = {
  dark: {
    primary: '#6A994E',
    secondary: '#BC4749',
    accent: '#F8B229',
    neutral: '#1F2937',
    info: '#38BDF8',
    success: '#16A34A',
    warning: '#F59E0B',
    error: '#EF4444',
    'neutral-focus': '#273449',
    'base-100': '#01110a',
    'base-content': '#FEF9E1',
  },
  light: {
    primary: '#386641',
    secondary: '#386641',
    accent: '#BC4749',
    neutral: '#1F2937',
    info: '#38BDF8',
    success: '#16A34A',
    warning: '#F59E0B',
    error: '#EF4444',
    'neutral-focus': '#273449',
    'base-100': '#FEF9E1',
    'base-content': '#080802',
  },
};

const customDaisyUiVariables = {
  '--rounded-box': '1rem', // border radius rounded-box utility class, used in card and other large boxes
  '--rounded-btn': '0.5rem', // border radius rounded-btn utility class, used in buttons and similar element
  '--rounded-badge': '1.9rem', // border radius rounded-badge utility class, used in badges and similar
  '--animation-btn': '0.25s', // duration of animation when you click on button
  '--animation-input': '0.2s', // duration of animation for inputs like checkbox, toggle, radio, etc
  '--btn-text-case': 'uppercase', // set default text transform for buttons
  '--btn-focus-scale': '0.95', // scale transform of button when you focus on it
  '--border-btn': '1px', // border width of buttons
  '--tab-border': '1px', // border width of tabs
  '--tab-radius': '0.5rem', // border radius of tabs
};

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './components/**/*.{js,vue,ts}',
    './layouts/**/*.vue',
    './pages/**/*.vue',
    './plugins/**/*.{js,ts}',
    './nuxt.config.{js,ts}',
    './app.vue',
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['IBM Plex Sans', 'Alyamama', 'sans-serif'],
      },
    },
    colors: {
      'course-cat-IT': '#ED8B00',
      'course-cat-ENG': '#F9423A',
      'course-cat-BUSINESS': '#FFCD00',
      'course-cat-MATH': '#20ADA6',
      'course-cat-ELECT': '#BE986A',
    },
  },
  plugins: [require('tailwindcss-flip'), require('daisyui')],
  // daisyUI config
  daisyui: {
    styled: true,
    themes: [
      {
        dark: {
          ...customDaisyUiVariables,
          ...christmasTheme.dark,
          'color-scheme': 'dark',
        },
      },
      {
        light: {
          ...customDaisyUiVariables,
          ...christmasTheme.light,
          'color-scheme': 'light',
        },
      },
    ],
    base: true,
    utils: true,
    logs: true,
    rtl: false,
    prefix: '',
    darkTheme: 'dark',
  },
};
