/** Base error class for all Gumroad SDK errors */
export class GumroadError extends Error {
  constructor(message: string) {
    super(message);
    this.name = "GumroadError";
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
  }
}

/** Error for invalid configuration or parameters */
export class GumroadValidationError extends GumroadError {
  constructor(message: string) {
    super(message);
    this.name = "GumroadValidationError";
  }
}

/** Error for network/connectivity issues */
export class GumroadNetworkError extends GumroadError {
  readonly cause?: Error;

  constructor(message: string, cause?: Error) {
    super(message);
    this.name = "GumroadNetworkError";
    this.cause = cause;
  }
}
