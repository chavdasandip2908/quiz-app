// tailwind.config.js


module.exports = {
  purge: ['./src/**/*.{js,jsx,ts,tsx}', './public/index.html'],
  darkMode: false, // You can set this to 'media' or 'class' for dark mode
  theme: {
    extend: {
      keyframes: {
        'pulse-scale': {
          '0%, 100%': { transform: 'scale(1)' },
          '50%': { transform: 'scale(1.1)' },
        },
      },
      animation: {
        'pulse-scale': 'pulse-scale 2s infinite',
      },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
};

