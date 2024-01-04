/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      // maxWidth:{
      //   'container':'1340px',
      // },
      fontFamily: {
        'nun': ['Nunito', 'sans-serif'],
        'open': ['Open Sans', 'sans-serif'],

      },

      colors: {
        'primary': '#5F35F5',
      },

      // backgroundImage: {
      //   'delivery': "url('assets/delivery.svg')",
      // }
    },
  },
  plugins: [],
}
