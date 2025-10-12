import { useTranslation } from "@/hooks/useTranslation";

const languages = [
    { code: "ko", name: "한국어" },
    { code: "en", name: "English" },
];

export default function LanguageSwitcher() {
    const { currentLanguage, setLanguage } = useTranslation();

    return (
        <select value={currentLanguage} onChange={(e) => setLanguage(e.target.value)} className="px-3 py-2 border rounded">
            {languages.map((lang) => (
                <option key={lang.code} value={lang.code}>
                    {lang.name}
                </option>
            ))}
        </select>
    );
}
