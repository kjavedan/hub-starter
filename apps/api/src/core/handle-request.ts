import { ErrorCode } from "@hub-starter/contracts";

import { AppError } from "./errors";

/**
 * Wraps a ts-rest route handler with consistent error handling.
 *
 * - AppError  → returns the matching status code + structured error body
 * - Unknown   → returns 500 + generic error body, logs the original error
 *
 * Usage:
 *   getMenuItems: handleRequest(async () => {
 *     const items = await menuService.getMenuItems();
 *     return { status: 200, body: items };
 *   }),
 */
export function handleRequest<TArgs extends unknown[], TResult>(
  fn: (...args: TArgs) => Promise<TResult>,
) {
  return async (...args: TArgs) => {
    try {
      return await fn(...args);
    } catch (error) {
      if (error instanceof AppError) {
        return {
          status: error.statusCode,
          body: error.toResponse(),
        };
      }

      // Unexpected error — log it and return a safe 500
      console.error("Unhandled error:", error);
      return {
        status: 500 as const,
        body: {
          code: ErrorCode.INTERNAL_ERROR,
          message: "An unexpected error occurred",
        },
      };
    }
  };
}
