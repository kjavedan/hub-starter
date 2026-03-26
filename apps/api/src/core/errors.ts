import type { ErrorCode, ErrorResponse } from "@hub-starter/contracts";

/** HTTP status codes that ts-rest recognises in contract responses. */
export type HttpStatusCode = 400 | 401 | 403 | 404 | 405 | 409 | 422 | 429 | 500 | 502 | 503;

/**
 * Typed application error.
 * Throw this anywhere in service/router code — the handleRequest
 * wrapper catches it and returns a consistent JSON response.
 */
export class AppError extends Error {
  constructor(
    public readonly statusCode: HttpStatusCode,
    public readonly code: ErrorCode,
    message: string,
    public readonly details?: unknown,
  ) {
    super(message);
    this.name = "AppError";
  }

  toResponse(): ErrorResponse {
    return {
      code: this.code,
      message: this.message,
      ...(this.details !== undefined && { details: this.details }),
    };
  }
}
