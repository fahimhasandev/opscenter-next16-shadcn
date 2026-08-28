import "client-only";

const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL ?? "";

type ApiOptions = RequestInit & {
  token?: string;
};

export class ApiError extends Error {
  constructor(
    message: string,
    public status: number,
    public payload?: unknown
  ) {
    super(message);
  }
}

export async function apiClient<T>(
  path: string,
  options: ApiOptions = {}
): Promise<T> {
  const response = await fetch(`${API_BASE_URL}${path}`, {
    ...options,
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
      ...(options.token
        ? { Authorization: `Bearer ${options.token}` }
        : {}),
      ...(options.headers ?? {})
    }
  });

  const contentType = response.headers.get("content-type");
  const payload =
    contentType?.includes("application/json")
      ? await response.json()
      : await response.text();

  if (!response.ok) {
    throw new ApiError(
      typeof payload === "object" && payload && "message" in payload
        ? String((payload as { message?: string }).message)
        : "Backend request failed",
      response.status,
      payload
    );
  }

  return payload as T;
}
