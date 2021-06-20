const isProduction = process.argv[process.argv.indexOf('--mode') + 1] === 'production';
module.exports = {
  purge: {
    enabled: isProduction,
    content: [
      './src/**/*.{html,js,ts}',
    ]
  },
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {},
  },
  variants: {
    extend: {},
  },
  plugins: [],
}
