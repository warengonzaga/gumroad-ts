import type {
  ListOfferCodesResponse,
  GetOfferCodeResponse,
  CreateOfferCodeParams,
  CreateOfferCodeResponse,
  UpdateOfferCodeParams,
  UpdateOfferCodeResponse,
  DeleteOfferCodeResponse,
} from "../types.js";
import type { RequestFn } from "../utils/fetch.js";

export class OfferCodesEndpoint {
  constructor(private readonly request: RequestFn) {}

  /** List all offer codes for a product */
  async list(productId: string): Promise<ListOfferCodesResponse> {
    return this.request<ListOfferCodesResponse>({
      method: "GET",
      path: `/products/${productId}/offer_codes`,
    });
  }

  /** Get a single offer code */
  async get(
    productId: string,
    offerCodeId: string,
  ): Promise<GetOfferCodeResponse> {
    return this.request<GetOfferCodeResponse>({
      method: "GET",
      path: `/products/${productId}/offer_codes/${offerCodeId}`,
    });
  }

  /** Create a new offer code for a product */
  async create(
    productId: string,
    params: CreateOfferCodeParams,
  ): Promise<CreateOfferCodeResponse> {
    return this.request<CreateOfferCodeResponse>({
      method: "POST",
      path: `/products/${productId}/offer_codes`,
      body: params as unknown as Record<string, unknown>,
    });
  }

  /** Update an offer code */
  async update(
    productId: string,
    offerCodeId: string,
    params: UpdateOfferCodeParams,
  ): Promise<UpdateOfferCodeResponse> {
    return this.request<UpdateOfferCodeResponse>({
      method: "PUT",
      path: `/products/${productId}/offer_codes/${offerCodeId}`,
      body: params as unknown as Record<string, unknown>,
    });
  }

  /** Delete an offer code */
  async delete(
    productId: string,
    offerCodeId: string,
  ): Promise<DeleteOfferCodeResponse> {
    return this.request<DeleteOfferCodeResponse>({
      method: "DELETE",
      path: `/products/${productId}/offer_codes/${offerCodeId}`,
    });
  }
}
