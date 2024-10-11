import { Config } from "tailwindcss";

/** @type {import('tailwindcss').Config} */
const config: Config = {
  content: ["./src/**/*.{js,t s,jsx,tsx,mdx}"],
  darkMode: "class",
  theme: {
    extend: {},
    plugins: [],
  },
};

export default config;
