import type {
  ListProductsResponse,
  GetProductResponse,
  CreateProductParams,
  CreateProductResponse,
  UpdateProductParams,
  UpdateProductResponse,
  DeleteProductResponse,
  ToggleProductResponse,
  EnableProductResponse,
  DisableProductResponse,
} from "../types.js";
import type { RequestFn } from "../utils/fetch.js";

export class ProductsEndpoint {
  constructor(private readonly request: RequestFn) {}

  /** List all products for the authenticated user */
  async list(): Promise<ListProductsResponse> {
    return this.request<ListProductsResponse>({
      method: "GET",
      path: "/products",
    });
  }

  /** Get a single product by ID */
  async get(productId: string): Promise<GetProductResponse> {
    return this.request<GetProductResponse>({
      method: "GET",
      path: `/products/${productId}`,
    });
  }

  /** Create a new product */
  async create(params: CreateProductParams): Promise<CreateProductResponse> {
    return this.request<CreateProductResponse>({
      method: "POST",
      path: "/products",
      body: params as unknown as Record<string, unknown>,
    });
  }

  /** Update an existing product */
  async update(
    productId: string,
    params: UpdateProductParams,
  ): Promise<UpdateProductResponse> {
    return this.request<UpdateProductResponse>({
      method: "PUT",
      path: `/products/${productId}`,
      body: params as unknown as Record<string, unknown>,
    });
  }

  /** Permanently delete a product */
  async delete(productId: string): Promise<DeleteProductResponse> {
    return this.request<DeleteProductResponse>({
      method: "DELETE",
      path: `/products/${productId}`,
    });
  }

  /** Enable or disable a product */
  async toggle(productId: string): Promise<ToggleProductResponse> {
    return this.request<ToggleProductResponse>({
      method: "PUT",
      path: `/products/${productId}/toggle`,
    });
  }

  /** Enable (publish) a product */
  async enable(productId: string): Promise<EnableProductResponse> {
    return this.request<EnableProductResponse>({
      method: "PUT",
      path: `/products/${productId}/enable`,
    });
  }

  /** Disable (unpublish) a product */
  async disable(productId: string): Promise<DisableProductResponse> {
    return this.request<DisableProductResponse>({
      method: "PUT",
      path: `/products/${productId}/disable`,
    });
  }
}
