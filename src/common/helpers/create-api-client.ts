// types
import { ApiError } from "@/common/types/api";

export const createApiClient = (baseUrl: string) => {
  const defaultHeaders = {
    "Content-Type": "application/json",
  };

  const fetcher = async <T>(
    endpoint: string,
    options?: RequestInit,
  ): Promise<T> => {
    const isFormData = options?.body instanceof FormData;

    try {
      const response = await fetch(`${baseUrl}${endpoint}`, {
        ...options,
        headers: isFormData
          ? options?.headers
          : {
              ...defaultHeaders,
              ...options?.headers,
            },
      });

      if (!response.ok) {
        const error: ApiError = {
          message: "Network response was not ok",
          info: await response.json(),
          status: response.status,
        };
        throw error;
      }

      return response.json();
    } catch (error) {
      if (error instanceof Error) {
        throw {
          message: error.message,
          info: (error as ApiError)?.info,
          status: (error as ApiError)?.status || 500,
        };
      }
      throw error;
    }
  };

  return {
    get: <T>(endpoint: string, headers?: HeadersInit) =>
      fetcher<T>(endpoint, { headers }),

    post: <T>(endpoint: string, data?: unknown, headers?: HeadersInit) =>
      fetcher<T>(endpoint, {
        method: "POST",
        body: data instanceof FormData ? data : JSON.stringify(data),
        headers,
      }),

    put: <T>(endpoint: string, data?: unknown, headers?: HeadersInit) =>
      fetcher<T>(endpoint, {
        method: "PUT",
        body: data instanceof FormData ? data : JSON.stringify(data),
        headers,
      }),

    patch: <T>(endpoint: string, data?: unknown, headers?: HeadersInit) =>
      fetcher<T>(endpoint, {
        method: "PATCH",
        body: data instanceof FormData ? data : JSON.stringify(data),
        headers,
      }),

    delete: <T>(endpoint: string, headers?: HeadersInit) =>
      fetcher<T>(endpoint, {
        method: "DELETE",
        headers,
      }),
  };
};
