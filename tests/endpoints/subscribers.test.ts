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

describe("SubscribersEndpoint", () => {
  const originalFetch = globalThis.fetch;
  let client: GumroadClient;

  beforeEach(() => {
    client = new GumroadClient({ token: "test-token" });
  });

  afterEach(() => {
    globalThis.fetch = originalFetch;
  });

  it("should list subscribers for a product", async () => {
    const mockData = {
      success: true,
      subscribers: [{ id: "sub_1", user_email: "test@example.com" }],
    };
    mockFetchResponse(mockData);

    const result = await client.subscribers.list("prod_1");
    expect(result.success).toBe(true);
    expect(result.subscribers).toHaveLength(1);

    const [url] = (globalThis.fetch as ReturnType<typeof mock>).mock
      .calls[0] as [string, RequestInit];
    expect(url).toContain("/products/prod_1/subscribers");
  });

  it("should list subscribers with email filter", async () => {
    const mockData = { success: true, subscribers: [] };
    mockFetchResponse(mockData);

    await client.subscribers.list("prod_1", {
      email: "test@example.com",
    });

    const [url] = (globalThis.fetch as ReturnType<typeof mock>).mock
      .calls[0] as [string, RequestInit];
    expect(url).toContain("email=test%40example.com");
  });

  it("should get a single subscriber", async () => {
    const mockData = {
      success: true,
      subscriber: { id: "sub_1", status: "alive" },
    };
    mockFetchResponse(mockData);

    const result = await client.subscribers.get("sub_1");
    expect(result.success).toBe(true);

    const [url] = (globalThis.fetch as ReturnType<typeof mock>).mock
      .calls[0] as [string, RequestInit];
    expect(url).toContain("/subscribers/sub_1");
  });
});
