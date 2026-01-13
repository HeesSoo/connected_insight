import { create } from "zustand";
import Apis from "@/hooks/api";

// 쿠키 유틸 함수들
const TOKEN_KEY = "accessToken";

const getTokenFromCookie = (): string | null => {
    if (typeof window === "undefined") return null;

    const name = `${TOKEN_KEY}=`;
    const decodedCookie = decodeURIComponent(document.cookie);
    const cookieArray = decodedCookie.split(";");

    for (let i = 0; i < cookieArray.length; i++) {
        let cookie = cookieArray[i].trim();
        if (cookie.indexOf(name) === 0) {
            return cookie.substring(name.length, cookie.length);
        }
    }
    return null;
};

const setTokenToCookie = (token: string) => {
    if (typeof window === "undefined") return;

    const maxAge = 1 * 60 * 60; // 9 hours in seconds
    document.cookie = `${TOKEN_KEY}=${token}; path=/; max-age=${maxAge}; SameSite=Strict`;
};

const removeTokenFromCookie = () => {
    if (typeof window === "undefined") return;
    document.cookie = `${TOKEN_KEY}=; path=/; max-age=0`;
};

// Zustand Store 타입 정의
interface AuthState {
    accessToken: string | null;
    isLoading: boolean;
    isAuthenticated: boolean;
    user: Record<string, any> | null;
    login: (token: string, user: Record<string, any>) => void;
    logout: () => Promise<void>;
    initialize: () => Promise<void>;
}

// Zustand Store 생성
export const useAuthStore = create<AuthState>((set) => ({
    accessToken: null,
    isLoading: true,
    isAuthenticated: false,
    user: null,

    // 초기화 (쿠키에서 토큰 로드 및 사용자 정보 조회)
    initialize: async () => {
        const token = getTokenFromCookie();

        if (!token) {
            set({
                accessToken: null,
                isAuthenticated: false,
                isLoading: false,
                user: null,
            });
            return;
        }

        if (!token) {
            set({
                accessToken: null,
                isAuthenticated: false,
                isLoading: false,
                user: null,
            });
        }
        try {
            // 토큰이 있으면 사용자 정보 조회
            const response = await Apis.get(`/user/me`);
            // const response = await Apis.get(`http://localhost:8080/api/user/me`);
            console.log(response.data?.data, " : respomse");
            set({
                accessToken: token,
                isAuthenticated: true,
                isLoading: false,
                user: response.data?.data,
            });
        } catch (error) {
            // 사용자 정보 조회 실패 시 (토큰이 유효하지 않은 경우)
            removeTokenFromCookie();
            set({
                accessToken: null,
                isAuthenticated: false,
                isLoading: false,
                user: null,
            });
        }
    },

    // 로그인
    login: (token: string, user: Record<string, any>) => {

        setTokenToCookie(token);
        console.log(user, " : user")
        set({
            accessToken: token,
            isAuthenticated: true,
            user: user,
        });
    },

    // 로그아웃
    logout: async () => {
        try {
            await Apis.post("/auth/logout");
        } catch (error) {
            console.error("Logout API failed:", error);
        } finally {
            removeTokenFromCookie();
            set({
                accessToken: null,
                isAuthenticated: false,
                user: null,
            });
        }
    },
}));

// accessToken을 가져오는 유틸 함수 (API 인터셉터에서 사용)
export const getAccessToken = (): string | null => {
    if (typeof window === "undefined") return null;

    const name = "accessToken=";
    const decodedCookie = decodeURIComponent(document.cookie);
    const cookieArray = decodedCookie.split(";");

    for (let i = 0; i < cookieArray.length; i++) {
        let cookie = cookieArray[i].trim();
        if (cookie.indexOf(name) === 0) {
            return cookie.substring(name.length, cookie.length);
        }
    }
    return null;
};