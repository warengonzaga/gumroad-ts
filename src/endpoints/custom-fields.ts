import type {
  ListCustomFieldsResponse,
  CreateCustomFieldParams,
  CreateCustomFieldResponse,
  UpdateCustomFieldParams,
  UpdateCustomFieldResponse,
  DeleteCustomFieldResponse,
} from "../types.js";
import type { RequestFn } from "../utils/fetch.js";

export class CustomFieldsEndpoint {
  constructor(private readonly request: RequestFn) {}

  /** List all custom fields for a product */
  async list(productId: string): Promise<ListCustomFieldsResponse> {
    return this.request<ListCustomFieldsResponse>({
      method: "GET",
      path: `/products/${productId}/custom_fields`,
    });
  }

  /** Create a new custom field for a product */
  async create(
    productId: string,
    params: CreateCustomFieldParams,
  ): Promise<CreateCustomFieldResponse> {
    return this.request<CreateCustomFieldResponse>({
      method: "POST",
      path: `/products/${productId}/custom_fields`,
      body: params as unknown as Record<string, unknown>,
    });
  }

  /** Update a custom field */
  async update(
    productId: string,
    fieldName: string,
    params: UpdateCustomFieldParams,
  ): Promise<UpdateCustomFieldResponse> {
    return this.request<UpdateCustomFieldResponse>({
      method: "PUT",
      path: `/products/${productId}/custom_fields/${encodeURIComponent(fieldName)}`,
      body: params as unknown as Record<string, unknown>,
    });
  }

  /** Delete a custom field */
  async delete(
    productId: string,
    fieldName: string,
  ): Promise<DeleteCustomFieldResponse> {
    return this.request<DeleteCustomFieldResponse>({
      method: "DELETE",
      path: `/products/${productId}/custom_fields/${encodeURIComponent(fieldName)}`,
    });
  }
}
