import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./lib/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        navy:   "#0C1929",   // deep ink navy
        orange: "#C85A00",   // warm flame orange (matches trailer/card)
        amber:  "#D4981A",   // rich gold
      },
      fontFamily: {
        cinzel:    ["var(--font-cinzel)", "serif"],
        condensed: ["var(--font-barlow-condensed)", "sans-serif"],
        barlow:    ["var(--font-barlow)", "sans-serif"],
        cormorant: ["var(--font-cormorant)", "serif"],
      },
      letterSpacing: {
        hero: "0.4em",
        wide: "0.15em",
      },
      boxShadow: {
        "orange-glow": "0 0 24px rgba(200, 90, 0, 0.55), 0 0 48px rgba(200, 90, 0, 0.22)",
        "amber-glow":  "0 0 20px rgba(212, 152, 26, 0.45)",
      },
    },
  },
  plugins: [],
};

export default config;
