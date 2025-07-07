import axios, { AxiosInstance, AxiosRequestConfig } from "axios";

export interface ApiResponse<T = any> {
    data: T;
    message?: string;
    success: boolean;
}

let axiosInstance: AxiosInstance | null = null;
const requestHeaders = new Map<string, string>();

const getAxiosInstance = (): AxiosInstance => {
    if (!axiosInstance) {
        axiosInstance = axios.create({
            baseURL: process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:3000/api",
            timeout: 10000,
            headers: { "Content-Type": "application/json" },
        });

        axiosInstance.interceptors.request.use((config) => {
            requestHeaders.forEach((value, key) => {
                config.headers[key] = value;
            });
            return config;
        });
    }
    return axiosInstance;
};

export const setAuthToken = (token: string | null): void => {
    if (token) {
        requestHeaders.set("Authorization", `Bearer ${token}`);
    } else {
        requestHeaders.delete("Authorization");
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
        const response = await instance[method]<ApiResponse<T>>(url, data, config);
        return response.data;
    } catch (error) {
        throw handleError(error);
    }
};

export const apiGet = <T = any>(url: string, config?: AxiosRequestConfig) => apiCall<T>("get", url, undefined, config);
export const apiPost = <T = any>(url: string, data?: any, config?: AxiosRequestConfig) => apiCall<T>("post", url, data, config);
export const apiPut = <T = any>(url: string, data?: any, config?: AxiosRequestConfig) => apiCall<T>("put", url, data, config);
export const apiPatch = <T = any>(url: string, data?: any, config?: AxiosRequestConfig) => apiCall<T>("patch", url, data, config);
export const apiDelete = <T = any>(url: string, config?: AxiosRequestConfig) => apiCall<T>("delete", url, undefined, config);

// 나중에 파일업로드 필요 시
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
