# gumroad-ts

[![created by](https://img.shields.io/badge/created%20by-Waren%20Gonzaga-blue.svg?longCache=true&style=flat-square)](https://github.com/warengonzaga) [![release](https://img.shields.io/github/release/warengonzaga/gumroad.js.svg?style=flat-square)](https://github.com/warengonzaga/gumroad.js/releases) [![star](https://img.shields.io/github/stars/warengonzaga/gumroad.js.svg?style=flat-square)](https://github.com/warengonzaga/gumroad.js/stargazers) [![license](https://img.shields.io/github/license/warengonzaga/gumroad.js.svg?style=flat-square)](https://github.com/warengonzaga/gumroad.js/blob/main/license)

A lightweight, TypeScript-first JavaScript SDK for the [Gumroad API v2](https://gumroad.com/api). Zero dependencies. Works with Bun, Node.js, and browsers.

## Features

- **TypeScript-first** - Full type definitions for all endpoints and responses
- **Zero dependencies** - Uses native `fetch` and `crypto.subtle` APIs
- **Bun-first** - Primary runtime target with full Node.js 16+ compatibility
- **Complete API coverage** - Products, Sales, Subscribers, Licenses, Offer Codes, Variant Categories, Custom Fields, Resource Subscriptions, Payouts
- **Webhook verification** - Built-in HMAC-SHA256 signature verification
- **Dual module support** - ESM and CommonJS builds

## Installation

```bash
# bun
bun add gumroad-ts

# npm
npm install gumroad-ts

# pnpm
pnpm add gumroad-ts

# yarn
yarn add gumroad-ts
```

## Quick Start

```typescript
import { GumroadClient } from "gumroad-ts";

const gumroad = new GumroadClient({
  token: "your-access-token",
});

// Get authenticated user
const { user } = await gumroad.user.get();
console.log(user.name);

// List all products
const { products } = await gumroad.products.list();
console.log(products);
```

## Configuration

### Access Token

You can provide the access token directly or via environment variable:

```typescript
// Direct token
const gumroad = new GumroadClient({ token: "your-access-token" });

// From environment variable (GUMROAD_ACCESS_TOKEN)
const gumroad = new GumroadClient({ token: process.env.GUMROAD_ACCESS_TOKEN! });
```

### Custom Base URL

```typescript
const gumroad = new GumroadClient({
  token: "your-access-token",
  baseUrl: "https://custom-api.example.com/v2",
});
```

## API Reference

### Products

```typescript
// List all products
const { products } = await gumroad.products.list();

// Get a single product
const { product } = await gumroad.products.get("product-id");

// Create a product
const { product } = await gumroad.products.create({
  name: "My Product",
  price: 1000, // in cents
});

// Update a product
const { product } = await gumroad.products.update("product-id", {
  name: "Updated Name",
  price: 2000,
});

// Delete a product
await gumroad.products.delete("product-id");

// Toggle product (enable/disable)
await gumroad.products.toggle("product-id");

// Enable (publish) a product
await gumroad.products.enable("product-id");

// Disable (unpublish) a product
await gumroad.products.disable("product-id");
```

### Sales

```typescript
// List sales with optional filters
const { sales } = await gumroad.sales.list({
  after: "2024-01-01",
  before: "2024-12-31",
  product_id: "product-id",
  email: "buyer@example.com",
});

// Get a single sale
const { sale } = await gumroad.sales.get("sale-id");

// Mark as shipped
await gumroad.sales.markAsShipped("sale-id", {
  tracking_url: "https://tracking.example.com/123",
});

// Refund a sale
await gumroad.sales.refund("sale-id");

// Resend purchase receipt
await gumroad.sales.resendReceipt("sale-id");
```

### Subscribers

```typescript
// List subscribers for a product
const { subscribers } = await gumroad.subscribers.list("product-id");

// Filter by email
const { subscribers } = await gumroad.subscribers.list("product-id", {
  email: "subscriber@example.com",
});

// Get a single subscriber
const { subscriber } = await gumroad.subscribers.get("subscriber-id");
```

### Licenses

```typescript
// Verify a license key
const result = await gumroad.licenses.verify({
  product_id: "product-id",
  license_key: "LICENSE-KEY-123",
  increment_uses_count: true,
});

// Enable a license
await gumroad.licenses.enable({
  product_id: "product-id",
  license_key: "LICENSE-KEY-123",
});

// Disable a license
await gumroad.licenses.disable({
  product_id: "product-id",
  license_key: "LICENSE-KEY-123",
});

// Decrement uses count
await gumroad.licenses.decrementUsesCount({
  product_id: "product-id",
  license_key: "LICENSE-KEY-123",
});

// Rotate (regenerate) a license key
await gumroad.licenses.rotate({
  product_id: "product-id",
  license_key: "LICENSE-KEY-123",
});
```

### Offer Codes

```typescript
// List offer codes for a product
const { offer_codes } = await gumroad.offerCodes.list("product-id");

// Get a single offer code
const { offer_code } = await gumroad.offerCodes.get("product-id", "offer-id");

// Create an offer code
const { offer_code } = await gumroad.offerCodes.create("product-id", {
  name: "SAVE20",
  amount_off: 20,
  offer_type: "percent",
  max_purchase_count: 100,
});

// Update an offer code
await gumroad.offerCodes.update("product-id", "offer-id", {
  max_purchase_count: 200,
});

// Delete an offer code
await gumroad.offerCodes.delete("product-id", "offer-id");
```

### Variant Categories & Variants

```typescript
// List variant categories
const { variant_categories } = await gumroad.variantCategories.list("product-id");

// Create a variant category
const { variant_category } = await gumroad.variantCategories.create("product-id", {
  title: "Size",
});

// Update a variant category
await gumroad.variantCategories.update("product-id", "category-id", {
  title: "Updated Size",
});

// Delete a variant category
await gumroad.variantCategories.delete("product-id", "category-id");

// List variants in a category
const { variants } = await gumroad.variantCategories.listVariants("product-id", "category-id");

// Get a single variant
const { variant } = await gumroad.variantCategories.getVariant("product-id", "category-id", "variant-id");

// Create a variant
await gumroad.variantCategories.createVariant("product-id", "category-id", {
  name: "Large",
  price_difference_cents: 500,
  max_purchase_count: 50,
});

// Update a variant
await gumroad.variantCategories.updateVariant("product-id", "category-id", "variant-id", {
  name: "Extra Large",
});

// Delete a variant
await gumroad.variantCategories.deleteVariant("product-id", "category-id", "variant-id");
```

### Custom Fields

```typescript
// List custom fields
const { custom_fields } = await gumroad.customFields.list("product-id");

// Create a custom field
await gumroad.customFields.create("product-id", {
  name: "Company",
  required: true,
});

// Update a custom field
await gumroad.customFields.update("product-id", "Company", {
  required: false,
});

// Delete a custom field
await gumroad.customFields.delete("product-id", "Company");
```

### Payouts

```typescript
// List all payouts
const { payouts } = await gumroad.payouts.list();

// Get a specific payout
const { payout } = await gumroad.payouts.get("payout-id");
```

### Resource Subscriptions (Webhooks)

```typescript
// List resource subscriptions
const { resource_subscriptions } = await gumroad.resourceSubscriptions.list("sale");

// Create a resource subscription
await gumroad.resourceSubscriptions.create({
  resource_name: "sale",
  post_url: "https://your-server.com/webhooks/gumroad",
});

// Delete a resource subscription
await gumroad.resourceSubscriptions.delete("subscription-id");
```

Available resource types: `sale`, `refund`, `dispute`, `dispute_won`, `cancellation`, `subscription_updated`, `subscription_ended`, `subscription_restarted`.

### Webhook Signature Verification

```typescript
// Verify webhook signature
const isValid = await gumroad.verifyWebhookSignature(
  rawPayload,    // raw request body string
  signature,     // signature from request header
  webhookSecret, // your webhook secret
);

if (isValid) {
  // Process the webhook
}
```

## Error Handling

The SDK provides typed error classes for different failure modes:

```typescript
import {
  GumroadApiError,
  GumroadValidationError,
  GumroadNetworkError,
} from "gumroad-ts";

try {
  await gumroad.products.get("invalid-id");
} catch (error) {
  if (error instanceof GumroadApiError) {
    console.error(`API Error: ${error.message} (${error.statusCode})`);
    console.error("Response:", error.response);
  } else if (error instanceof GumroadNetworkError) {
    console.error("Network error:", error.message);
  } else if (error instanceof GumroadValidationError) {
    console.error("Validation error:", error.message);
  }
}
```

## Runtime Support

| Runtime | Version | Status |
|---------|---------|--------|
| Bun | 1.0+ | Primary target |
| Node.js | 16+ | Fully supported |
| Browsers | Modern | Supported (with bundler) |

## Contributing

Contributions are welcome, create a pull request to this repo and I will review your code. Please consider to submit your pull request to the `dev` branch. Thank you!

Read the project's [contributing guide](./CONTRIBUTING.md) for more info.

## Discussions

For any questions, suggestions, ideas, or simply you want to share your experience in using this project, feel free to share and discuss it to the [community](https://github.com/warengonzaga/gumroad.js/discussions)!

## Issues

Please report any issues and bugs by [creating a new issue here](https://github.com/warengonzaga/gumroad.js/issues/new/choose), also make sure you're reporting an issue that doesn't exist. Any help to improve the project would be appreciated. Thanks!

## Code of Conduct

Read the project's [code of conduct](./CODE_OF_CONDUCT.md).

## License

gumroad-ts is licensed under [The MIT License](https://opensource.org/licenses/MIT).

## Author

gumroad-ts is created by **[Waren Gonzaga](https://github.com/warengonzaga)**, with the help of awesome [contributors](https://github.com/warengonzaga/gumroad.js/graphs/contributors).

---

by [Waren Gonzaga](https://warengonzaga.com) | [YHWH](https://youtu.be/9vh6Dz9oh8I?t=85)
