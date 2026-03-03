const API_URL =
    process.env.NEXT_PUBLIC_API_URL || "https://api.aliveai.ai/v1";

type RequestMethod = "GET" | "POST" | "PUT" | "DELETE" | "PATCH";

interface RequestOptions<TBody = unknown>
    extends Omit<RequestInit, "method" | "body"> {
    method?: RequestMethod;
    body?: TBody;
}

export async function apiClient<TResponse, TBody = unknown>(
    endpoint: string,
    options: RequestOptions<TBody> = {}
): Promise<TResponse> {
    const { method = "GET", headers, body, ...rest } = options;

    const defaultHeaders: Record<string, string> = {
        "Content-Type": "application/json",
    };

    // Add auth token (client-side only)
    if (typeof window !== "undefined") {
        const token = localStorage.getItem("auth_token");
        if (token) {
            defaultHeaders["Authorization"] = `Bearer ${token}`;
        }
    }

    const config: RequestInit = {
        method,
        headers: {
            ...defaultHeaders,
            ...(headers as Record<string, string>),
        },
        body: body ? JSON.stringify(body) : undefined,
        ...rest,
    };

    try {
        const response = await fetch(`${API_URL}${endpoint}`, config);

        if (!response.ok) {
            if (response.status === 401 && typeof window !== "undefined") {
                localStorage.removeItem("auth_token");
                window.location.href = "/auth/login";
            }

            const errorData: unknown = await response.json().catch(() => null);

            const message =
                typeof errorData === "object" &&
                    errorData !== null &&
                    "message" in errorData
                    ? String((errorData as { message?: string }).message)
                    : `API Error: ${response.status}`;

            throw new Error(message);
        }

        return (await response.json()) as TResponse;
    } catch (error) {
        console.error("API Request Failed:", error);
        throw error;
    }
}


/* Convenience Methods  */

apiClient.get = <TResponse>(
    endpoint: string,
    options?: Omit<RequestOptions, "method">
) => apiClient<TResponse>(endpoint, { ...options, method: "GET" });

apiClient.post = <TResponse, TBody = unknown>(
    endpoint: string,
    body: TBody,
    options?: Omit<RequestOptions<TBody>, "method" | "body">
) =>
    apiClient<TResponse, TBody>(endpoint, {
        ...options,
        method: "POST",
        body,
    });

apiClient.put = <TResponse, TBody = unknown>(
    endpoint: string,
    body: TBody,
    options?: Omit<RequestOptions<TBody>, "method" | "body">
) =>
    apiClient<TResponse, TBody>(endpoint, {
        ...options,
        method: "PUT",
        body,
    });

apiClient.delete = <TResponse>(
    endpoint: string,
    options?: Omit<RequestOptions, "method">
) => apiClient<TResponse>(endpoint, { ...options, method: "DELETE" });