import type {
  ListVariantCategoriesResponse,
  GetVariantCategoryResponse,
  CreateVariantCategoryParams,
  CreateVariantCategoryResponse,
  UpdateVariantCategoryResponse,
  DeleteVariantCategoryResponse,
  ListVariantsResponse,
  GetVariantResponse,
  CreateVariantParams,
  CreateVariantResponse,
  UpdateVariantParams,
  UpdateVariantResponse,
  DeleteVariantResponse,
} from "../types.js";
import type { RequestFn } from "../utils/fetch.js";

export class VariantCategoriesEndpoint {
  constructor(private readonly request: RequestFn) {}

  /** List all variant categories for a product */
  async list(productId: string): Promise<ListVariantCategoriesResponse> {
    return this.request<ListVariantCategoriesResponse>({
      method: "GET",
      path: `/products/${productId}/variant_categories`,
    });
  }

  /** Get a single variant category */
  async get(
    productId: string,
    variantCategoryId: string,
  ): Promise<GetVariantCategoryResponse> {
    return this.request<GetVariantCategoryResponse>({
      method: "GET",
      path: `/products/${productId}/variant_categories/${variantCategoryId}`,
    });
  }

  /** Create a new variant category for a product */
  async create(
    productId: string,
    params: CreateVariantCategoryParams,
  ): Promise<CreateVariantCategoryResponse> {
    return this.request<CreateVariantCategoryResponse>({
      method: "POST",
      path: `/products/${productId}/variant_categories`,
      body: params as unknown as Record<string, unknown>,
    });
  }

  /** Update a variant category */
  async update(
    productId: string,
    variantCategoryId: string,
    params: CreateVariantCategoryParams,
  ): Promise<UpdateVariantCategoryResponse> {
    return this.request<UpdateVariantCategoryResponse>({
      method: "PUT",
      path: `/products/${productId}/variant_categories/${variantCategoryId}`,
      body: params as unknown as Record<string, unknown>,
    });
  }

  /** Delete a variant category */
  async delete(
    productId: string,
    variantCategoryId: string,
  ): Promise<DeleteVariantCategoryResponse> {
    return this.request<DeleteVariantCategoryResponse>({
      method: "DELETE",
      path: `/products/${productId}/variant_categories/${variantCategoryId}`,
    });
  }

  // ---- Variants within a category ----

  /** List all variants within a variant category */
  async listVariants(
    productId: string,
    variantCategoryId: string,
  ): Promise<ListVariantsResponse> {
    return this.request<ListVariantsResponse>({
      method: "GET",
      path: `/products/${productId}/variant_categories/${variantCategoryId}/variants`,
    });
  }

  /** Get a single variant */
  async getVariant(
    productId: string,
    variantCategoryId: string,
    variantId: string,
  ): Promise<GetVariantResponse> {
    return this.request<GetVariantResponse>({
      method: "GET",
      path: `/products/${productId}/variant_categories/${variantCategoryId}/variants/${variantId}`,
    });
  }

  /** Create a new variant within a variant category */
  async createVariant(
    productId: string,
    variantCategoryId: string,
    params: CreateVariantParams,
  ): Promise<CreateVariantResponse> {
    return this.request<CreateVariantResponse>({
      method: "POST",
      path: `/products/${productId}/variant_categories/${variantCategoryId}/variants`,
      body: params as unknown as Record<string, unknown>,
    });
  }

  /** Update a variant */
  async updateVariant(
    productId: string,
    variantCategoryId: string,
    variantId: string,
    params: UpdateVariantParams,
  ): Promise<UpdateVariantResponse> {
    return this.request<UpdateVariantResponse>({
      method: "PUT",
      path: `/products/${productId}/variant_categories/${variantCategoryId}/variants/${variantId}`,
      body: params as unknown as Record<string, unknown>,
    });
  }

  /** Delete a variant */
  async deleteVariant(
    productId: string,
    variantCategoryId: string,
    variantId: string,
  ): Promise<DeleteVariantResponse> {
    return this.request<DeleteVariantResponse>({
      method: "DELETE",
      path: `/products/${productId}/variant_categories/${variantCategoryId}/variants/${variantId}`,
    });
  }
}
