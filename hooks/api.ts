import axios, { AxiosError, AxiosInstance, InternalAxiosRequestConfig } from "axios";
import { getAccessToken } from "@/store/authStore";

// API Base URL 설정 (Next.js 프록시를 통해 요청)
const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || '/api/proxy';

// Axios 인스턴스 생성
const Apis: AxiosInstance = axios.create({
  baseURL: API_BASE_URL,
  timeout: 10000,
  headers: {
    "Content-Type": "application/json",
    "Cache-Control": "no-store",
  },
  withCredentials: true, // Cookie 자동 전송 (httpOnly JWT 사용 시)
});

// 서버/클라이언트 환경에 맞게 토큰을 가져오는 함수
async function getToken(): Promise<string | null> {
  // 클라이언트 환경
  if (typeof window !== "undefined") {
    return getAccessToken();
  }

  // 서버 환경 - cookies()를 직접 사용
  try {
    const { cookies } = await import("next/headers");
    const cookieStore = cookies();
    const accessToken = cookieStore.get("accessToken");
    return accessToken?.value || null;
  } catch (error) {
    console.error("Failed to get server access token:", error);
    return null;
  }
}

// Request 인터셉터
Apis.interceptors.request.use(
  async (config: InternalAxiosRequestConfig) => {
    // 서버/클라이언트 환경에 맞게 accessToken을 읽어서 Authorization 헤더에 추가
    const token = await getToken();

    if (token && config.headers) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
  },
  (error: AxiosError) => {
    return Promise.reject(error);
  }
);

// Response 인터셉터
Apis.interceptors.response.use(
  (response) => {
    return response;
  },
  async (error: AxiosError) => {
    const originalRequest = error.config as InternalAxiosRequestConfig & { _retry?: boolean };

    // 401 에러 처리 (인증 실패)
    // 로그인 요청은 401 리프레시 로직 건너뛰기
    const isLoginRequest = originalRequest.url?.includes('/user/login') || originalRequest.url?.includes('/auth/login');

    if (error.response?.status === 401 && !originalRequest._retry && !isLoginRequest) {
      originalRequest._retry = true;

      try {
        // Refresh Token으로 새로운 Access Token 발급
        // refreshToken은 httpOnly 쿠키에 저장되어 있어 자동으로 전송됨
        const { data } = await axios.post(`${API_BASE_URL}/auth/refresh`, {}, {
          withCredentials: true, // httpOnly 쿠키 전송
        });

        // 새로운 accessToken을 쿠키에 저장
        if (data.data?.accessToken) {
          const maxAge = 9 * 60 * 60; // 9 hours
          document.cookie = `accessToken=${data.data.accessToken}; path=/; max-age=${maxAge}; SameSite=Strict`;

          // 원래 요청의 Authorization 헤더 업데이트
          if (originalRequest.headers) {
            originalRequest.headers.Authorization = `Bearer ${data.data.accessToken}`;
          }

          // 원래 요청 재시도
          return Apis(originalRequest);
        }
      } catch (refreshError) {
        // Refresh 실패 시 쿠키 삭제 및 로그인 페이지로 리다이렉트
        if (typeof window !== "undefined") {
          document.cookie = "accessToken=; path=/; max-age=0";
          document.cookie = "refreshToken=; path=/; max-age=0";

          // 강제 리디렉트로 middleware가 동작하도록 함
          window.location.href = "/admin/login";
        }
        return Promise.reject(refreshError);
      }
    }

    // 에러 메시지 처리
    const errorMessage = (error.response?.data as any)?.message || error.message || "Unknown error occurred";

    console.error("API Error:", {
      url: error.config?.url,
      method: error.config?.method,
      status: error.response?.status,
      message: errorMessage,
    });

    return Promise.reject(error);
  }
);

// API 헬퍼 함수들
export const api = {
  get: <T = any>(url: string, config?: any) => Apis.get<T>(url, config),

  post: <T = any>(url: string, data?: any, config?: any) => Apis.post<T>(url, data, config),

  put: <T = any>(url: string, data?: any, config?: any) => Apis.put<T>(url, data, config),

  patch: <T = any>(url: string, data?: any, config?: any) => Apis.patch<T>(url, data, config),

  delete: <T = any>(url: string, config?: any) => Apis.delete<T>(url, config),
};

export default Apis;