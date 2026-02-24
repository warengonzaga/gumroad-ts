import type {
  ListPayoutsResponse,
  GetPayoutResponse,
} from "../types.js";
import type { RequestFn } from "../utils/fetch.js";

export class PayoutsEndpoint {
  constructor(private readonly request: RequestFn) {}

  /** List all payouts for the authenticated user */
  async list(): Promise<ListPayoutsResponse> {
    return this.request<ListPayoutsResponse>({
      method: "GET",
      path: "/payouts",
    });
  }

  /** Get a specific payout by ID */
  async get(payoutId: string): Promise<GetPayoutResponse> {
    return this.request<GetPayoutResponse>({
      method: "GET",
      path: `/payouts/${payoutId}`,
    });
  }
}
