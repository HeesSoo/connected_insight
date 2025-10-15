import { SpinnerProvider } from "@/components/Spinner";
import QueryProviderWrapper from "@/components/wrappers/QueryProviderWrapper";
import TranslationProvider from "@/components/TranslationProvider";
import { initializeTranslationScheduler } from "@/lib/translations";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

// 서버 시작 시 번역 스케줄러 초기화
initializeTranslationScheduler();

export const metadata: Metadata = {
    title: "EYEON",
    description: "EYEON",
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="ko">
            <head>
                <link
                    rel="stylesheet"
                    as="style"
                    crossOrigin="anonymous"
                    href="https://cdn.jsdelivr.net/gh/orioncactus/pretendard@v1.3.9/dist/web/static/pretendard.min.css"
                />
            </head>
            <body className={inter.className}>
                <QueryProviderWrapper>
                    <TranslationProvider>
                        <SpinnerProvider>{children}</SpinnerProvider>
                    </TranslationProvider>
                </QueryProviderWrapper>
            </body>
        </html>
    );
}
