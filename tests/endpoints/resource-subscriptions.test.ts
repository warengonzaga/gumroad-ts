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

describe("ResourceSubscriptionsEndpoint", () => {
  const originalFetch = globalThis.fetch;
  let client: GumroadClient;

  beforeEach(() => {
    client = new GumroadClient({ token: "test-token" });
  });

  afterEach(() => {
    globalThis.fetch = originalFetch;
  });

  it("should list resource subscriptions", async () => {
    const mockData = {
      success: true,
      resource_subscriptions: [
        {
          id: "rs_1",
          resource_name: "sale",
          post_url: "https://example.com/webhook",
        },
      ],
    };
    mockFetchResponse(mockData);

    const result = await client.resourceSubscriptions.list("sale");
    expect(result.success).toBe(true);

    const [url] = (globalThis.fetch as ReturnType<typeof mock>).mock
      .calls[0] as [string, RequestInit];
    expect(url).toContain("resource_name=sale");
  });

  it("should create a resource subscription", async () => {
    const mockData = {
      success: true,
      resource_subscription: {
        id: "rs_new",
        resource_name: "sale",
        post_url: "https://example.com/webhook",
      },
    };
    mockFetchResponse(mockData);

    const result = await client.resourceSubscriptions.create({
      resource_name: "sale",
      post_url: "https://example.com/webhook",
    });
    expect(result.success).toBe(true);

    const [, options] = (globalThis.fetch as ReturnType<typeof mock>).mock
      .calls[0] as [string, RequestInit];
    expect(options.method).toBe("PUT");
  });

  it("should delete a resource subscription", async () => {
    const mockData = { success: true, message: "Deleted" };
    mockFetchResponse(mockData);

    await client.resourceSubscriptions.delete("rs_1");

    const [url, options] = (globalThis.fetch as ReturnType<typeof mock>).mock
      .calls[0] as [string, RequestInit];
    expect(url).toContain("/resource_subscriptions/rs_1");
    expect(options.method).toBe("DELETE");
  });
});
