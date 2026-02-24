import { describe, it, expect, beforeEach, afterEach, mock } from "bun:test";
import { createRequestFn } from "../../src/utils/fetch";
import { GumroadApiError, GumroadNetworkError } from "../../src/errors";

describe("createRequestFn", () => {
  const originalFetch = globalThis.fetch;

  afterEach(() => {
    globalThis.fetch = originalFetch;
  });

  it("should make a GET request with Bearer token", async () => {
    const mockResponse = { success: true, products: [] };
    globalThis.fetch = mock(async () =>
      new Response(JSON.stringify(mockResponse), {
        status: 200,
        headers: { "Content-Type": "application/json" },
      }),
    ) as typeof fetch;

    const request = createRequestFn("https://api.gumroad.com/v2", "test-token");
    const result = await request({ method: "GET", path: "/products" });

    expect(result).toEqual(mockResponse);
    expect(globalThis.fetch).toHaveBeenCalledTimes(1);

    const [url, options] = (globalThis.fetch as ReturnType<typeof mock>).mock
      .calls[0] as [string, RequestInit];
    expect(url).toBe("https://api.gumroad.com/v2/products");
    expect(options.method).toBe("GET");
    expect((options.headers as Record<string, string>)["Authorization"]).toBe(
      "Bearer test-token",
    );
  });

  it("should make a POST request with JSON body", async () => {
    const mockResponse = { success: true, product: { id: "123" } };
    globalThis.fetch = mock(async () =>
      new Response(JSON.stringify(mockResponse), {
        status: 200,
        headers: { "Content-Type": "application/json" },
      }),
    ) as typeof fetch;

    const request = createRequestFn("https://api.gumroad.com/v2", "test-token");
    await request({
      method: "POST",
      path: "/products",
      body: { name: "Test Product", price: 100 },
    });

    const [, options] = (globalThis.fetch as ReturnType<typeof mock>).mock
      .calls[0] as [string, RequestInit];
    expect(options.method).toBe("POST");
    expect(JSON.parse(options.body as string)).toEqual({
      name: "Test Product",
      price: 100,
    });
  });

  it("should append query params for GET requests", async () => {
    const mockResponse = { success: true, sales: [] };
    globalThis.fetch = mock(async () =>
      new Response(JSON.stringify(mockResponse), { status: 200 }),
    ) as typeof fetch;

    const request = createRequestFn("https://api.gumroad.com/v2", "test-token");
    await request({
      method: "GET",
      path: "/sales",
      params: { after: "2024-01-01" },
    });

    const [url] = (globalThis.fetch as ReturnType<typeof mock>).mock
      .calls[0] as [string, RequestInit];
    expect(url).toContain("after=2024-01-01");
  });

  it("should throw GumroadApiError for non-ok responses", async () => {
    const errorResponse = { success: false, message: "Not found" };
    globalThis.fetch = mock(async () =>
      new Response(JSON.stringify(errorResponse), { status: 404 }),
    ) as typeof fetch;

    const request = createRequestFn("https://api.gumroad.com/v2", "test-token");

    try {
      await request({ method: "GET", path: "/products/invalid" });
      expect(true).toBe(false); // Should not reach here
    } catch (error) {
      expect(error).toBeInstanceOf(GumroadApiError);
      const apiError = error as GumroadApiError;
      expect(apiError.statusCode).toBe(404);
      expect(apiError.message).toBe("Not found");
    }
  });

  it("should throw GumroadNetworkError for network failures", async () => {
    globalThis.fetch = mock(async () => {
      throw new TypeError("Failed to fetch");
    }) as typeof fetch;

    const request = createRequestFn("https://api.gumroad.com/v2", "test-token");

    try {
      await request({ method: "GET", path: "/products" });
      expect(true).toBe(false);
    } catch (error) {
      expect(error).toBeInstanceOf(GumroadNetworkError);
    }
  });

  it("should throw GumroadApiError for invalid JSON responses", async () => {
    globalThis.fetch = mock(async () =>
      new Response("not json", { status: 200 }),
    ) as typeof fetch;

    const request = createRequestFn("https://api.gumroad.com/v2", "test-token");

    try {
      await request({ method: "GET", path: "/products" });
      expect(true).toBe(false);
    } catch (error) {
      expect(error).toBeInstanceOf(GumroadApiError);
    }
  });
});
