import axios, { AxiosInstance, AxiosRequestConfig, InternalAxiosRequestConfig, AxiosResponse } from "axios";
import { setupCache, buildMemoryStorage } from "axios-cache-interceptor";

export interface ApiResponse<T = any> {
  data: T;
  message?: string;
  success: boolean;
}

let axiosInstance: AxiosInstance | null = null;

const getAxiosInstance = (): AxiosInstance => {
  if (!axiosInstance) {
    const instance = axios.create({
      baseURL: process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:3000/api",
      timeout: 10000,
      headers: { "Content-Type": "application/json" },
    });

    // 캐시 설정 적용
    axiosInstance = setupCache(instance, {
      storage: buildMemoryStorage(),
      ttl: 5 * 60 * 1000, // 기본 5분 캐시
      methods: ["get"], // GET 요청만 캐싱
      cachePredicate: {
        statusCheck: (status) => status >= 200 && status < 300,
      },
    });

    // Request Interceptor: 자동 토큰 주입
    axiosInstance.interceptors.request.use(
      async (config: InternalAxiosRequestConfig) => {
        // 클라이언트 사이드에서만 세션 토큰 가져오기
        if (typeof window !== "undefined") {
          try {
            const response = await fetch("/api/auth/session");
            if (response.ok) {
              const session = await response.json();
              if (session?.token) {
                config.headers.Authorization = `Bearer ${session.token}`;
              }
            }
          } catch (error) {
            console.warn("Failed to fetch session token:", error);
          }
        }
        return config;
      },
      (error) => Promise.reject(error)
    );

    // Response Interceptor: 401 에러 처리
    axiosInstance.interceptors.response.use(
      (response) => response,
      async (error) => {
        if (error.response?.status === 401) {
          // 401 Unauthorized - 자동 로그아웃
          if (typeof window !== "undefined") {
            try {
              await fetch("/api/auth/logout", { method: "POST" });
              window.location.href = "/admin/login";
            } catch (logoutError) {
              console.error("Logout failed:", logoutError);
            }
          }
        }
        return Promise.reject(error);
      }
    );
  }
  return axiosInstance;
};

// 수동으로 토큰 설정하는 함수 (필요시 사용)
export const setAuthToken = (token: string | null): void => {
  const instance = getAxiosInstance();
  if (token) {
    instance.defaults.headers.common["Authorization"] = `Bearer ${token}`;
  } else {
    delete instance.defaults.headers.common["Authorization"];
  }
};

const handleError = (error: any): Error => {
  console.error("API Error:", error);
  return new Error(error.response?.data?.message || "요청 처리 중 오류가 발생했습니다.");
};

const apiCall = async <T>(
  method: "get" | "post" | "put" | "patch" | "delete",
  url: string,
  data?: any,
  config?: AxiosRequestConfig
): Promise<ApiResponse<T>> => {
  try {
    const instance = getAxiosInstance();
    let response: AxiosResponse<ApiResponse<T>>;

    if (method === "get" || method === "delete") {
      response = await instance[method]<ApiResponse<T>>(url, config);
    } else {
      response = await instance[method]<ApiResponse<T>>(url, data, config);
    }

    return response.data;
  } catch (error) {
    throw handleError(error);
  }
};

// 캐시 옵션을 추가한 config 타입
export interface CacheRequestConfig extends AxiosRequestConfig {
  cache?: {
    ttl?: number; // 밀리초 단위
    override?: boolean; // 기존 캐시 무시
  };
}

export const apiGet = <T = any>(url: string, config?: CacheRequestConfig) => apiCall<T>("get", url, undefined, config);
export const apiPost = <T = any>(url: string, data?: any, config?: AxiosRequestConfig) => apiCall<T>("post", url, data, config);
export const apiPut = <T = any>(url: string, data?: any, config?: AxiosRequestConfig) => apiCall<T>("put", url, data, config);
export const apiPatch = <T = any>(url: string, data?: any, config?: AxiosRequestConfig) => apiCall<T>("patch", url, data, config);
export const apiDelete = <T = any>(url: string, config?: AxiosRequestConfig) => apiCall<T>("delete", url, undefined, config);

// 나중에 파일업로드 필요 시 주석 해제.
// export const apiUpload = async <T = any>(url: string, formData: FormData, config?: AxiosRequestConfig): Promise<ApiResponse<T>> => {
//     try {
//         const instance = getAxiosInstance();
//         const response = await instance.post<ApiResponse<T>>(url, formData, {
//             ...config,
//             headers: { ...config?.headers, "Content-Type": "multipart/form-data" },
//         });
//         return response.data;
//     } catch (error) {
//         throw handleError(error);
//     }
// };

export const Apis = {
  setAuthToken,
  get: apiGet,
  post: apiPost,
  put: apiPut,
  patch: apiPatch,
  delete: apiDelete,
  // upload: apiUpload,
};

export default Apis;
