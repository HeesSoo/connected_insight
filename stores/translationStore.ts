import { create } from "zustand";
import { persist } from "zustand/middleware";

// JSON 파일 직접 import (빌드 타임에 포함됨)
import koTranslations from "@/public/translations/ko.json";
import enTranslations from "@/public/translations/en.json";

// 모든 번역 데이터를 미리 로드
const preloadedTranslations: Record<string, Record<string, string>> = {
    ko: koTranslations,
    en: enTranslations,
};

interface TranslationState {
    currentLanguage: string;
    setLanguage: (language: string) => void;
    detectAndSetLanguageFromURL: (pathname: string) => void;
    t: {
        [key: string]: string;
    };
}

/**
 * URL 경로에서 언어 코드를 추출하는 함수
 */
export const getLanguageFromPath = (pathname: string): string => {
    // /en, /en/, /en/product 등의 패턴 매칭
    const match = pathname.match(/^\/([a-z]{2})(?:\/|$)/);
    return match ? match[1] : "ko";
};

/**
 * 브라우저 URL에서 언어 코드를 감지하는 함수
 */
const getLanguageFromURL = (): string => {
    if (typeof window === "undefined") return "ko";
    return getLanguageFromPath(window.location.pathname);
};

export const useTranslationStore = create<TranslationState>()(
    persist(
        (set, get) => ({
            currentLanguage: getLanguageFromURL(),

            setLanguage: (language: string) => {
                if (preloadedTranslations[language]) {
                    set({ currentLanguage: language });
                } else {
                    console.warn(`Not Found Translation: ${language}`);
                }
            },

            /**
             * URL 경로에서 언어를 감지하고 현재 언어와 다르면 자동으로 변경
             */
            detectAndSetLanguageFromURL: (pathname: string) => {
                const detectedLanguage = getLanguageFromPath(pathname);
                const currentLanguage = get().currentLanguage;

                if (detectedLanguage !== currentLanguage) {
                    // 언어가 변경된 경우
                    get().setLanguage(detectedLanguage);
                }
            },

            /**
             * 번역 함수 - Proxy를 사용하여 동적으로 번역 값 반환
             */
            t: new Proxy(
                {},
                {
                    get(target, key: string) {
                        const { currentLanguage } = get();
                        const langTranslations = preloadedTranslations[currentLanguage] || {};
                        return langTranslations[key] || key;
                    },
                }
            ),
        }),
        {
            name: "translation-storage",
            partialize: (state) => ({
                currentLanguage: state.currentLanguage,
            }),
        }
    )
);
