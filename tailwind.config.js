module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      fontFamily: {
        default: ['Nunito'],
      },
      colors: {
        sky: '#CAEBF2',
        carbon: '#a9a9a9',
        watermelon: '#ff3b3f',
        neutral: '#efefef',
        dark: '#252525',
      },
    },
  },
  plugins: [],
};
