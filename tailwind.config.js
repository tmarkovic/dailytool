const defaultTheme = require("tailwindcss/defaultTheme");

const container = ({ addComponents, theme }) =>
  addComponents({
    ".container": {
      maxWidth: theme("screens.sm"),

      // Breakpoints
      "@screen sm": {
        maxWidth: theme("screens.sm"),
      },
      "@screen md": {
        maxWidth: theme("screens.md"),
      },

      "@screen lg": {
        maxWidth: theme("screens.lg"),
      },
    },
  });

module.exports = {
  purge: ["./src/**/*.{js,jsx,ts,tsx}", "./public/index.html"],
  plugins: [require("daisyui"), require("@tailwindcss/forms"), container],
  mode: "jit",
  darkMode: "media", // or 'media' or 'class'
  daisyui: {
    themes: ["light"],
  },
  corePlugins: {
    container: false,
  },
  theme: {
    extend: {
      fontFamily: {
        ...defaultTheme.fontFamily,
        sans: ["Inter var", ...defaultTheme.fontFamily.sans],
      },
    },
  },
  variants: {
    extend: {},
  },
};
