import { getIronSession, SessionOptions } from "iron-session";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

const SESSION_COOKIE_NAME = "CI-token";

// TODO: 환경 변수 설정 이후에 다시.
if (!process.env.COOKIE_PASSWORD) {
    throw new Error("COOKIE_PASSWORD environment variable is required");
}

// TODO: Return 정리되면 다시.
interface SessionContent {
    id: string;
    token: string;
}

export const sessionOptions: SessionOptions = {
    password: process.env.COOKIE_PASSWORD, // TODO: 환경 변수 설정 이후에 다시.
    cookieName: SESSION_COOKIE_NAME,
    ttl: 43200, // 12시간
    cookieOptions: {
        sameSite: "lax",
        secure: process.env.NODE_ENV === "production",
        maxAge: 3600 - 60,
        path: "/",
    },
};

export default async function getSession() {
    try {
        const cookieData = await cookies();
        const session = await getIronSession<SessionContent>(cookieData, sessionOptions);
        return session;
    } catch (error) {
        console.error("Session error:", error);
        return null;
    }
}

export async function getValidSession() {
    const session = await getSession();

    if (!session?.id) {
        redirect("/login");
    }

    return session;
}

// 세션 삭제 (로그아웃)
export async function clearSession() {
    const session = await getSession();

    if (session) {
        session.destroy();
    }
}

// 세션 유효성 검사
export async function isSessionValid(): Promise<boolean> {
    const session = await getSession();
    return !!session?.id;
}
