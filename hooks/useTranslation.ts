import { useTranslationStore } from "@/stores/translationStore";
import { useEffect } from "react";

export function useTranslation() {
    const { currentLanguage, loading, t, loadTranslations } = useTranslationStore();

    useEffect(() => {
        loadTranslations(currentLanguage);
    }, [currentLanguage, loadTranslations]);

    return {
        t,
        loading,
        currentLanguage,
        setLanguage: useTranslationStore.getState().setLanguage,
    };
}
