import type {
  ListSalesParams,
  ListSalesResponse,
  GetSaleResponse,
  MarkAsShippedParams,
  MarkAsShippedResponse,
  RefundSaleResponse,
  ResendReceiptResponse,
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

  /** Refund a sale */
  async refund(saleId: string): Promise<RefundSaleResponse> {
    return this.request<RefundSaleResponse>({
      method: "PUT",
      path: `/sales/${saleId}/refund`,
    });
  }

  /** Resend purchase receipt for a sale */
  async resendReceipt(saleId: string): Promise<ResendReceiptResponse> {
    return this.request<ResendReceiptResponse>({
      method: "POST",
      path: `/sales/${saleId}/resend_receipt`,
    });
  }
}
