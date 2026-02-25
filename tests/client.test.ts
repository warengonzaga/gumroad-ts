import { describe, it, expect } from "bun:test";
import { GumroadClient } from "../src/client";
import { GumroadValidationError } from "../src/errors";
import { ProductsEndpoint } from "../src/endpoints/products";
import { SalesEndpoint } from "../src/endpoints/sales";
import { SubscribersEndpoint } from "../src/endpoints/subscribers";
import { LicensesEndpoint } from "../src/endpoints/licenses";
import { UserEndpoint } from "../src/endpoints/user";
import { OfferCodesEndpoint } from "../src/endpoints/offer-codes";
import { VariantCategoriesEndpoint } from "../src/endpoints/variant-categories";
import { CustomFieldsEndpoint } from "../src/endpoints/custom-fields";
import { ResourceSubscriptionsEndpoint } from "../src/endpoints/resource-subscriptions";
import { PayoutsEndpoint } from "../src/endpoints/payouts";

describe("GumroadClient", () => {
  it("should create a client with a valid token", () => {
    const client = new GumroadClient({ token: "test-token" });
    expect(client).toBeDefined();
  });

  it("should throw GumroadValidationError when no token is provided", () => {
    expect(() => new GumroadClient({ token: "" })).toThrow(
      GumroadValidationError,
    );
  });

  it("should expose all endpoint instances", () => {
    const client = new GumroadClient({ token: "test-token" });
    expect(client.products).toBeInstanceOf(ProductsEndpoint);
    expect(client.sales).toBeInstanceOf(SalesEndpoint);
    expect(client.subscribers).toBeInstanceOf(SubscribersEndpoint);
    expect(client.licenses).toBeInstanceOf(LicensesEndpoint);
    expect(client.user).toBeInstanceOf(UserEndpoint);
    expect(client.offerCodes).toBeInstanceOf(OfferCodesEndpoint);
    expect(client.variantCategories).toBeInstanceOf(
      VariantCategoriesEndpoint,
    );
    expect(client.customFields).toBeInstanceOf(CustomFieldsEndpoint);
    expect(client.resourceSubscriptions).toBeInstanceOf(
      ResourceSubscriptionsEndpoint,
    );
    expect(client.payouts).toBeInstanceOf(PayoutsEndpoint);
  });

  it("should accept a custom base URL", () => {
    const client = new GumroadClient({
      token: "test-token",
      baseUrl: "https://custom-api.example.com/v2",
    });
    expect(client).toBeDefined();
  });

  it("should have a verifyWebhookSignature method", () => {
    const client = new GumroadClient({ token: "test-token" });
    expect(typeof client.verifyWebhookSignature).toBe("function");
  });

  it("should read token from GUMROAD_ACCESS_TOKEN env variable", () => {
    const original = process.env.GUMROAD_ACCESS_TOKEN;
    process.env.GUMROAD_ACCESS_TOKEN = "env-token";

    try {
      // Omit token to trigger env variable fallback
      const client = new GumroadClient({});
      expect(client).toBeDefined();
    } finally {
      if (original !== undefined) {
        process.env.GUMROAD_ACCESS_TOKEN = original;
      } else {
        delete process.env.GUMROAD_ACCESS_TOKEN;
      }
    }
  });
});
