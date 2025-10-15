import { useTranslationStore } from "@/stores/translationStore";

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
    const currentLanguage = useTranslationStore((state) => state.currentLanguage);
    const setLanguage = useTranslationStore((state) => state.setLanguage);
    const t = useTranslationStore((state) => state.t);

    return {
        t,
        currentLanguage,
        setLanguage,
    };
}
