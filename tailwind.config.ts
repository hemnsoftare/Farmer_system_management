import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: ["class", '[data-theme="dark"]'], // Enable dark mode using class or data-theme
  content: [
    "./pages/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./app/**/*.{ts,tsx}",
    "./src/**/*.{ts,tsx}",
  ],
  theme: {
    container: {
      center: true,
      padding: "2rem",
      screens: {
        "2xl": "1400px",
      },
    },
    extend: {
      colors: {
        primary: {
          DEFAULT: "#2767F5",
          "25": "#E4E9FE",
          "50": "#AECDFB",
          "75": "#7BA8F9",
          "100": "#426AF6",
          "200": "#2767F5",
          "400": "#0B51BE",
          "500": "#053A8B",
          "600": "#052E6D",
          "700": "#042352",
          "800": "#022736",
        },
        orange: {
          DEFAULT: "#FFA500",
          "50": "#FFF4E5",
          "100": "#FFE8CC",
          "200": "#FFD199",
          "300": "#FFB366",
          "400": "#FF944D",
          "500": "#FF8500",
          "600": "#CC6B00",
          "700": "#994F00",
          "800": "#663300",
        },
        dark: {
          background: "#1A1A1A",
          foreground: "#EAEAEA",
          muted: "#999999",
          card: "#222222",
        },
        neutral: {
          black: "#0C0C0C",
          white: "#FFFFFF",
          gray: {
            "50": "#F9F9F9",
            "100": "#F6F6F6",
            "200": "#EDEDED",
            "300": "#CBCBCB",
            "400": "#B4B4B4",
            "500": "#9E9E9E",
            "600": "#717171",
            "700": "#505050",
            "800": "#444444",
            "900": "#2D2D2D",
          },
        },
      },
      textColor: {
        orange: {
          light: "#FFD199",
          DEFAULT: "#FF8500",
          dark: "#CC6B00",
        },
        dark: {
          DEFAULT: "#EAEAEA",
          muted: "#999999",
        },
      },
      backgroundColor: {
        orange: {
          light: "#FFF4E5",
          DEFAULT: "#FFA500",
          dark: "#CC6B00",
        },
        dark: {
          DEFAULT: "#1A1A1A",
          card: "#222222",
          muted: "#333333",
        },
      },
      borderColor: {
        orange: {
          DEFAULT: "#FFA500",
          light: "#FFB366",
        },
        dark: {
          DEFAULT: "#333333",
          muted: "#444444",
        },
      },
      keyframes: {
        "accordion-down": {
          from: { height: "0" },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: "0" },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
      },
    },
  },
  plugins: [
    function ({ addVariant }) {
      addVariant("orange", '[data-theme="orange"] &'); // Orange mode variant
      addVariant("dark", '[data-theme="dark"] &'); // Dark mode variant
    },
    require("tailwindcss-animate"),
  ],
};

export default config;
