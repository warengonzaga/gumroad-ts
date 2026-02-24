import { GumroadApiError, GumroadNetworkError } from "../errors.js";
import type { HttpMethod } from "../types.js";
import { buildUrl } from "./url.js";

/** Options for a single API request (used internally by endpoint modules) */
export interface RequestOptions {
  method: HttpMethod;
  path: string;
  params?: Record<string, unknown>;
  body?: Record<string, unknown>;
}

/** Function signature used by endpoint modules to make API requests */
export type RequestFn = <T>(options: RequestOptions) => Promise<T>;

/** Create a bound request function with the given base URL and token */
export function createRequestFn(baseUrl: string, token: string): RequestFn {
  return async <T>(options: RequestOptions): Promise<T> => {
    const { method, path, params, body } = options;

    const url = buildUrl(baseUrl, path, method === "GET" ? params : undefined);

    const headers: Record<string, string> = {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    };

    const fetchOptions: RequestInit = {
      method,
      headers,
    };

    if (method !== "GET" && (body || params)) {
      fetchOptions.body = JSON.stringify(body || params || {});
    }

    let response: Response;
    try {
      response = await fetch(url, fetchOptions);
    } catch (error) {
      throw new GumroadNetworkError(
        `Network error while requesting ${method} ${path}`,
        error instanceof Error ? error : undefined,
      );
    }

    let data: unknown;
    try {
      data = await response.json();
    } catch {
      throw new GumroadApiError(
        `Invalid JSON response from ${method} ${path}`,
        response.status,
      );
    }

    if (!response.ok) {
      const message =
        (data as Record<string, unknown>)?.message ??
        `API request failed with status ${response.status}`;
      throw new GumroadApiError(String(message), response.status, data);
    }

    return data as T;
  };
}
