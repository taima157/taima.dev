export type FetchResult<T> = {
  result: T | undefined;
  response: Response;
};

export class HttpError extends Error {
  constructor(
    public status: number,
    public response: Response,
    public statusText: string,
    public body: string,
  ) {
    super(`HTTP Error ${status}: ${statusText} - ${body}`);
  }
}

export function getSafeEnv(name: string): string {
  const value = process.env[name];

  if (!value) {
    throw new Error(`Missing required environment variable: ${name}`);
  }

  return value;
}

export async function fetchJson<T>(url: string, options?: RequestInit) {
  const response = await fetch(url, options);
  let result = undefined;

  if (!response.ok) {
    throw new HttpError(
      response.status,
      response,
      response.statusText,
      await response.text(),
    );
  }

  if (response.status !== 204) {
    result = await response.json();
  }

  return { result, response } as FetchResult<T>;
}

export async function getFetch<T>(
  url: string,
  options?: Omit<RequestInit, "method">,
) {
  return await fetchJson<T>(url, { method: "GET", ...options });
}

export async function postFetch<T, K extends BodyInit>(
  url: string,
  body: K,
  options?: Omit<RequestInit, "method" | "body">,
) {
  return await fetchJson<T>(url, { method: "POST", body, ...options });
}
