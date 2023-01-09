const defaultTheme = require('tailwindcss/defaultTheme');

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./index.html', './main.js'],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Space Grotesk', ...defaultTheme.fontFamily.sans],
      },
      colors: {
        'gradient-1': 'hsl(249, 99%, 64%)',
        'gradient-2': 'hsl(278, 94%, 30%)',
        error: 'hsl(0, 100%, 66%)',
        'light-gray': 'hsl(270, 3%, 87%)',
        'dark-gray': 'hsl(279, 6%, 55%)',
        'dark-violet': 'hsl(278, 68%, 11%)',
      },
      backgroundImage: {
        'card-front': "url('/images/bg-card-front.png')",
        'card-back': "url('/images/bg-card-back.png')",
        'bg-desktop': "url('/images/bg-main-desktop.png')",
        'bg-mobile': "url('/images/bg-main-mobile.png')",
      },
    },
  },
  plugins: [require('@tailwindcss/forms')],
};
