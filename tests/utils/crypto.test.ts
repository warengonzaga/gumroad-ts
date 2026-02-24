import { describe, it, expect } from "bun:test";
import { verifyWebhookSignature } from "../../src/utils/crypto";

describe("verifyWebhookSignature", () => {
  it("should return true for a valid signature", async () => {
    const secret = "test-secret";
    const payload = '{"test": "data"}';

    // Compute the expected HMAC-SHA256 signature
    const encoder = new TextEncoder();
    const key = await crypto.subtle.importKey(
      "raw",
      encoder.encode(secret),
      { name: "HMAC", hash: "SHA-256" },
      false,
      ["sign"],
    );
    const sigBuffer = await crypto.subtle.sign(
      "HMAC",
      key,
      encoder.encode(payload),
    );
    const signature = Array.from(new Uint8Array(sigBuffer))
      .map((b) => b.toString(16).padStart(2, "0"))
      .join("");

    const isValid = await verifyWebhookSignature(payload, signature, secret);
    expect(isValid).toBe(true);
  });

  it("should return false for an invalid signature", async () => {
    const isValid = await verifyWebhookSignature(
      '{"test": "data"}',
      "invalid-signature-that-is-definitely-wrong-and-has-64-hex-chars00",
      "test-secret",
    );
    expect(isValid).toBe(false);
  });

  it("should return false for mismatched length signatures", async () => {
    const isValid = await verifyWebhookSignature(
      '{"test": "data"}',
      "short",
      "test-secret",
    );
    expect(isValid).toBe(false);
  });
});
