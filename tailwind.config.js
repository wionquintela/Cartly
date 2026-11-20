/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  presets: [require("nativewind/preset")],
  theme: {
    extend: {
      colors: {
        "base-100": "#F8FDEF",
        "base-200": "#E1E6D9",
        "base-300": "#CBCFC3",
        "base-content": "#151614",

        primary: "#419400",
        "primary-content": "#010800",

        secondary: "#BDC000",
        "secondary-content": "#0D0E00",

        accent: "#EDD000",
        "accent-content": "#141000",

        neutral: "#343300",
        "neutral-content": "#D2D3C7",

        info: "#B1D9E9",
        "info-content": "#0C1113",

        success: "#B9DBC6",
        "success-content": "#0D110E",

        warning: "#D7D3B0",
        "warning-content": "#11100C",

        error: "#EFC6C2",
        "error-content": "#140E0E",
      },

      borderRadius: {
        selector: "16px",
        field: "8px",
        box: "16px",
      },

      borderWidth: {
        DEFAULT: "1px",
      },
    },
  },
  plugins: [],
};
