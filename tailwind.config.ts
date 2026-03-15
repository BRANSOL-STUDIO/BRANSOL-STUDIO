import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  corePlugins: {
    preflight: false, // Use globals.css reset & theme; avoid Tailwind reset overriding BRANSOL styles
  },
  theme: {
    extend: {},
  },
  plugins: [],
};

export default config;
