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

describe("OfferCodesEndpoint", () => {
  const originalFetch = globalThis.fetch;
  let client: GumroadClient;

  beforeEach(() => {
    client = new GumroadClient({ token: "test-token" });
  });

  afterEach(() => {
    globalThis.fetch = originalFetch;
  });

  it("should list offer codes", async () => {
    const mockData = {
      success: true,
      offer_codes: [{ id: "offer_1", name: "DISCOUNT10" }],
    };
    mockFetchResponse(mockData);

    const result = await client.offerCodes.list("prod_1");
    expect(result.success).toBe(true);

    const [url] = (globalThis.fetch as ReturnType<typeof mock>).mock
      .calls[0] as [string, RequestInit];
    expect(url).toContain("/products/prod_1/offer_codes");
  });

  it("should get a single offer code", async () => {
    const mockData = {
      success: true,
      offer_code: { id: "offer_1", name: "DISCOUNT10" },
    };
    mockFetchResponse(mockData);

    const result = await client.offerCodes.get("prod_1", "offer_1");
    expect(result.success).toBe(true);

    const [url] = (globalThis.fetch as ReturnType<typeof mock>).mock
      .calls[0] as [string, RequestInit];
    expect(url).toContain("/products/prod_1/offer_codes/offer_1");
  });

  it("should create an offer code", async () => {
    const mockData = {
      success: true,
      offer_code: { id: "offer_new", name: "SAVE20", amount_off: 20 },
    };
    mockFetchResponse(mockData);

    const result = await client.offerCodes.create("prod_1", {
      name: "SAVE20",
      amount_off: 20,
      offer_type: "percent",
    });
    expect(result.success).toBe(true);

    const [, options] = (globalThis.fetch as ReturnType<typeof mock>).mock
      .calls[0] as [string, RequestInit];
    expect(options.method).toBe("POST");
  });

  it("should update an offer code", async () => {
    const mockData = {
      success: true,
      offer_code: { id: "offer_1", max_purchase_count: 100 },
    };
    mockFetchResponse(mockData);

    await client.offerCodes.update("prod_1", "offer_1", {
      max_purchase_count: 100,
    });

    const [url, options] = (globalThis.fetch as ReturnType<typeof mock>).mock
      .calls[0] as [string, RequestInit];
    expect(url).toContain("/products/prod_1/offer_codes/offer_1");
    expect(options.method).toBe("PUT");
  });

  it("should delete an offer code", async () => {
    const mockData = { success: true, message: "Offer code deleted" };
    mockFetchResponse(mockData);

    await client.offerCodes.delete("prod_1", "offer_1");

    const [url, options] = (globalThis.fetch as ReturnType<typeof mock>).mock
      .calls[0] as [string, RequestInit];
    expect(url).toContain("/products/prod_1/offer_codes/offer_1");
    expect(options.method).toBe("DELETE");
  });
});
