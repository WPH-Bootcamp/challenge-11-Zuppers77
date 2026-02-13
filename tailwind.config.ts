import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {

      colors: {
        "neutral-25": "var(--color-neutral-25)",
        "neutral-50": "var(--color-neutral-50)",
        "neutral-100": "var(--color-neutral-100)",
        "neutral-200": "var(--color-neutral-200)",
        "neutral-300": "var(--color-neutral-300)",
        "neutral-400": "var(--color-neutral-400)",
        "neutral-500": "var(--color-neutral-500)",
        "neutral-600": "var(--color-neutral-600)",
        "neutral-700": "var(--color-neutral-700)",
        "neutral-800": "var(--color-neutral-800)",
        "neutral-900": "var(--color-neutral-900)",
        "neutral-950": "var(--color-neutral-950)",
        "purple-100": "var(--color-purple-100)",
        "purple-200": "var(--color-purple-200)",
        "purple-300": "var(--color-purple-300)",
        "purple-600": "var(--color-purple-600)",
        "purple-800": "var(--color-purple-800)",
        "pink-600": "var(--color-pink-600)",
      },
      fontSize: {
        "display-3xl": ["3.75rem", { lineHeight: "4.5rem", letterSpacing: "-0.03em" }],
        "display-2xl": ["3rem", { lineHeight: "3.75rem", letterSpacing: "-0.03em" }],
        "display-xl": ["2.5rem", { lineHeight: "3rem", letterSpacing: "-0.03em" }],
        "display-lg": ["2.25rem", { lineHeight: "2.75rem", letterSpacing: "-0.03em" }],
        "display-md": ["2rem", { lineHeight: "2.5rem", letterSpacing: "-0.03em" }],
        "display-sm": ["1.75rem", { lineHeight: "2.375rem", letterSpacing: "-0.03em" }],
        "display-xs": ["1.5rem", { lineHeight: "2.25rem", letterSpacing: "-0.03em" }],
        "text-xl": ["1.25rem", { lineHeight: "2.125rem", letterSpacing: "-0.03em" }],
        "text-lg": ["1.125rem", { lineHeight: "2rem", letterSpacing: "-0.03em" }],
        "text-md": ["1rem", { lineHeight: "1.875rem", letterSpacing: "-0.03em" }],
        "text-sm": ["0.875rem", { lineHeight: "1.75rem", letterSpacing: "-0.03em" }],
        "text-xs": ["0.75rem", { lineHeight: "1.5rem", letterSpacing: "-0.03em" }],
      },
    },
  },
  plugins: [],
};

export default config;
