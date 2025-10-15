import { ReactNode } from "react";

interface LangLayoutProps {
    children: ReactNode;
    params: {
        lang: string;
    };
}

export default function LangLayout({ children, params }: LangLayoutProps) {
    // 언어별 레이아웃 처리가 필요하면 여기서 구현
    return <>{children}</>;
}

// 정적 생성을 위한 언어 목록
export async function generateStaticParams() {
    return [{ lang: "en" }, { lang: "ko" }];
}
