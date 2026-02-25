import type {
  ResourceSubscriptionType,
  ListResourceSubscriptionsResponse,
  CreateResourceSubscriptionParams,
  CreateResourceSubscriptionResponse,
  DeleteResourceSubscriptionResponse,
} from "../types.js";
import type { RequestFn } from "../utils/fetch.js";

export class ResourceSubscriptionsEndpoint {
  constructor(private readonly request: RequestFn) {}

  /** List resource subscriptions filtered by resource name */
  async list(
    resourceName: ResourceSubscriptionType,
  ): Promise<ListResourceSubscriptionsResponse> {
    return this.request<ListResourceSubscriptionsResponse>({
      method: "GET",
      path: "/resource_subscriptions",
      params: { resource_name: resourceName },
    });
  }

  /** Create a new resource subscription (webhook) */
  async create(
    params: CreateResourceSubscriptionParams,
  ): Promise<CreateResourceSubscriptionResponse> {
    return this.request<CreateResourceSubscriptionResponse>({
      method: "PUT",
      path: "/resource_subscriptions",
      body: params as unknown as Record<string, unknown>,
    });
  }

  /** Delete a resource subscription */
  async delete(
    resourceSubscriptionId: string,
  ): Promise<DeleteResourceSubscriptionResponse> {
    return this.request<DeleteResourceSubscriptionResponse>({
      method: "DELETE",
      path: `/resource_subscriptions/${resourceSubscriptionId}`,
    });
  }
}
