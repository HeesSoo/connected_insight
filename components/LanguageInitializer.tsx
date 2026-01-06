"use client";

import { useTranslationStore } from "@/stores/translationStore";
import { useEffect } from "react";

interface LanguageInitializerProps {
    language: string;
}

export function LanguageInitializer({ language }: LanguageInitializerProps) {
    const setLanguage = useTranslationStore((state) => state.setLanguage);

    useEffect(() => {
        // 서버에서 전달받은 언어로 초기화
        setLanguage(language);
    }, [language, setLanguage]);

    return null;
}
