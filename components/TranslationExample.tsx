import { useTranslation } from "@/hooks/useTranslation";
import LanguageSwitcher from "./LanguageSwitcher";

export default function TranslationExample() {
    const { t } = useTranslation();

    return (
        <div className="p-6 space-y-4">
            <div className="flex items-center gap-4">
                <h2 className="text-xl font-bold">번역 테스트</h2>
                <LanguageSwitcher />
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
