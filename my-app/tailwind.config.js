/** @type {import('tailwindcss').Config} */

const withMT = require("@material-tailwind/react/utils/withMT");

module.exports = withMT({
  content: ["./pages/**/*.js", "./components/*.js"],
  important: true,
  theme: {
    extend: {},
    colors: {
      "dark-brown": "#3e2723",
      "amber": "#ffc107",
    },
  },
  plugins: [],
});

