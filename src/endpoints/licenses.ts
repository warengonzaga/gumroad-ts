import type {
  VerifyLicenseParams,
  VerifyLicenseResponse,
  EnableLicenseParams,
  EnableLicenseResponse,
  DisableLicenseParams,
  DisableLicenseResponse,
  DecrementLicenseParams,
  DecrementLicenseResponse,
} from "../types.js";
import type { RequestFn } from "../utils/fetch.js";

export class LicensesEndpoint {
  constructor(private readonly request: RequestFn) {}

  /** Verify a license key */
  async verify(params: VerifyLicenseParams): Promise<VerifyLicenseResponse> {
    return this.request<VerifyLicenseResponse>({
      method: "POST",
      path: "/licenses/verify",
      body: params as unknown as Record<string, unknown>,
    });
  }

  /** Enable a previously disabled license key */
  async enable(params: EnableLicenseParams): Promise<EnableLicenseResponse> {
    return this.request<EnableLicenseResponse>({
      method: "PUT",
      path: "/licenses/enable",
      body: params as unknown as Record<string, unknown>,
    });
  }

  /** Disable a license key */
  async disable(params: DisableLicenseParams): Promise<DisableLicenseResponse> {
    return this.request<DisableLicenseResponse>({
      method: "PUT",
      path: "/licenses/disable",
      body: params as unknown as Record<string, unknown>,
    });
  }

  /** Decrement the uses count of a license key */
  async decrementUsesCount(
    params: DecrementLicenseParams,
  ): Promise<DecrementLicenseResponse> {
    return this.request<DecrementLicenseResponse>({
      method: "PUT",
      path: "/licenses/decrement_uses_count",
      body: params as unknown as Record<string, unknown>,
    });
  }
}
