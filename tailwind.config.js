/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./app/**/*.{tsx,ts}', './src/**/*.{tsx,ts}'],
  presets: [require('nativewind/preset')],
  theme: {
    extend: {
      colors: {
        nia: {
          primary: '#6750A4',
          onPrimary: '#FFFFFF',
          surface: '#FFFBFE',
          onSurface: '#1C1B1F',
          surfaceDark: '#1C1B1F',
          onSurfaceDark: '#E6E1E5',
          tertiary: '#7D5260',
        },
      },
    },
  },
  plugins: [],
};
