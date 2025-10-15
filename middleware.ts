import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

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

    // 이미 언어 코드가 있는 경로는 그대로 진행
    const locale = getLocale(pathname);
    if (locale) {
        return NextResponse.next();
    }

    // TODO: StartWith가 /admin으로 시작되는 경우 토큰 값 없으면 admin/login으로 redirect 필요

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
