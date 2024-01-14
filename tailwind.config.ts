import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic": "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
      colors: {
        "white-100": "#F6F7FD",
        "purple-semi-dark": "#565BD9",
        "purple-dark": "#5754F7",
        "purple-light": "#8583FF",
        "purple-light-50": "#F6F7FD",
        "purple-light-100": "#EFEEFF",
        "purple-light-200": "#E6E5FF",
        "purple-light-300": "#C9C8F1",
      },
      fontFamily: {
        poppins: ["Poppins", "sans-serif"],
      },
    },
  },
  plugins: [],
};
export default config;
