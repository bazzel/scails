const defaultTheme = require("tailwindcss/defaultTheme");
const {
  withMaterialColors,
} = require("../vendor/javascript/tailwind-material-colors");

const config = {
  content: [
    "./public/*.html",
    "./app/helpers/**/*.rb",
    "./app/javascript/**/*.js",
    "./app/views/**/*.{erb,haml,html,slim}",
    "./app/components/**/*.{erb,haml,html,slim,rb}",
  ],
  safelist: ["w-6", "h-6"],
  theme: {
    extend: {
      fontFamily: {
        sans: ["Roboto", ...defaultTheme.fontFamily.sans],
      },
    },
  },
  plugins: [
    require("@tailwindcss/forms"),
    require("@tailwindcss/aspect-ratio"),
    require("@tailwindcss/typography"),
    require("@tailwindcss/container-queries"),
  ],
};

module.exports = withMaterialColors(
  config,
  {
    // Your base colors as HEX values. 'primary' is required.
    primary: "#3565A3",
    // secondary and/or tertiary are optional, if not set they will be derived from the primary color.
    secondary: "#023D79",
    tertiary: "#F5D5D6",
    // add any named colors you need:
    // green: "#00ff00",
    // blue: "#0000ff",
  },
  {
    /* one of 'content', 'expressive', 'fidelity', 'monochrome', 'neutral', 'tonalSpot' or 'vibrant' */
    scheme: "vibrant",
    // contrast is optional and ranges from -1 (less contrast) to 1 (more contrast).
    contrast: 0,
  }
);
