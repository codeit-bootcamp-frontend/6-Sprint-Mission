import { defineConfig } from "@pandacss/dev";

export default defineConfig({
  // Whether to use css reset
  preflight: true,

  // Where to look for your css declarations
  include: ["./src/**/*.{js,jsx,ts,tsx}", "./pages/**/*.{js,jsx,ts,tsx}"],

  // Files to exclude
  exclude: [],

  // Useful for theme customization
  theme: {
    extend: {
      tokens: {
        colors: {
          blueBasic: { value: "#3692FF" },
          blueBanner: { value: "#CFE5FF" },
          textBasic: { value: "#374151" },
          disabledBasic: { value: "#9CA3AF" },
          errorRed: { value: "#F74747" },
        },
        fonts: {
          ROKAF: { value: "ROKAF Sans" },
        },
      },
    },
  },

  // The output directory for your css system
  outdir: "src/styled-system",
});
