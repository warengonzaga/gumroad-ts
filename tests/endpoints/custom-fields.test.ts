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

describe("CustomFieldsEndpoint", () => {
  const originalFetch = globalThis.fetch;
  let client: GumroadClient;

  beforeEach(() => {
    client = new GumroadClient({ token: "test-token" });
  });

  afterEach(() => {
    globalThis.fetch = originalFetch;
  });

  it("should list custom fields", async () => {
    const mockData = {
      success: true,
      custom_fields: [{ name: "Company", required: true }],
    };
    mockFetchResponse(mockData);

    const result = await client.customFields.list("prod_1");
    expect(result.success).toBe(true);

    const [url] = (globalThis.fetch as ReturnType<typeof mock>).mock
      .calls[0] as [string, RequestInit];
    expect(url).toContain("/products/prod_1/custom_fields");
  });

  it("should create a custom field", async () => {
    const mockData = {
      success: true,
      custom_field: { name: "Phone", required: false },
    };
    mockFetchResponse(mockData);

    const result = await client.customFields.create("prod_1", {
      name: "Phone",
      required: false,
    });
    expect(result.success).toBe(true);

    const [, options] = (globalThis.fetch as ReturnType<typeof mock>).mock
      .calls[0] as [string, RequestInit];
    expect(options.method).toBe("POST");
  });

  it("should update a custom field", async () => {
    const mockData = {
      success: true,
      custom_field: { name: "Phone", required: true },
    };
    mockFetchResponse(mockData);

    await client.customFields.update("prod_1", "Phone", { required: true });

    const [url, options] = (globalThis.fetch as ReturnType<typeof mock>).mock
      .calls[0] as [string, RequestInit];
    expect(url).toContain("/products/prod_1/custom_fields/Phone");
    expect(options.method).toBe("PUT");
  });

  it("should delete a custom field", async () => {
    const mockData = { success: true, message: "Deleted" };
    mockFetchResponse(mockData);

    await client.customFields.delete("prod_1", "Phone");

    const [url, options] = (globalThis.fetch as ReturnType<typeof mock>).mock
      .calls[0] as [string, RequestInit];
    expect(url).toContain("/products/prod_1/custom_fields/Phone");
    expect(options.method).toBe("DELETE");
  });

  it("should encode custom field names in URLs", async () => {
    const mockData = { success: true, message: "Deleted" };
    mockFetchResponse(mockData);

    await client.customFields.delete("prod_1", "Full Name");

    const [url] = (globalThis.fetch as ReturnType<typeof mock>).mock
      .calls[0] as [string, RequestInit];
    expect(url).toContain("/custom_fields/Full%20Name");
  });
});
