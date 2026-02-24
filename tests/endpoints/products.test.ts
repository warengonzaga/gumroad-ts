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

describe("ProductsEndpoint", () => {
  const originalFetch = globalThis.fetch;
  let client: GumroadClient;

  beforeEach(() => {
    client = new GumroadClient({ token: "test-token" });
  });

  afterEach(() => {
    globalThis.fetch = originalFetch;
  });

  it("should list all products", async () => {
    const mockData = {
      success: true,
      products: [
        { id: "prod_1", name: "Product 1" },
        { id: "prod_2", name: "Product 2" },
      ],
    };
    mockFetchResponse(mockData);

    const result = await client.products.list();
    expect(result.success).toBe(true);
    expect(result.products).toHaveLength(2);
    expect(result.products[0].id).toBe("prod_1");
  });

  it("should get a single product", async () => {
    const mockData = {
      success: true,
      product: { id: "prod_1", name: "Product 1" },
    };
    mockFetchResponse(mockData);

    const result = await client.products.get("prod_1");
    expect(result.success).toBe(true);
    expect(result.product.id).toBe("prod_1");

    const [url] = (globalThis.fetch as ReturnType<typeof mock>).mock
      .calls[0] as [string, RequestInit];
    expect(url).toContain("/products/prod_1");
  });

  it("should create a product", async () => {
    const mockData = {
      success: true,
      product: { id: "prod_new", name: "New Product", price: 1000 },
    };
    mockFetchResponse(mockData);

    const result = await client.products.create({
      name: "New Product",
      price: 1000,
    });
    expect(result.success).toBe(true);
    expect(result.product.name).toBe("New Product");

    const [, options] = (globalThis.fetch as ReturnType<typeof mock>).mock
      .calls[0] as [string, RequestInit];
    expect(options.method).toBe("POST");
    expect(JSON.parse(options.body as string)).toEqual({
      name: "New Product",
      price: 1000,
    });
  });

  it("should update a product", async () => {
    const mockData = {
      success: true,
      product: { id: "prod_1", name: "Updated Product" },
    };
    mockFetchResponse(mockData);

    const result = await client.products.update("prod_1", {
      name: "Updated Product",
    });
    expect(result.success).toBe(true);

    const [url, options] = (globalThis.fetch as ReturnType<typeof mock>).mock
      .calls[0] as [string, RequestInit];
    expect(url).toContain("/products/prod_1");
    expect(options.method).toBe("PUT");
  });

  it("should delete a product", async () => {
    const mockData = { success: true, message: "Product deleted" };
    mockFetchResponse(mockData);

    const result = await client.products.delete("prod_1");
    expect(result.success).toBe(true);

    const [url, options] = (globalThis.fetch as ReturnType<typeof mock>).mock
      .calls[0] as [string, RequestInit];
    expect(url).toContain("/products/prod_1");
    expect(options.method).toBe("DELETE");
  });

  it("should toggle a product", async () => {
    const mockData = {
      success: true,
      product: { id: "prod_1", published: false },
    };
    mockFetchResponse(mockData);

    const result = await client.products.toggle("prod_1");
    expect(result.success).toBe(true);

    const [url, options] = (globalThis.fetch as ReturnType<typeof mock>).mock
      .calls[0] as [string, RequestInit];
    expect(url).toContain("/products/prod_1/toggle");
    expect(options.method).toBe("PUT");
  });
});
