// Thin API client. Authentication is handled by an httpOnly cookie set by
// /api/auth/signup and /api/auth/signin — the browser sends it automatically
// with every same-origin request, so no manual header is needed.

async function request<T>(
  path: string,
  options: RequestInit = {}
): Promise<T> {
  const headers: Record<string, string> = {
    "Content-Type": "application/json",
    ...(options.headers as Record<string, string>),
  };

  const res = await fetch(path, { ...options, headers, credentials: "same-origin" });
  const data = await res.json();
  if (!res.ok) {
    throw new Error((data as { error?: string }).error || "Request failed");
  }
  return data as T;
}

export const api = {
  get: <T>(path: string) => request<T>(path),
  post: <T>(path: string, body?: unknown) =>
    request<T>(path, {
      method: "POST",
      body: body ? JSON.stringify(body) : undefined,
    }),
  del: <T>(path: string) => request<T>(path, { method: "DELETE" }),
};
