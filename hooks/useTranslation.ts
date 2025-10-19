import { useTranslationStore } from "@/stores/translationStore";
import { usePathname } from "next/navigation";
import { useEffect } from "react";

/**
 * 번역 기능을 위한 편의성 훅
 * useTranslationStore를 직접 사용해도 되지만,
 * 이 훅을 사용하면 더 간편하게 번역 기능을 사용할 수 있습니다.
 *
 * @example
 * const { t, currentLanguage, setLanguage } = useTranslation();
 * <p>{t.welcome_message}</p>
 */
export function useTranslation() {
    const pathname = usePathname();
    const currentLanguage = useTranslationStore((state) => state.currentLanguage);
    const setLanguage = useTranslationStore((state) => state.setLanguage);
    const detectAndSetLanguageFromURL = useTranslationStore((state) => state.detectAndSetLanguageFromURL);
    const t = useTranslationStore((state) => state.t);

    // 클라이언트에서 마운트될 때 URL에서 언어 감지
    useEffect(() => {
        detectAndSetLanguageFromURL(pathname);
    }, [pathname, detectAndSetLanguageFromURL]);

    return {
        t,
        currentLanguage,
        setLanguage,
    };
}
