/** @type {import('next').NextConfig} */
const nextConfig = {
    webpack: (config) => {
        config.module.rules.push({
            test: /\.svg$/i,
            issuer: /\.[jt]sx?$/,
            use: ["@svgr/webpack"],
        });
        return config;
    },
    images: {
        remotePatterns: [
            {
                protocol: "https",
                hostname: "eyeon-bucket-pjt.s3.ap-northeast-2.amazonaws.com",
                pathname: "/**",
            },
        ],
        unoptimized: true
    },
};

export default nextConfig;
