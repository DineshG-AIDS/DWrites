const withMT = require("@material-tailwind/react/utils/withMT");

module.exports = withMT({
  content: ["./index.html", "./src/**/*.{vue,js,ts,jsx,tsx}"],
  theme: {
    extend: {
      backgroundColor: {
        "custom-color": "#20364b",
      },
      colors: {
        customcolor1: "#212121",
        customcolor2: "#121534",
      },
      fontFamily: {
        custom: ["custom1", "sans"],
        custom1: ["custom2", "sans"],
        custom2: ["custom3", "sans"],
        custom3: ["custom4", "sans"],
        custom4: ["custom5", "sans"],
        custom5: ["custom6", "sans"],
        custom6: ["custom7", "sans"],
      },
    },
  },
  plugins: [],
});