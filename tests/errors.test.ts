import { describe, it, expect } from "bun:test";
import {
  GumroadError,
  GumroadApiError,
  GumroadValidationError,
  GumroadNetworkError,
} from "../src/errors";

describe("Error classes", () => {
  it("GumroadError should have correct name and message", () => {
    const error = new GumroadError("test error");
    expect(error.name).toBe("GumroadError");
    expect(error.message).toBe("test error");
    expect(error).toBeInstanceOf(Error);
    expect(error).toBeInstanceOf(GumroadError);
  });

  it("GumroadApiError should include status code and response", () => {
    const response = { success: false, message: "Not found" };
    const error = new GumroadApiError("Not found", 404, response);
    expect(error.name).toBe("GumroadApiError");
    expect(error.statusCode).toBe(404);
    expect(error.response).toEqual(response);
    expect(error).toBeInstanceOf(GumroadError);
    expect(error).toBeInstanceOf(GumroadApiError);
  });

  it("GumroadValidationError should extend GumroadError", () => {
    const error = new GumroadValidationError("Invalid token");
    expect(error.name).toBe("GumroadValidationError");
    expect(error.message).toBe("Invalid token");
    expect(error).toBeInstanceOf(GumroadError);
  });

  it("GumroadNetworkError should include cause", () => {
    const cause = new TypeError("Failed to fetch");
    const error = new GumroadNetworkError("Network error", cause);
    expect(error.name).toBe("GumroadNetworkError");
    expect(error.cause).toBe(cause);
    expect(error).toBeInstanceOf(GumroadError);
  });

  it("GumroadNetworkError should work without cause", () => {
    const error = new GumroadNetworkError("Network error");
    expect(error.cause).toBeUndefined();
  });
});
