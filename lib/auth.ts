import { cookies } from "next/headers";

/**
 * 서버 사이드에서 accessToken 쿠키를 확인
 * @returns accessToken이 있으면 true, 없으면 false
 */
export async function checkAuth(): Promise<boolean> {
    const cookieStore = await cookies();
    const accessToken = cookieStore.get("accessToken");
    return !!accessToken?.value;
}

/**
 * 서버 사이드에서 accessToken을 가져옴
 */
export async function getServerAccessToken(): Promise<string | null> {
    const cookieStore = await cookies();
    const accessToken = cookieStore.get("accessToken");
    return accessToken?.value || null;
}