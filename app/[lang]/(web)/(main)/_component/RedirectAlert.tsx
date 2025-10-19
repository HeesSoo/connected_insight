"use client";

import { useEffect } from "react";
import { useSearchParams, useRouter } from "next/navigation";

export default function RedirectAlert() {
    const searchParams = useSearchParams();
    const router = useRouter();

    useEffect(() => {
        const redirected = searchParams.get("redirected");

        if (redirected === "true") {
            alert("서비스 준비중입니다.");

            // URL에서 쿼리 파라미터 제거
            const url = new URL(window.location.href);
            url.searchParams.delete("redirected");
            router.replace(url.pathname);
        }
    }, [searchParams, router]);

    return null;
}