import type { Config } from "tailwindcss";

const config: Config = {
    content: ["./pages/**/*.{js,ts,jsx,tsx,mdx}", "./components/**/*.{js,ts,jsx,tsx,mdx}", "./app/**/*.{js,ts,jsx,tsx,mdx}"],
    theme: {
        screens: {
            'sm': '640px',
            'md': '768px',
            'lg': '1024px',
            'xl': '1280px',
            'max': '1440px',  // 커스텀 breakpoint
            '2xl': '1536px',
        },
        extend: {
            colors: {
                gray: {
                    50: "#F6F6F6",
                    100: "#E7E7E7",
                    200: "#D1D1D1",
                    300: "#B0B0B0",
                    400: "#888888",
                    500: "#6D6D6D",
                    600: "#5D5D5D",
                    700: "#4F4F4F",
                    800: "#454545",
                    900: "#3D3D3D",
                    950: "#111111",
                },
                primary: {
                    50: "#F6F6F6", // 가장 밝은
                    500: "#6D6D6D", // 중간
                    900: "#3D3D3D", // 어두운
                    950: "#111111", // 가장 어두운
                },
                brand: {
                    primary: "#E83837",
                },
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
            spacing: {
                base: "4.5rem",
            },
            fontSize: {
                small: ["14px", { lineHeight: "21px", letterSpacing: "-0.2px" }],
                base: ["16px", { lineHeight: "24px", letterSpacing: "-0.2px" }],
                large: ["20px", { lineHeight: "30px", letterSpacing: "-0.2px" }],
                titleSmall: ["24px", { lineHeight: "36px", letterSpacing: "-0.2px" }],
                title: ["32px", { lineHeight: "48px", letterSpacing: "-0.2px" }],
                titleXl: ["48px", { lineHeight: "72px", letterSpacing: "-0.2px" }],
                h3: ["28px", { lineHeight: "42px", letterSpacing: "-0.2px" }],
                xl: ["36px", { lineHeight: "54px", letterSpacing: "-0.2px" }],
            },
            width: {
                base: "200px",
            },
            height: {
                base: "40px",
            },
            maxWidth: {
                "max-full": "1600px",
                "max-base": "1200px",
            },
            borderRadius: {
                base: "2rem",
            },
        },
    },
    plugins: [],
};
export default config;
