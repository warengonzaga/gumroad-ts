/** Base error class for all Gumroad SDK errors */
export class GumroadError extends Error {
  constructor(message: string) {
    super(message);
    this.name = "GumroadError";
    Object.setPrototypeOf(this, GumroadError.prototype);
  }
}

/** Error returned by the Gumroad API */
export class GumroadApiError extends GumroadError {
  readonly statusCode: number;
  readonly response: unknown;

  constructor(message: string, statusCode: number, response?: unknown) {
    super(message);
    this.name = "GumroadApiError";
    this.statusCode = statusCode;
    this.response = response;
    Object.setPrototypeOf(this, GumroadApiError.prototype);
  }
}

/** Error for invalid configuration or parameters */
export class GumroadValidationError extends GumroadError {
  constructor(message: string) {
    super(message);
    this.name = "GumroadValidationError";
    Object.setPrototypeOf(this, GumroadValidationError.prototype);
  }
}

/** Error for network/connectivity issues */
export class GumroadNetworkError extends GumroadError {
  readonly cause?: Error;

  constructor(message: string, cause?: Error) {
    super(message);
    this.name = "GumroadNetworkError";
    this.cause = cause;
    Object.setPrototypeOf(this, GumroadNetworkError.prototype);
  }
}
