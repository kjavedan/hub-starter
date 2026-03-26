import { z } from "zod";

/**
 * Standardized error codes shared between frontend and backend.
 * Use these instead of magic strings so both sides stay in sync.
 */
export const ErrorCode = {
  // 400
  BAD_REQUEST: "BAD_REQUEST",
  VALIDATION_ERROR: "VALIDATION_ERROR",

  // 401 / 403
  UNAUTHORIZED: "UNAUTHORIZED",
  FORBIDDEN: "FORBIDDEN",

  // 404
  NOT_FOUND: "NOT_FOUND",

  // 409
  CONFLICT: "CONFLICT",

  // 429
  TOO_MANY_REQUESTS: "TOO_MANY_REQUESTS",

  // 500
  INTERNAL_ERROR: "INTERNAL_ERROR",
} as const;

export type ErrorCode = (typeof ErrorCode)[keyof typeof ErrorCode];

/**
 * Every API error response follows this shape.
 * Backend produces it, frontend consumes it.
 */
export const ErrorResponseSchema = z.object({
  code: z.string(),
  message: z.string(),
  details: z.unknown().optional(),
});

export type ErrorResponse = z.infer<typeof ErrorResponseSchema>;
