export class ApiError extends Error {
  status: number;
  data: unknown;

  constructor(message: string, status: number, data?: unknown) {
    super(message);
    this.status = status;
    this.data = data;
  }
}

type FetchOptions = RequestInit & {
  token?: string;
};

const DEFAULT_BASE_URL = process.env.NEXT_PUBLIC_API_URL || "";

export async function apiFetch<T>(
  endpoint: string,
  options: FetchOptions = {}
): Promise<T> {
  const { token, headers, ...rest } = options;
  
  // Get locale safely for both server and client
  let locale = "ar";
  try {
    if (typeof window === "undefined") {
      const { getLocale } = await import("next-intl/server");
      locale = await getLocale();
    } else {
      locale = document.documentElement.lang || "ar";
    }
  } catch (e) {
    console.error("Error getting locale in apiFetch:", e);
  }

  // Ensure the URL is absolute for server-side fetching
  const url = endpoint.startsWith("http") ? endpoint : `${DEFAULT_BASE_URL}${endpoint}`;

  // Get token if not provided
  let activeToken = token;
  if (!activeToken) {
    if (typeof window === "undefined") {
      try {
        const { cookies } = await import("next/headers");
        const cookieStore = await cookies();
        activeToken = cookieStore.get("token")?.value;
      } catch (e) {}
    } else {
      try {
        const { useAuthStore } = await import("@/features/auth/store/auth-store");
        activeToken = useAuthStore.getState().token || undefined;
      } catch (e) {}
    }
  }

  let res;
  try {
    res = await fetch(url, {
      ...rest,
      headers: {
        "Accept-Language": locale,
        "Accept": "application/json",
        "Content-Type": "application/json",
        ...(activeToken && { Authorization: `Bearer ${activeToken}` }),
        ...headers,
      },
    });
  } catch (error) {
    console.error("Fetch failed for URL:", url, error);
    throw new ApiError(
      "Network Error: Failed to connect to the server. Please check your internet connection.",
      500
    );
  }

  let data;
  try {
    data = await res.json();
  } catch {
    data = null;
  }

  if (!res.ok) {
    throw new ApiError(
      data?.message || "Something went wrong",
      res.status,
      data
    );
  }

  return data;
}