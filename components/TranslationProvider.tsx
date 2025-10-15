"use client";

import { useTranslationStore } from "@/stores/translationStore";
import { useEffect } from "react";
import { usePathname } from "next/navigation";

interface TranslationProviderProps {
    children: React.ReactNode;
}

export default function TranslationProvider({ children }: TranslationProviderProps) {
    const detectAndSetLanguageFromURL = useTranslationStore((state) => state.detectAndSetLanguageFromURL);
    const pathname = usePathname();

    useEffect(() => {
        // URL이 변경될 때마다 언어 감지 및 자동 변경
        detectAndSetLanguageFromURL(pathname);
    }, [pathname, detectAndSetLanguageFromURL]);

    return <>{children}</>;
}
