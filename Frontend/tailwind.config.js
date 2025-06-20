/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,jsx}",
  ],
  theme: {
    extend:{
      fontFamily:{
        custom1:['Cinzel-black'],
        custom2:['Cinzel-bold']
      }
    },
  },
  plugins: [],
}

