import axios from "axios";
import { create } from "zustand";
import { persist } from "zustand/middleware";

interface TranslationState {
    currentLanguage: string;
    translations: Record<string, Record<string, string>>;
    loading: boolean;
    setLanguage: (language: string) => void;
    loadTranslations: (language: string) => Promise<void>;
    t: {
        [key: string]: string;
    };
}

export const useTranslationStore = create<TranslationState>()(
    persist(
        (set, get) => ({
            currentLanguage: "ko",
            translations: {},
            loading: false,

            setLanguage: (language: string) => {
                set({ currentLanguage: language });
                get().loadTranslations(language);
            },

            loadTranslations: async (language: string) => {
                set({ loading: true });

                try {
                    const response = await axios.get(`/api/translations?lang=${language}`);
                    const data = response.data;

                    set((state) => ({
                        translations: {
                            ...state.translations,
                            [language]: data,
                        },
                        loading: false,
                    }));
                } catch (error) {
                    console.error("Translation loading failed:", error);
                    set({ loading: false });
                }
            },

            t: new Proxy(
                {},
                {
                    get(target, key: string) {
                        const { currentLanguage, translations } = get();
                        const langTranslations = translations[currentLanguage] || {};
                        return langTranslations[key] || key;
                    },
                }
            ),
        }),
        {
            name: "translation-storage",
            partialize: (state) => ({
                currentLanguage: state.currentLanguage,
                translations: state.translations,
            }),
        }
    )
);
