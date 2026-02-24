import { describe, it, expect } from "bun:test";
import { buildUrl, DEFAULT_BASE_URL } from "../../src/utils/url";

describe("buildUrl", () => {
  it("should build a simple URL", () => {
    const url = buildUrl("https://api.gumroad.com/v2", "/products");
    expect(url).toBe("https://api.gumroad.com/v2/products");
  });

  it("should handle trailing slashes on base URL", () => {
    const url = buildUrl("https://api.gumroad.com/v2/", "/products");
    expect(url).toBe("https://api.gumroad.com/v2/products");
  });

  it("should handle leading slashes on path", () => {
    const url = buildUrl("https://api.gumroad.com/v2", "products");
    expect(url).toBe("https://api.gumroad.com/v2/products");
  });

  it("should append query parameters", () => {
    const url = buildUrl("https://api.gumroad.com/v2", "/sales", {
      after: "2024-01-01",
      before: "2024-12-31",
    });
    expect(url).toContain("after=2024-01-01");
    expect(url).toContain("before=2024-12-31");
  });

  it("should skip undefined and null parameters", () => {
    const url = buildUrl("https://api.gumroad.com/v2", "/sales", {
      after: "2024-01-01",
      before: undefined,
      page: null,
    });
    expect(url).toContain("after=2024-01-01");
    expect(url).not.toContain("before");
    expect(url).not.toContain("page");
  });

  it("should convert numeric parameters to strings", () => {
    const url = buildUrl("https://api.gumroad.com/v2", "/sales", {
      page: 2,
    });
    expect(url).toContain("page=2");
  });

  it("should export the default base URL", () => {
    expect(DEFAULT_BASE_URL).toBe("https://api.gumroad.com/v2");
  });
});
