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

interface IHttpClient {
  get<T>(
    url: string,
    params: URLSearchParams,
    headers?: HeadersInit,
  ): Promise<FetchResult<T>>;
  get<T>(url: string, headers?: HeadersInit): Promise<FetchResult<T>>;
  post<T, K extends BodyInit>(
    url: string,
    body: K,
    headers?: HeadersInit,
  ): Promise<FetchResult<T>>;
}

class HttpClient implements IHttpClient {
  constructor(
    private baseUrl: string,
    private headers?: HeadersInit,
  ) {}

  private async fetchJson<T>(
    url: string,
    options?: RequestInit,
  ): Promise<FetchResult<T>> {
    const finalOptions: RequestInit = {
      ...options,
      headers: {
        ...this.headers,
        ...options?.headers,
      },
    };

    const response = await fetch(url, finalOptions);
    let result: T | undefined = undefined;

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

    return { result, response };
  }

  async get<T>(
    url: string,
    paramsOrHeaders?: URLSearchParams | HeadersInit,
    headers?: HeadersInit,
  ): Promise<FetchResult<T>> {
    const hasParams = paramsOrHeaders instanceof URLSearchParams;
    const finalUrl = hasParams
      ? `${this.baseUrl}${url}?${paramsOrHeaders.toString()}`
      : `${this.baseUrl}${url}`;

    const finalHeaders = hasParams ? headers : paramsOrHeaders;

    return await this.fetchJson<T>(finalUrl, {
      method: "GET",
      headers: finalHeaders,
    });
  }

  async post<T, K extends BodyInit>(
    url: string,
    body: K,
    headers?: HeadersInit,
  ): Promise<FetchResult<T>> {
    return await this.fetchJson<T>(`${this.baseUrl}${url}`, {
      method: "POST",
      body,
      headers,
    });
  }
}

function createHttpClient(baseUrl: string, headers?: HeadersInit) {
  return new HttpClient(baseUrl, headers);
}

export { createHttpClient };
