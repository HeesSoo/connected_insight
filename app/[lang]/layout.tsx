import { ReactNode } from "react";

interface LangLayoutProps {
    children: ReactNode;
    params: Promise<{
        lang: string;
    }>;
}

export default async function LangLayout({ children, params }: LangLayoutProps) {
    // 언어별 레이아웃 처리가 필요하면 여기서 구현
    await params; // params를 await 처리
    return <>{children}</>;
}

// 정적 생성을 위한 언어 목록
export async function generateStaticParams() {
    return [{ lang: "en" }, { lang: "ko" }];
}
