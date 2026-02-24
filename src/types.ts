// ============================================================
// Client Configuration
// ============================================================

export interface GumroadClientOptions {
  /** Gumroad API access token */
  token: string;
  /** Base URL for the Gumroad API (defaults to https://api.gumroad.com/v2) */
  baseUrl?: string;
}

// ============================================================
// Common API Response
// ============================================================

export interface GumroadApiResponse {
  success: boolean;
  message?: string;
}

// ============================================================
// User
// ============================================================

export interface User {
  bio: string | null;
  twitter_handle: string | null;
  name: string;
  user_id: string;
  url: string;
  email: string;
  profile_url: string;
}

export interface GetUserResponse extends GumroadApiResponse {
  user: User;
}

// ============================================================
// Products
// ============================================================

export interface ProductVariant {
  title: string;
  options: ProductVariantOption[];
}

export interface ProductVariantOption {
  name: string;
  price_difference_cents: number;
  purchasing_power_parity_prices?: Record<string, number>;
  is_pay_what_you_want: boolean;
  recurrence_prices?: Record<string, RecurrencePrice> | null;
  url?: string;
}

export interface RecurrencePrice {
  price_cents: number;
  suggested_price_cents?: number | null;
  purchasing_power_parity_prices?: Record<string, number>;
}

export interface Product {
  id: string;
  name: string;
  preview_url: string | null;
  description: string;
  customizable_price: boolean | null;
  require_shipping: boolean;
  custom_receipt: string | null;
  custom_permalink: string | null;
  subscription_duration: string | null;
  url_redirect_button_text: string;
  url_redirect_external_link: string | null;
  price: number;
  currency: string;
  short_url: string;
  thumbnail_url: string | null;
  tags: string[];
  formatted_price: string;
  published: boolean;
  file_info: Record<string, unknown>;
  max_purchase_count: number | null;
  deleted: boolean;
  custom_fields: CustomField[];
  custom_summary: string;
  is_tiered_membership: boolean;
  variants: ProductVariant[];
  sales_count: string;
  sales_usd_cents: string;
}

export interface CreateProductParams {
  name: string;
  price: number;
  description?: string;
  url?: string;
  preview_url?: string;
  customizable_price?: boolean;
  require_shipping?: boolean;
  custom_receipt?: string;
  custom_permalink?: string;
  subscription_duration?: "monthly" | "quarterly" | "biannually" | "yearly";
  custom_fields?: string[];
  custom_summary?: string;
  published?: boolean;
}

export interface UpdateProductParams {
  name?: string;
  price?: number;
  description?: string;
  url?: string;
  preview_url?: string;
  customizable_price?: boolean;
  require_shipping?: boolean;
  custom_receipt?: string;
  custom_permalink?: string;
  subscription_duration?: "monthly" | "quarterly" | "biannually" | "yearly";
  custom_fields?: string[];
  custom_summary?: string;
  published?: boolean;
}

export interface ListProductsResponse extends GumroadApiResponse {
  products: Product[];
}

export interface GetProductResponse extends GumroadApiResponse {
  product: Product;
}

export interface CreateProductResponse extends GumroadApiResponse {
  product: Product;
}

export interface UpdateProductResponse extends GumroadApiResponse {
  product: Product;
}

export interface DeleteProductResponse extends GumroadApiResponse {
  message: string;
}

export interface ToggleProductResponse extends GumroadApiResponse {
  product: Product;
}

export interface EnableProductResponse extends GumroadApiResponse {
  product: Product;
}

export interface DisableProductResponse extends GumroadApiResponse {
  product: Product;
}

// ============================================================
// Variant Categories
// ============================================================

export interface VariantCategory {
  id: string;
  title: string;
  variants: Variant[];
}

export interface Variant {
  id: string;
  name: string;
  price_difference_cents: number;
  max_purchase_count: number | null;
}

export interface CreateVariantCategoryParams {
  title: string;
}

export interface GetVariantCategoryResponse extends GumroadApiResponse {
  variant_category: VariantCategory;
}

export interface ListVariantCategoriesResponse extends GumroadApiResponse {
  variant_categories: VariantCategory[];
}

export interface CreateVariantCategoryResponse extends GumroadApiResponse {
  variant_category: VariantCategory;
}

export interface UpdateVariantCategoryResponse extends GumroadApiResponse {
  variant_category: VariantCategory;
}

export interface DeleteVariantCategoryResponse extends GumroadApiResponse {
  message: string;
}

// ============================================================
// Variants
// ============================================================

export interface CreateVariantParams {
  name: string;
  price_difference_cents?: number;
  max_purchase_count?: number;
}

export interface UpdateVariantParams {
  name?: string;
  price_difference_cents?: number;
  max_purchase_count?: number;
}

export interface GetVariantResponse extends GumroadApiResponse {
  variant: Variant;
}

export interface ListVariantsResponse extends GumroadApiResponse {
  variants: Variant[];
}

export interface CreateVariantResponse extends GumroadApiResponse {
  variant: Variant;
}

export interface UpdateVariantResponse extends GumroadApiResponse {
  variant: Variant;
}

export interface DeleteVariantResponse extends GumroadApiResponse {
  message: string;
}

// ============================================================
// Offer Codes
// ============================================================

export interface OfferCode {
  id: string;
  name: string;
  amount_off: number;
  offer_type: "cents" | "percent";
  max_purchase_count: number | null;
  universal: boolean;
  times_used: number;
}

export interface CreateOfferCodeParams {
  name: string;
  amount_off: number;
  offer_type?: "cents" | "percent";
  max_purchase_count?: number;
  universal?: boolean;
}

export interface UpdateOfferCodeParams {
  max_purchase_count?: number;
}

export interface ListOfferCodesResponse extends GumroadApiResponse {
  offer_codes: OfferCode[];
}

export interface GetOfferCodeResponse extends GumroadApiResponse {
  offer_code: OfferCode;
}

export interface CreateOfferCodeResponse extends GumroadApiResponse {
  offer_code: OfferCode;
}

export interface UpdateOfferCodeResponse extends GumroadApiResponse {
  offer_code: OfferCode;
}

export interface DeleteOfferCodeResponse extends GumroadApiResponse {
  message: string;
}

// ============================================================
// Custom Fields
// ============================================================

export interface CustomField {
  name: string;
  required: boolean;
}

export interface CreateCustomFieldParams {
  name: string;
  required?: boolean;
}

export interface UpdateCustomFieldParams {
  required?: boolean;
}

export interface ListCustomFieldsResponse extends GumroadApiResponse {
  custom_fields: CustomField[];
}

export interface CreateCustomFieldResponse extends GumroadApiResponse {
  custom_field: CustomField;
}

export interface UpdateCustomFieldResponse extends GumroadApiResponse {
  custom_field: CustomField;
}

export interface DeleteCustomFieldResponse extends GumroadApiResponse {
  message: string;
}

// ============================================================
// Sales
// ============================================================

export interface Sale {
  id: string;
  email: string;
  seller_id: string;
  timestamp: string;
  daystamp: string;
  created_at: string;
  product_name: string;
  product_has_variants: boolean;
  price: number;
  gumroad_fee: number;
  formatted_display_price: string;
  formatted_total_price: string;
  currency_symbol: string;
  amount_refundable_in_currency: string;
  product_id: string;
  product_permalink: string;
  partially_refunded: boolean;
  chargedback: boolean;
  purchase_email: string;
  full_name: string;
  paid: boolean;
  has_custom_fields: boolean;
  custom_fields: Record<string, string>;
  order_id: number;
  is_product_physical: boolean;
  referrer: string;
  card: CardInfo;
  quantity: number;
  variants: string;
  offer_code: string | null;
  test: boolean;
  ip_country: string;
  recurrence: string | null;
  is_gift_sender_purchase: boolean;
  is_gift_receiver_purchase: boolean;
  refunded: boolean;
  disputed: boolean;
  dispute_won: boolean;
  subscription_id: string | null;
  license_key: string | null;
  shipping_information: ShippingInfo | null;
}

export interface CardInfo {
  visual: string | null;
  type: string | null;
  bin: string | null;
  expiry_month: number | null;
  expiry_year: number | null;
}

export interface ShippingInfo {
  full_name: string;
  street_address: string;
  city: string;
  state: string;
  zip_code: string;
  country: string;
}

export interface ListSalesParams {
  after?: string;
  before?: string;
  product_id?: string;
  email?: string;
  order_id?: number;
  page_key?: string;
}

export interface ListSalesResponse extends GumroadApiResponse {
  sales: Sale[];
  next_page_url: string | null;
  next_page_key: string | null;
}

export interface GetSaleResponse extends GumroadApiResponse {
  sale: Sale;
}

export interface MarkAsShippedParams {
  tracking_url?: string;
}

export interface MarkAsShippedResponse extends GumroadApiResponse {
  sale: Sale;
}

export interface RefundSaleResponse extends GumroadApiResponse {
  sale: Sale;
}

export interface ResendReceiptResponse extends GumroadApiResponse {
  message: string;
}

// ============================================================
// Subscribers
// ============================================================

export interface Subscriber {
  id: string;
  product_id: string;
  product_name: string;
  user_id: string;
  user_email: string;
  purchase_ids: string[];
  created_at: string;
  user_requested_cancellation_at: string | null;
  charge_occurrence_count: number | null;
  recurrence: string;
  cancelled_at: string | null;
  ended_at: string | null;
  failed_at: string | null;
  free_trial_ends_at: string | null;
  license_key: string;
  status: "alive" | "pending_cancellation" | "pending_failure" | "failed_payment" | "fixed_subscription_period_ended" | "cancelled";
}

export interface ListSubscribersParams {
  email?: string;
}

export interface ListSubscribersResponse extends GumroadApiResponse {
  subscribers: Subscriber[];
}

export interface GetSubscriberResponse extends GumroadApiResponse {
  subscriber: Subscriber;
}

// ============================================================
// Licenses
// ============================================================

export interface License {
  id: string;
  product_id: string;
  uses: number;
  license_key: string;
  purchase: LicensePurchase;
}

export interface LicensePurchase {
  seller_id: string;
  product_id: string;
  product_name: string;
  permalink: string;
  product_permalink: string;
  email: string;
  price: number;
  gumroad_fee: number;
  currency: string;
  quantity: number;
  discover_fee_charged: boolean;
  can_contact: boolean;
  referrer: string;
  card: CardInfo;
  order_number: number;
  sale_id: string;
  sale_timestamp: string;
  purchaser_id: string;
  subscription_id: string | null;
  variants: string;
  license_key: string;
  ip_country: string;
  recurrence: string | null;
  is_gift_receiver_purchase: boolean;
  refunded: boolean;
  disputed: boolean;
  dispute_won: boolean;
  id: string;
  created_at: string;
  custom_fields: Record<string, string>;
  chargedback: boolean;
  test: boolean;
}

export interface VerifyLicenseParams {
  product_id: string;
  license_key: string;
  increment_uses_count?: boolean;
}

export interface VerifyLicenseResponse extends GumroadApiResponse {
  uses: number;
  purchase: LicensePurchase;
}

export interface EnableLicenseParams {
  product_id: string;
  license_key: string;
}

export interface EnableLicenseResponse extends GumroadApiResponse {
  uses: number;
  purchase: LicensePurchase;
}

export interface DisableLicenseParams {
  product_id: string;
  license_key: string;
}

export interface DisableLicenseResponse extends GumroadApiResponse {
  uses: number;
  purchase: LicensePurchase;
}

export interface DecrementLicenseParams {
  product_id: string;
  license_key: string;
}

export interface DecrementLicenseResponse extends GumroadApiResponse {
  uses: number;
  purchase: LicensePurchase;
}

export interface RotateLicenseParams {
  product_id: string;
  license_key: string;
}

export interface RotateLicenseResponse extends GumroadApiResponse {
  uses: number;
  purchase: LicensePurchase;
}

// ============================================================
// Payouts
// ============================================================

export interface Payout {
  id: string;
  amount_cents: number;
  user_id: string;
  created_at: string;
  is_paid: boolean;
}

export interface ListPayoutsResponse extends GumroadApiResponse {
  payouts: Payout[];
}

export interface GetPayoutResponse extends GumroadApiResponse {
  payout: Payout;
}

// ============================================================
// Resource Subscriptions (Webhooks)
// ============================================================

export type ResourceSubscriptionType =
  | "sale"
  | "refund"
  | "dispute"
  | "dispute_won"
  | "cancellation"
  | "subscription_updated"
  | "subscription_ended"
  | "subscription_restarted";

export interface ResourceSubscription {
  id: string;
  resource_name: ResourceSubscriptionType;
  post_url: string;
}

export interface CreateResourceSubscriptionParams {
  resource_name: ResourceSubscriptionType;
  post_url: string;
}

export interface ListResourceSubscriptionsResponse extends GumroadApiResponse {
  resource_subscriptions: ResourceSubscription[];
}

export interface CreateResourceSubscriptionResponse extends GumroadApiResponse {
  resource_subscription: ResourceSubscription;
}

export interface DeleteResourceSubscriptionResponse extends GumroadApiResponse {
  message: string;
}

// ============================================================
// Webhook Payloads
// ============================================================

export interface WebhookSalePayload {
  seller_id: string;
  product_id: string;
  product_permalink: string;
  short_product_id: string;
  product_name: string;
  email: string;
  url_params: Record<string, string>;
  full_name: string;
  purchaser_id: string;
  subscription_id: string;
  ip_country: string;
  price: number;
  recurrence: string;
  variants: Record<string, string>;
  offer_code: string;
  test: boolean;
  custom_fields: Record<string, string>;
  shipping_information: ShippingInfo;
  is_recurring_charge: boolean;
  is_preorder_authorization: boolean;
  license_key: string;
  quantity: number;
  shipping_rate: number;
  affiliate: string;
  affiliate_external_id: string;
  order_number: number;
  sale_id: string;
  sale_timestamp: string;
  refunded: boolean;
  resource_name: string;
}

// ============================================================
// HTTP Client Types (internal)
// ============================================================

export type HttpMethod = "GET" | "POST" | "PUT" | "DELETE";

export interface RequestOptions {
  method: HttpMethod;
  path: string;
  params?: Record<string, unknown>;
  body?: Record<string, unknown>;
}
