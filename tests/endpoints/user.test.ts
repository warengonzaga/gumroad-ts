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

describe("UserEndpoint", () => {
  const originalFetch = globalThis.fetch;
  let client: GumroadClient;

  beforeEach(() => {
    client = new GumroadClient({ token: "test-token" });
  });

  afterEach(() => {
    globalThis.fetch = originalFetch;
  });

  it("should get the authenticated user", async () => {
    const mockData = {
      success: true,
      user: {
        bio: "A creator",
        twitter_handle: "@creator",
        name: "Creator Name",
        user_id: "user_1",
        url: "https://gumroad.com/creator",
        email: "creator@example.com",
        profile_url: "https://creator.gumroad.com",
      },
    };
    mockFetchResponse(mockData);

    const result = await client.user.get();
    expect(result.success).toBe(true);
    expect(result.user.name).toBe("Creator Name");
    expect(result.user.email).toBe("creator@example.com");

    const [url, options] = (globalThis.fetch as ReturnType<typeof mock>).mock
      .calls[0] as [string, RequestInit];
    expect(url).toContain("/user");
    expect(options.method).toBe("GET");
  });
});
