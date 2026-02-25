import type { GetUserResponse } from "../types.js";
import type { RequestFn } from "../utils/fetch.js";

export class UserEndpoint {
  constructor(private readonly request: RequestFn) {}

  /** Get the authenticated user's information */
  async get(): Promise<GetUserResponse> {
    return this.request<GetUserResponse>({
      method: "GET",
      path: "/user",
    });
  }
}
