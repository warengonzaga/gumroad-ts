import type {
  ListSalesParams,
  ListSalesResponse,
  GetSaleResponse,
  MarkAsShippedParams,
  MarkAsShippedResponse,
} from "../types.js";
import type { RequestFn } from "../utils/fetch.js";

export class SalesEndpoint {
  constructor(private readonly request: RequestFn) {}

  /** List sales with optional filters */
  async list(params?: ListSalesParams): Promise<ListSalesResponse> {
    return this.request<ListSalesResponse>({
      method: "GET",
      path: "/sales",
      params: params as unknown as Record<string, unknown>,
    });
  }

  /** Get a single sale by ID */
  async get(saleId: string): Promise<GetSaleResponse> {
    return this.request<GetSaleResponse>({
      method: "GET",
      path: `/sales/${saleId}`,
    });
  }

  /** Mark a sale as shipped */
  async markAsShipped(
    saleId: string,
    params?: MarkAsShippedParams,
  ): Promise<MarkAsShippedResponse> {
    return this.request<MarkAsShippedResponse>({
      method: "PUT",
      path: `/sales/${saleId}/mark_as_shipped`,
      body: params as unknown as Record<string, unknown>,
    });
  }
}
