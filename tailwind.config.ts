import type { Config } from "tailwindcss";

const config: Config = {
    content: ["./pages/**/*.{js,ts,jsx,tsx,mdx}", "./components/**/*.{js,ts,jsx,tsx,mdx}", "./app/**/*.{js,ts,jsx,tsx,mdx}"],
    theme: {
        extend: {
            backgroundImage: {
                "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
                "gradient-conic": "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
            },
            colors: {
                g50: "#f6f6f6",
                g100: "#e7e7e7",
                g200: "#d1d1d1",
                g300: "#b0b0b0",
                g400: "#888888",
                g500: "#6d6d6d",
                g600: "#5d5d5d",
                g700: "#4f4f4f",
                g800: "#454545",
                g900: "#3d3d3d",
                g950: "#111111",
                ePrimary: "#E83837",
            },
        },
    },
    plugins: [],
};
export default config;
