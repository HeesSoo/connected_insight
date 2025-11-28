import axios, { AxiosError, AxiosInstance, InternalAxiosRequestConfig } from "axios";

// API Base URL 설정 (Next.js 프록시를 통해 요청)
const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || '/api/proxy';

// 쿠키에서 토큰 읽기 (클라이언트 사이드)
const getTokenFromCookie = (): string | null => {
  if (typeof window === "undefined") return null;

  const name = "token=";
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

// Axios 인스턴스 생성
const Apis: AxiosInstance = axios.create({
  baseURL: API_BASE_URL,
  timeout: 10000,
  headers: {
    "Content-Type": "application/json",
  },
  withCredentials: true, // Cookie 자동 전송 (httpOnly JWT 사용 시)
});

// Request 인터셉터
Apis.interceptors.request.use(
  (config: InternalAxiosRequestConfig) => {
    // 쿠키에서 토큰을 읽어서 Authorization 헤더에 추가
    const token = getTokenFromCookie();
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
    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      try {
        // Refresh token 로직을 여기에 추가할 수 있습니다
        // const { data } = await axios.post(`${API_BASE_URL}/auth/refresh`);
        // return Apis(originalRequest);
      } catch (refreshError) {
        // Refresh 실패 시 로그인 페이지로 리다이렉트
        if (typeof window !== "undefined") {
          window.location.href = "/login";
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
