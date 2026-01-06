import { ReactNode } from "react";
import { LanguageInitializer } from "@/components/LanguageInitializer";

interface LangLayoutProps {
    children: ReactNode;
    params: Promise<{
        lang: string;
    }>;
}

export default async function LangLayout({ children, params }: LangLayoutProps) {
    const { lang } = await params;

    return (
        <>
            <LanguageInitializer language={lang} />
            {children}
        </>
    );
}

// 정적 생성을 위한 언어 목록
export async function generateStaticParams() {
    return [{ lang: "en" }, { lang: "ko" }];
}
