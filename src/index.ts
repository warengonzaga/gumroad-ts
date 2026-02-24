// Main client
export { GumroadClient } from "./client.js";

// Error classes
export {
  GumroadError,
  GumroadApiError,
  GumroadValidationError,
  GumroadNetworkError,
} from "./errors.js";

// Endpoint classes
export { ProductsEndpoint } from "./endpoints/products.js";
export { SalesEndpoint } from "./endpoints/sales.js";
export { SubscribersEndpoint } from "./endpoints/subscribers.js";
export { LicensesEndpoint } from "./endpoints/licenses.js";
export { UserEndpoint } from "./endpoints/user.js";
export { OfferCodesEndpoint } from "./endpoints/offer-codes.js";
export { VariantCategoriesEndpoint } from "./endpoints/variant-categories.js";
export { CustomFieldsEndpoint } from "./endpoints/custom-fields.js";
export { ResourceSubscriptionsEndpoint } from "./endpoints/resource-subscriptions.js";
export { PayoutsEndpoint } from "./endpoints/payouts.js";

// All types
export type {
  // Client
  GumroadClientOptions,
  GumroadApiResponse,
  HttpMethod,
  RequestOptions,

  // User
  User,
  GetUserResponse,

  // Products
  Product,
  ProductVariant,
  ProductVariantOption,
  RecurrencePrice,
  CreateProductParams,
  UpdateProductParams,
  ListProductsResponse,
  GetProductResponse,
  CreateProductResponse,
  UpdateProductResponse,
  DeleteProductResponse,
  ToggleProductResponse,
  EnableProductResponse,
  DisableProductResponse,

  // Variant Categories
  VariantCategory,
  Variant,
  CreateVariantCategoryParams,
  GetVariantCategoryResponse,
  ListVariantCategoriesResponse,
  CreateVariantCategoryResponse,
  UpdateVariantCategoryResponse,
  DeleteVariantCategoryResponse,
  CreateVariantParams,
  UpdateVariantParams,
  GetVariantResponse,
  ListVariantsResponse,
  CreateVariantResponse,
  UpdateVariantResponse,
  DeleteVariantResponse,

  // Offer Codes
  OfferCode,
  CreateOfferCodeParams,
  UpdateOfferCodeParams,
  ListOfferCodesResponse,
  GetOfferCodeResponse,
  CreateOfferCodeResponse,
  UpdateOfferCodeResponse,
  DeleteOfferCodeResponse,

  // Custom Fields
  CustomField,
  CreateCustomFieldParams,
  UpdateCustomFieldParams,
  ListCustomFieldsResponse,
  CreateCustomFieldResponse,
  UpdateCustomFieldResponse,
  DeleteCustomFieldResponse,

  // Sales
  Sale,
  CardInfo,
  ShippingInfo,
  ListSalesParams,
  ListSalesResponse,
  GetSaleResponse,
  MarkAsShippedParams,
  MarkAsShippedResponse,
  RefundSaleResponse,
  ResendReceiptResponse,

  // Subscribers
  Subscriber,
  ListSubscribersParams,
  ListSubscribersResponse,
  GetSubscriberResponse,

  // Licenses
  License,
  LicensePurchase,
  VerifyLicenseParams,
  VerifyLicenseResponse,
  EnableLicenseParams,
  EnableLicenseResponse,
  DisableLicenseParams,
  DisableLicenseResponse,
  DecrementLicenseParams,
  DecrementLicenseResponse,
  RotateLicenseParams,
  RotateLicenseResponse,

  // Payouts
  Payout,
  ListPayoutsResponse,
  GetPayoutResponse,

  // Resource Subscriptions
  ResourceSubscriptionType,
  ResourceSubscription,
  CreateResourceSubscriptionParams,
  ListResourceSubscriptionsResponse,
  CreateResourceSubscriptionResponse,
  DeleteResourceSubscriptionResponse,

  // Webhooks
  WebhookSalePayload,
} from "./types.js";
