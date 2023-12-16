import CONFIG from './config';

/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        mark: CONFIG.theme.mark,
        primary: CONFIG.theme.accentColor,
        secondary : CONFIG.theme.secondaryColor,
        base: CONFIG.theme.baseBgColor,
        card: CONFIG.theme.cardBgColor,
        red : '#ee4d2d',
        semiYellow: '#FFE97A',
        lightRed : '#ff7337',
        lightWhite : '#ffffff',
        blue : '#0861F2',
      },
    },
  },
  plugins: [],
};
