import { describe, it, expect, beforeEach, afterEach, mock } from "bun:test";
import { GumroadClient } from "../../src/client";

function mockFetchResponse(data: unknown, status = 200) {
  globalThis.fetch = mock(async () =>
    new Response(JSON.stringify(data), {
      status,
      headers: { "Content-Type": "application/json" },
    }),
  ) as typeof fetch;
}

describe("LicensesEndpoint", () => {
  const originalFetch = globalThis.fetch;
  let client: GumroadClient;

  beforeEach(() => {
    client = new GumroadClient({ token: "test-token" });
  });

  afterEach(() => {
    globalThis.fetch = originalFetch;
  });

  it("should verify a license", async () => {
    const mockData = {
      success: true,
      uses: 1,
      purchase: { id: "purchase_1" },
    };
    mockFetchResponse(mockData);

    const result = await client.licenses.verify({
      product_id: "prod_1",
      license_key: "LICENSE-KEY-123",
    });
    expect(result.success).toBe(true);
    expect(result.uses).toBe(1);

    const [, options] = (globalThis.fetch as ReturnType<typeof mock>).mock
      .calls[0] as [string, RequestInit];
    expect(options.method).toBe("POST");
    expect(JSON.parse(options.body as string)).toEqual({
      product_id: "prod_1",
      license_key: "LICENSE-KEY-123",
    });
  });

  it("should verify a license without incrementing uses count", async () => {
    const mockData = { success: true, uses: 0, purchase: {} };
    mockFetchResponse(mockData);

    await client.licenses.verify({
      product_id: "prod_1",
      license_key: "LICENSE-KEY-123",
      increment_uses_count: false,
    });

    const [, options] = (globalThis.fetch as ReturnType<typeof mock>).mock
      .calls[0] as [string, RequestInit];
    expect(JSON.parse(options.body as string)).toMatchObject({
      increment_uses_count: false,
    });
  });

  it("should enable a license", async () => {
    const mockData = { success: true, uses: 1, purchase: {} };
    mockFetchResponse(mockData);

    await client.licenses.enable({
      product_id: "prod_1",
      license_key: "LICENSE-KEY-123",
    });

    const [url, options] = (globalThis.fetch as ReturnType<typeof mock>).mock
      .calls[0] as [string, RequestInit];
    expect(url).toContain("/licenses/enable");
    expect(options.method).toBe("PUT");
  });

  it("should disable a license", async () => {
    const mockData = { success: true, uses: 1, purchase: {} };
    mockFetchResponse(mockData);

    await client.licenses.disable({
      product_id: "prod_1",
      license_key: "LICENSE-KEY-123",
    });

    const [url, options] = (globalThis.fetch as ReturnType<typeof mock>).mock
      .calls[0] as [string, RequestInit];
    expect(url).toContain("/licenses/disable");
    expect(options.method).toBe("PUT");
  });

  it("should decrement uses count", async () => {
    const mockData = { success: true, uses: 0, purchase: {} };
    mockFetchResponse(mockData);

    await client.licenses.decrementUsesCount({
      product_id: "prod_1",
      license_key: "LICENSE-KEY-123",
    });

    const [url, options] = (globalThis.fetch as ReturnType<typeof mock>).mock
      .calls[0] as [string, RequestInit];
    expect(url).toContain("/licenses/decrement_uses_count");
    expect(options.method).toBe("PUT");
  });

  it("should rotate a license key", async () => {
    const mockData = { success: true, uses: 0, purchase: {} };
    mockFetchResponse(mockData);

    await client.licenses.rotate({
      product_id: "prod_1",
      license_key: "LICENSE-KEY-123",
    });

    const [url, options] = (globalThis.fetch as ReturnType<typeof mock>).mock
      .calls[0] as [string, RequestInit];
    expect(url).toContain("/licenses/rotate");
    expect(options.method).toBe("PUT");
  });
});
