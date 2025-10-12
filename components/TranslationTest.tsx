"use client";

import { useTranslation } from "@/hooks/useTranslation";
import LanguageSwitcher from "./LanguageSwitcher";

export default function TranslationTest() {
    const { t, loading, currentLanguage } = useTranslation();

    if (loading) {
        return <div className="p-4">번역 로딩 중...</div>;
    }

    return (
        <div className="p-6 space-y-4 border rounded-lg">
            <div className="flex items-center gap-4">
                <h2 className="text-xl font-bold">번역 테스트</h2>
                <LanguageSwitcher />
                <span className="text-sm text-gray-500">현재 언어: {currentLanguage}</span>
            </div>

            <div className="space-y-2">
                <p>
                    <strong>t.title:</strong> {t.title}
                </p>
                <p>
                    <strong>t.subtitle:</strong> {t.subtitle}
                </p>
                <p>
                    <strong>t.welcome:</strong> {t.welcome}
                </p>
                <p>
                    <strong>t.hello:</strong> {t.hello}
                </p>
                <p>
                    <strong>t.button:</strong> {t.button}
                </p>
                <p>
                    <strong>t.submit:</strong> {t.submit}
                </p>
                <p>
                    <strong>t.cancel:</strong> {t.cancel}
                </p>
            </div>
        </div>
    );
}
