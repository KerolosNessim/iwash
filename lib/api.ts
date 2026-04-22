import { getLocale } from "next-intl/server";

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
  const locale = await getLocale();

  // Ensure the URL is absolute for server-side fetching
  const url = endpoint.startsWith("http") ? endpoint : `${DEFAULT_BASE_URL}${endpoint}`;

  const res = await fetch(url, {
    ...rest,
    headers: {
      "Accept-Language": locale,
      "Accept": "application/json",
      "Content-Type": "application/json",
      ...(token && { Authorization: `Bearer ${token}` }),
      ...headers,
    },
  });

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