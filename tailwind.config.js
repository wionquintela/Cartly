/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  presets: [require("nativewind/preset")],
  darkMode: "media",
  theme: {
    extend: {
      colors: {
        "base-100": "rgb(var(--color-base-100) / <alpha-value>)",
        "base-200": "rgb(var(--color-base-200) / <alpha-value>)",
        "base-300": "rgb(var(--color-base-300) / <alpha-value>)",
        "base-content": "rgb(var(--color-base-content) / <alpha-value>)",

        primary: "rgb(var(--color-primary) / <alpha-value>)",
        "primary-content": "rgb(var(--color-primary-content) / <alpha-value>)",

        secondary: "rgb(var(--color-secondary) / <alpha-value>)",
        "secondary-content":
          "rgb(var(--color-secondary-content) / <alpha-value>)",

        accent: "rgb(var(--color-accent) / <alpha-value>)",
        "accent-content": "rgb(var(--color-accent-content) / <alpha-value>)",

        neutral: "rgb(var(--color-neutral) / <alpha-value>)",
        "neutral-content": "rgb(var(--color-neutral-content) / <alpha-value>)",

        info: "rgb(var(--color-info) / <alpha-value>)",
        "info-content": "rgb(var(--color-info-content) / <alpha-value>)",

        success: "rgb(var(--color-success) / <alpha-value>)",
        "success-content": "rgb(var(--color-success-content) / <alpha-value>)",

        warning: "rgb(var(--color-warning) / <alpha-value>)",
        "warning-content": "rgb(var(--color-warning-content) / <alpha-value>)",

        error: "rgb(var(--color-error) / <alpha-value>)",
        "error-content": "rgb(var(--color-error-content) / <alpha-value>)",
      },
      borderRadius: {
        selector: "1rem",
        field: "0.5rem",
        box: "1rem",
      },
    },
  },
  plugins: [],
};
