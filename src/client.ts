import { GumroadValidationError } from "./errors.js";
import { ProductsEndpoint } from "./endpoints/products.js";
import { SalesEndpoint } from "./endpoints/sales.js";
import { SubscribersEndpoint } from "./endpoints/subscribers.js";
import { LicensesEndpoint } from "./endpoints/licenses.js";
import { UserEndpoint } from "./endpoints/user.js";
import { OfferCodesEndpoint } from "./endpoints/offer-codes.js";
import { VariantCategoriesEndpoint } from "./endpoints/variant-categories.js";
import { CustomFieldsEndpoint } from "./endpoints/custom-fields.js";
import { ResourceSubscriptionsEndpoint } from "./endpoints/resource-subscriptions.js";
import { createRequestFn } from "./utils/fetch.js";
import { verifyWebhookSignature } from "./utils/crypto.js";
import { DEFAULT_BASE_URL } from "./utils/url.js";
import type { GumroadClientOptions } from "./types.js";

export class GumroadClient {
  /** Products API */
  readonly products: ProductsEndpoint;
  /** Sales API */
  readonly sales: SalesEndpoint;
  /** Subscribers API */
  readonly subscribers: SubscribersEndpoint;
  /** Licenses API */
  readonly licenses: LicensesEndpoint;
  /** User API */
  readonly user: UserEndpoint;
  /** Offer Codes API */
  readonly offerCodes: OfferCodesEndpoint;
  /** Variant Categories API */
  readonly variantCategories: VariantCategoriesEndpoint;
  /** Custom Fields API */
  readonly customFields: CustomFieldsEndpoint;
  /** Resource Subscriptions (webhooks) API */
  readonly resourceSubscriptions: ResourceSubscriptionsEndpoint;

  constructor(options: GumroadClientOptions) {
    const token = options.token || this.getTokenFromEnv();

    if (!token) {
      throw new GumroadValidationError(
        "Access token is required. Provide it via the 'token' option or set the GUMROAD_ACCESS_TOKEN environment variable.",
      );
    }

    const baseUrl = (options.baseUrl || DEFAULT_BASE_URL).replace(/\/+$/, "");
    const request = createRequestFn(baseUrl, token);

    this.products = new ProductsEndpoint(request);
    this.sales = new SalesEndpoint(request);
    this.subscribers = new SubscribersEndpoint(request);
    this.licenses = new LicensesEndpoint(request);
    this.user = new UserEndpoint(request);
    this.offerCodes = new OfferCodesEndpoint(request);
    this.variantCategories = new VariantCategoriesEndpoint(request);
    this.customFields = new CustomFieldsEndpoint(request);
    this.resourceSubscriptions = new ResourceSubscriptionsEndpoint(request);
  }

  /** Verify a webhook signature using HMAC-SHA256 */
  async verifyWebhookSignature(
    payload: string,
    signature: string,
    secret: string,
  ): Promise<boolean> {
    return verifyWebhookSignature(payload, signature, secret);
  }

  private getTokenFromEnv(): string | undefined {
    try {
      // eslint-disable-next-line @typescript-eslint/no-unnecessary-condition
      if (typeof globalThis !== "undefined") {
        const g = globalThis as Record<string, unknown>;
        const proc = g["process"] as
          | { env?: Record<string, string | undefined> }
          | undefined;
        return proc?.env?.GUMROAD_ACCESS_TOKEN;
      }
    } catch {
      // Not available in this runtime
    }
    return undefined;
  }
}
