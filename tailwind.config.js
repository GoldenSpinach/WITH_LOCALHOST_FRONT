/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./index.html", "./src/**/*.{vue,js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        "primary-blue": "#007BFF",
        "neutral-gray": "#F9FAFB",
      },
      spacing: {
        lg: "20px",
        md: "15px",
      },
      borderRadius: {
        lg: "1rem",
      },
    },
  },
  plugins: [],
};
