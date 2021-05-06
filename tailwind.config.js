module.exports = {
  purge: [],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      colors: {
        "brand-100": "#ffff3fff",
        "brand-200": "#eeef20ff",
        "brand-300": "#dddf00ff",
        "brand-400": "#d4d700ff",
        "brand-500": "#bfd200ff",
        "brand-600": "#aacc00ff",
        "brand-700": "#80b918ff",
        "brand-800": "#55a630ff",
        "brand-900": "#2b9348ff",
        "brand-999": "#007f5fff",
        dark: "#333533",
        light: "#e8eddf",
      },
    },
    fontFamily: {
      display: ["Source Sans Pro", "sans-serif"],
      body: ["Lato", "sans-serif"],
    },
  },
  variants: {
    extend: {},
  },
  plugins: [require("@tailwindcss/forms")],
};
