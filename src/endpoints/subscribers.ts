import type {
  ListSubscribersParams,
  ListSubscribersResponse,
  GetSubscriberResponse,
} from "../types.js";
import type { RequestFn } from "../utils/fetch.js";

export class SubscribersEndpoint {
  constructor(private readonly request: RequestFn) {}

  /** List subscribers for a product */
  async list(
    productId: string,
    params?: ListSubscribersParams,
  ): Promise<ListSubscribersResponse> {
    return this.request<ListSubscribersResponse>({
      method: "GET",
      path: `/products/${productId}/subscribers`,
      params: params as unknown as Record<string, unknown>,
    });
  }

  /** Get a single subscriber by ID */
  async get(subscriberId: string): Promise<GetSubscriberResponse> {
    return this.request<GetSubscriberResponse>({
      method: "GET",
      path: `/subscribers/${subscriberId}`,
    });
  }
}
