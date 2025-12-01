/** @type {import('next').NextConfig} */
const nextConfig = {
    webpack: (config, { dev }) => {
        config.module.rules.push({
            test: /\.svg$/i,
            issuer: /\.[jt]sx?$/,
            use: ["@svgr/webpack"],
        });

        // 프로덕션 빌드에서 console.log 제거
        if (!dev) {
            config.optimization = {
                ...config.optimization,
                minimize: true,
                minimizer: [
                    ...config.optimization.minimizer,
                ],
            };
        }

        return config;
    },
    compiler: {
        // 프로덕션에서 console 제거 (Next.js 13+)
        removeConsole: process.env.NODE_ENV === 'production' ? {
            exclude: ['error', 'warn'], // error와 warn은 유지
        } : false,
    },
    images: {
        remotePatterns: [
            {
                protocol: "https",
                hostname: "eyeon-bucket-pjt.s3.ap-northeast-2.amazonaws.com",
                pathname: "/**",
            },
            {
                protocol: "https",
                hostname: "eyeon.bucket.s3.ap-northeast-2.amazonaws.com",
                pathname: "/**",
            },
        ],
        unoptimized: true
    },
};

export default nextConfig;
