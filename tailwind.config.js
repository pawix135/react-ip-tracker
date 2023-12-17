/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      backgroundImage: {
        "pattern-dekstop": 'url("/pattern-bg-desktop.png")',
        "pattern-mobile": 'url("/pattern-bg-mobile.png")',
      },
    },
  },
  plugins: [],
};
