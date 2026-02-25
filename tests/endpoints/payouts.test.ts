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

describe("PayoutsEndpoint", () => {
  const originalFetch = globalThis.fetch;
  let client: GumroadClient;

  beforeEach(() => {
    client = new GumroadClient({ token: "test-token" });
  });

  afterEach(() => {
    globalThis.fetch = originalFetch;
  });

  it("should list all payouts", async () => {
    const mockData = {
      success: true,
      payouts: [
        { id: "payout_1", amount_cents: 10000, is_paid: true },
        { id: "payout_2", amount_cents: 5000, is_paid: false },
      ],
    };
    mockFetchResponse(mockData);

    const result = await client.payouts.list();
    expect(result.success).toBe(true);
    expect(result.payouts).toHaveLength(2);

    const [url, options] = (globalThis.fetch as ReturnType<typeof mock>).mock
      .calls[0] as [string, RequestInit];
    expect(url).toContain("/payouts");
    expect(options.method).toBe("GET");
  });

  it("should get a single payout", async () => {
    const mockData = {
      success: true,
      payout: { id: "payout_1", amount_cents: 10000, is_paid: true },
    };
    mockFetchResponse(mockData);

    const result = await client.payouts.get("payout_1");
    expect(result.success).toBe(true);

    const [url] = (globalThis.fetch as ReturnType<typeof mock>).mock
      .calls[0] as [string, RequestInit];
    expect(url).toContain("/payouts/payout_1");
  });
});
