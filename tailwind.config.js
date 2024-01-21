const plugin = require('tailwindcss/plugin')

export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  darkMode: ['class', '[data-theme="dark"]'],
  theme: {
    extend: {
      fontFamily: {
        pacifico: 'Pacifico'
      },
      height: {
        'd-screen': '100dvh'
      },
      animation: {
        popup: 'popup 0.5s ease'
      },
      transitionProperty: {
        background: 'background'
      }
    }
  },
  plugins: [
    '@tailwindcss/line-clamp',
    plugin(({ addVariant }) => {
      addVariant('touch', '@media(pointer:coarse)')
      addVariant('cursor', '@media(pointer:fine)')
    })
  ]
}
