import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";

// 지원하는 언어 목록
const locales = ["ko", "en"];
const defaultLocale = "ko";

// 언어 코드가 포함된 경로인지 확인
function getLocale(pathname: string): string | null {
    const segments = pathname.split("/");
    const firstSegment = segments[1];

    if (locales.includes(firstSegment)) {
        return firstSegment;
    }

    return null;
}

export function middleware(request: NextRequest) {
    const { pathname } = request.nextUrl;

    // API 라우트, _next, static 파일, public 파일은 무시
    if (
        pathname.startsWith("/api") ||
        pathname.startsWith("/_next") ||
        pathname.startsWith("/translations") ||
        pathname.includes(".")
    ) {
        return NextResponse.next();
    }

    // Admin 경로 처리
    if (pathname.startsWith("/admin")) {
        // 로그인 페이지는 인증 체크 건너뛰기
        if (pathname === "/admin/login") {
            return NextResponse.next();
        }

        // TODO: 토큰 값 체크 로직 추가
        // const token = request.cookies.get("admin_token");
        // if (!token) {
        //   return NextResponse.redirect(new URL("/admin/login", request.url));
        // }

        return NextResponse.next();
    }

    // 언어 코드가 있는지 확인
    const locale = getLocale(pathname);
    const pathnameWithoutLocale = locale
        ? pathname.replace(`/${locale}`, "") || "/"
        : pathname;

    const allowUrl = [
        "/",
        "/solutions",
        "/product",
        "/product/:id",
        "/contact",
        "/support",
    ];

    // allowUrl에 포함된 경로인지 확인 (언어 코드 제외한 경로로 체크)
    const isAllowedUrl = allowUrl.some((url) => {
        // :id와 같은 동적 경로 처리
        if (url.includes(":")) {
            const urlPattern = url.replace(/:[^/]+/g, "[^/]+");
            const regex = new RegExp(`^${urlPattern}$`);
            return regex.test(pathnameWithoutLocale);
        }
        // 루트 경로는 정확히 일치해야 함
        if (url === "/") {
            return pathnameWithoutLocale === "/";
        }
        // 그 외 경로는 정확히 일치하거나 해당 경로로 시작하는지 확인 (예: /product, /product/123)
        return (
            pathnameWithoutLocale === url ||
            pathnameWithoutLocale.startsWith(url + "/")
        );
    });

    // allowUrl에 없는 경로면 루트(/)로 리다이렉트
    if (!isAllowedUrl) {
        const url = request.nextUrl.clone();
        url.pathname = locale ? `/${locale}` : "/";
        url.searchParams.set("redirected", "true");
        return NextResponse.redirect(url);
    }

    // 이미 언어 코드가 있는 경로는 그대로 진행
    if (locale) {
        return NextResponse.next();
    }

    // 언어 코드가 없는 경로는 기본 언어(ko)로 리다이렉트
    const url = request.nextUrl.clone();
    url.pathname = `/${defaultLocale}${pathname}`;
    return NextResponse.redirect(url);
}

export const config = {
    matcher: [
        /*
         * Match all request paths except:
         * - api routes
         * - _next (Next.js internals)
         * - static files
         */
        "/((?!api|_next/static|_next/image|favicon.ico|.*\\.).*)",
    ],
};
