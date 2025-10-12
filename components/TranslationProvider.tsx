"use client";

import { useTranslationStore } from "@/stores/translationStore";
import { useEffect, useState } from "react";

interface TranslationProviderProps {
    children: React.ReactNode;
}

export default function TranslationProvider({ children }: TranslationProviderProps) {
    const { loadTranslations, currentLanguage, loading } = useTranslationStore();
    const [isInitialized, setIsInitialized] = useState(false);

    useEffect(() => {
        const loadTranslationsAsync = async () => {
            await loadTranslations(currentLanguage || "ko");
            setIsInitialized(true);
        };

        loadTranslationsAsync();
    }, [loadTranslations, currentLanguage]);

    // 번역이 로드되기 전까지는 로딩 화면 표시
    if (!isInitialized) {
        return <div></div>;
    }

    return <>{children}</>;
}
