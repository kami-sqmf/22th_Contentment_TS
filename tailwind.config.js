const colors = require('tailwindcss/colors')
module.exports = {
  content: [
    './pages/**/*.{js,jsx,ts,tsx}',
    './components/**/*.{js,jsx,ts,tsx}',
  ],
  theme: {
    screens: {
      sm: '480px',
      md: '768px',
      lg: '976px',
      xl: '1440px',
    },
    colors: {
      'white': '#ffffff',
      'white-light': '#fcfcfc',
      'blue': '#264653',
      'blue-light': '#55868c',
      'insta': '#7f636e',
      'black': colors.black,
      'gray': colors.slate,
      'green': colors.emerald,
      'purple': colors.violet,
      'yellow': colors.amber,
      'pink': colors.fuchsia,
      'red': colors.red
    },
    fontFamily: {
      sans: ['jf-openhuninn', 'GenJyuuGothic'],
      serif: ['Merriweather', 'serif'],
    },
    extend: {
      spacing: {
        '128': '32rem',
        '144': '36rem',
      },
      borderRadius: {
        '4xl': '2rem',
      }
    }
  },
}
