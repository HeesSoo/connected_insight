import { useTranslationStore } from "@/stores/translationStore";
import { usePathname } from "next/navigation";

/**
 * @example
 * const localizedPath = useLocalizedPath();
 * <Link href={localizedPath('/product')}>제품</Link>
 */
export function useLocalizedPath() {
    const currentLanguage = useTranslationStore((state) => state.currentLanguage);

    return (path: string) => {
        // 이미 언어 코드가 포함된 경로면 그대로 반환
        if (path.startsWith(`/${currentLanguage}`)) {
            return path;
        }

        // path가 /로 시작하지 않으면 추가
        const normalizedPath = path.startsWith("/") ? path : `/${path}`;

        // 현재 언어를 포함한 경로 반환
        return `/${currentLanguage}${normalizedPath}`;
    };
}

/**
 * 현재 경로에서 언어 코드를 제거한 경로를 반환하는 훅
 *
 * @example
 * const pathWithoutLang = usePathWithoutLang();
 */
export function usePathWithoutLang(): string {
    const pathname = usePathname();

    // /en/product -> /product
    // /ko -> /
    const match = pathname.match(/^\/[a-z]{2}(\/.*)?$/);
    return match ? (match[1] || "/") : pathname;
}
