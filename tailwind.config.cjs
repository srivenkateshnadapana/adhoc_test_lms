/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        headline: ['var(--font-manrope)', 'sans-serif'],
        body: ['var(--font-inter)', 'sans-serif'],
      },
      colors: {
        primary: "var(--primary)",
        "on-primary": "var(--primary-foreground)",
        secondary: "var(--secondary)",
        surface: "var(--background)",
        "on-surface": "var(--foreground)",
        "surface-container": "var(--muted)",
        "surface-dim": "var(--border)",
        error: "var(--destructive)",
      }
    },
  },
  plugins: [require("tailwindcss-animate")],
}
