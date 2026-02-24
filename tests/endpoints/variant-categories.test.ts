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

describe("VariantCategoriesEndpoint", () => {
  const originalFetch = globalThis.fetch;
  let client: GumroadClient;

  beforeEach(() => {
    client = new GumroadClient({ token: "test-token" });
  });

  afterEach(() => {
    globalThis.fetch = originalFetch;
  });

  it("should list variant categories", async () => {
    const mockData = {
      success: true,
      variant_categories: [{ id: "vc_1", title: "Size" }],
    };
    mockFetchResponse(mockData);

    const result = await client.variantCategories.list("prod_1");
    expect(result.success).toBe(true);

    const [url] = (globalThis.fetch as ReturnType<typeof mock>).mock
      .calls[0] as [string, RequestInit];
    expect(url).toContain("/products/prod_1/variant_categories");
  });

  it("should get a variant category", async () => {
    const mockData = {
      success: true,
      variant_category: { id: "vc_1", title: "Size" },
    };
    mockFetchResponse(mockData);

    const result = await client.variantCategories.get("prod_1", "vc_1");
    expect(result.success).toBe(true);

    const [url] = (globalThis.fetch as ReturnType<typeof mock>).mock
      .calls[0] as [string, RequestInit];
    expect(url).toContain("/products/prod_1/variant_categories/vc_1");
  });

  it("should create a variant category", async () => {
    const mockData = {
      success: true,
      variant_category: { id: "vc_new", title: "Color" },
    };
    mockFetchResponse(mockData);

    const result = await client.variantCategories.create("prod_1", {
      title: "Color",
    });
    expect(result.success).toBe(true);

    const [, options] = (globalThis.fetch as ReturnType<typeof mock>).mock
      .calls[0] as [string, RequestInit];
    expect(options.method).toBe("POST");
  });

  it("should update a variant category", async () => {
    const mockData = {
      success: true,
      variant_category: { id: "vc_1", title: "Updated Size" },
    };
    mockFetchResponse(mockData);

    await client.variantCategories.update("prod_1", "vc_1", {
      title: "Updated Size",
    });

    const [url, options] = (globalThis.fetch as ReturnType<typeof mock>).mock
      .calls[0] as [string, RequestInit];
    expect(url).toContain("/products/prod_1/variant_categories/vc_1");
    expect(options.method).toBe("PUT");
  });

  it("should delete a variant category", async () => {
    const mockData = { success: true, message: "Deleted" };
    mockFetchResponse(mockData);

    await client.variantCategories.delete("prod_1", "vc_1");

    const [url, options] = (globalThis.fetch as ReturnType<typeof mock>).mock
      .calls[0] as [string, RequestInit];
    expect(url).toContain("/products/prod_1/variant_categories/vc_1");
    expect(options.method).toBe("DELETE");
  });

  it("should list variants", async () => {
    const mockData = {
      success: true,
      variants: [{ id: "v_1", name: "Small" }],
    };
    mockFetchResponse(mockData);

    const result = await client.variantCategories.listVariants("prod_1", "vc_1");
    expect(result.success).toBe(true);

    const [url] = (globalThis.fetch as ReturnType<typeof mock>).mock
      .calls[0] as [string, RequestInit];
    expect(url).toContain(
      "/products/prod_1/variant_categories/vc_1/variants",
    );
  });

  it("should create a variant", async () => {
    const mockData = {
      success: true,
      variant: { id: "v_new", name: "Large" },
    };
    mockFetchResponse(mockData);

    await client.variantCategories.createVariant("prod_1", "vc_1", {
      name: "Large",
      price_difference_cents: 500,
    });

    const [url, options] = (globalThis.fetch as ReturnType<typeof mock>).mock
      .calls[0] as [string, RequestInit];
    expect(url).toContain(
      "/products/prod_1/variant_categories/vc_1/variants",
    );
    expect(options.method).toBe("POST");
  });

  it("should delete a variant", async () => {
    const mockData = { success: true, message: "Deleted" };
    mockFetchResponse(mockData);

    await client.variantCategories.deleteVariant("prod_1", "vc_1", "v_1");

    const [url, options] = (globalThis.fetch as ReturnType<typeof mock>).mock
      .calls[0] as [string, RequestInit];
    expect(url).toContain(
      "/products/prod_1/variant_categories/vc_1/variants/v_1",
    );
    expect(options.method).toBe("DELETE");
  });
});
