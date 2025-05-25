// postcss.config.cjs
module.exports = {
  plugins: {
    '@tailwindcss/postcss': {},    // ← the new Tailwind PostCSS plugin
    autoprefixer: {},              // ← autoprefixer stays the same
  },
};
