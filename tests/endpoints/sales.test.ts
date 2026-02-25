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

describe("SalesEndpoint", () => {
  const originalFetch = globalThis.fetch;
  let client: GumroadClient;

  beforeEach(() => {
    client = new GumroadClient({ token: "test-token" });
  });

  afterEach(() => {
    globalThis.fetch = originalFetch;
  });

  it("should list sales without params", async () => {
    const mockData = {
      success: true,
      sales: [{ id: "sale_1" }],
      next_page_url: null,
      next_page_key: null,
    };
    mockFetchResponse(mockData);

    const result = await client.sales.list();
    expect(result.success).toBe(true);
    expect(result.sales).toHaveLength(1);
  });

  it("should list sales with date filters", async () => {
    const mockData = {
      success: true,
      sales: [],
      next_page_url: null,
      next_page_key: null,
    };
    mockFetchResponse(mockData);

    await client.sales.list({
      after: "2024-01-01",
      before: "2024-12-31",
    });

    const [url] = (globalThis.fetch as ReturnType<typeof mock>).mock
      .calls[0] as [string, RequestInit];
    expect(url).toContain("after=2024-01-01");
    expect(url).toContain("before=2024-12-31");
  });

  it("should get a single sale", async () => {
    const mockData = { success: true, sale: { id: "sale_1" } };
    mockFetchResponse(mockData);

    const result = await client.sales.get("sale_1");
    expect(result.success).toBe(true);

    const [url] = (globalThis.fetch as ReturnType<typeof mock>).mock
      .calls[0] as [string, RequestInit];
    expect(url).toContain("/sales/sale_1");
  });

  it("should mark a sale as shipped", async () => {
    const mockData = { success: true, sale: { id: "sale_1" } };
    mockFetchResponse(mockData);

    const result = await client.sales.markAsShipped("sale_1", {
      tracking_url: "https://track.example.com/123",
    });
    expect(result.success).toBe(true);

    const [url, options] = (globalThis.fetch as ReturnType<typeof mock>).mock
      .calls[0] as [string, RequestInit];
    expect(url).toContain("/sales/sale_1/mark_as_shipped");
    expect(options.method).toBe("PUT");
  });

  it("should refund a sale", async () => {
    const mockData = {
      success: true,
      sale: { id: "sale_1", refunded: true },
    };
    mockFetchResponse(mockData);

    const result = await client.sales.refund("sale_1");
    expect(result.success).toBe(true);

    const [url, options] = (globalThis.fetch as ReturnType<typeof mock>).mock
      .calls[0] as [string, RequestInit];
    expect(url).toContain("/sales/sale_1/refund");
    expect(options.method).toBe("PUT");
  });

  it("should resend a receipt", async () => {
    const mockData = { success: true, message: "Receipt sent" };
    mockFetchResponse(mockData);

    const result = await client.sales.resendReceipt("sale_1");
    expect(result.success).toBe(true);

    const [url, options] = (globalThis.fetch as ReturnType<typeof mock>).mock
      .calls[0] as [string, RequestInit];
    expect(url).toContain("/sales/sale_1/resend_receipt");
    expect(options.method).toBe("POST");
  });
});
