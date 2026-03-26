import path from "node:path";

import dotenv from "dotenv";
import { z } from "zod";

const root = path.resolve(process.cwd(), "../../");

// Load .env files in increasing order of priority:
// 1. Default .env (lowest)
dotenv.config({ path: path.resolve(root, ".env") });

// 2. Environment-specific .env (e.g., .env.production)
const nodeEnv = process.env.NODE_ENV || "development";
dotenv.config({
  path: path.resolve(root, `.env.${nodeEnv}`),
  override: true,
});

// 3. Local overrides .env.local (highest)
dotenv.config({
  path: path.resolve(root, ".env.local"),
  override: true,
});

// 4. Also load from local package root .env if it exists
dotenv.config({ override: true });

/**
 * Server-only environment variables.
 * These are NEVER exposed to the browser.
 */
const serverSchema = z.object({
  DATABASE_URL: z.string().url(),
  DIRECT_URL: z.string().url(),
  PORT: z.coerce.number().default(3001),
  NODE_ENV: z.enum(["development", "test", "production"]).default("development"),
  CORS_ORIGIN: z.string().default("http://localhost:3000"),
  LOG_LEVEL: z.enum(["fatal", "error", "warn", "info", "debug", "trace", "silent"]).default("info"),
});

/**
 * Client-safe environment variables.
 * These must be prefixed with NEXT_PUBLIC_ for Next.js to expose them.
 */
const clientSchema = z.object({
  NEXT_PUBLIC_API_URL: z.string().url().default("http://localhost:3001"),
});

/**
 * Validates the correct environment variables based on the current context.
 */
const isServer = typeof (globalThis as unknown as { window?: object }).window === "undefined";

const _env = isServer
  ? serverSchema.merge(clientSchema).safeParse(process.env)
  : clientSchema.safeParse({
      NEXT_PUBLIC_API_URL: process.env.NEXT_PUBLIC_API_URL,
    });

let validatedEnv: z.infer<typeof serverSchema> & z.infer<typeof clientSchema>;

if (!_env.success) {
  if (process.env.SKIP_ENV_VALIDATION === "true") {
    console.warn("⚠️  Skipping environment validation during build.");
    // We cast to the full type to satisfy TypeScript, knowing it's only for build-time
    validatedEnv = (_env.data || {}) as unknown as z.infer<typeof serverSchema> &
      z.infer<typeof clientSchema>;
  } else {
    console.error("❌ Invalid environment variables:", _env.error.format());
    throw new Error("Invalid environment variables. Check your .env file.");
  }
} else {
  validatedEnv = _env.data as z.infer<typeof serverSchema> & z.infer<typeof clientSchema>;
}

export const env = validatedEnv;
