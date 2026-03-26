import compression from "compression";
import cors from "cors";
import express from "express";
import rateLimit from "express-rate-limit";
import helmet from "helmet";
import swaggerUi from "swagger-ui-express";

import { env } from "@hub-starter/config";
import { apiContract } from "@hub-starter/contracts";
import { createExpressEndpoints } from "@ts-rest/express";
import { generateOpenApi } from "@ts-rest/open-api";
import { s } from "@/core/ts-rest";
import { logger } from "@/middleware/logger";

const app = express();

// ---------------------------------------------------------------------------
// Security
// ---------------------------------------------------------------------------
app.use(helmet());
app.use(
  cors({
    origin: env.CORS_ORIGIN,
    credentials: true,
  }),
);

// ---------------------------------------------------------------------------
// Rate limiting — 100 requests per 15 minutes per IP
// ---------------------------------------------------------------------------
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  limit: 100,
  standardHeaders: "draft-7",
  legacyHeaders: false,
  message: { error: "Too many requests, please try again later." },
});
app.use(limiter);

// ---------------------------------------------------------------------------
// Body parsing & compression
// ---------------------------------------------------------------------------
app.use(express.json({ limit: "10kb" }));
app.use(compression());

// ---------------------------------------------------------------------------
// Logging
// ---------------------------------------------------------------------------
app.use(logger);

// ---------------------------------------------------------------------------
// API Documentation
// ---------------------------------------------------------------------------
const openApiDocument = generateOpenApi(apiContract, {
  info: {
    title: "Hub-Starter API",
    version: "1.0.0",
  },
});
app.use("/docs", swaggerUi.serve, swaggerUi.setup(openApiDocument));

// ---------------------------------------------------------------------------
// Routes
// ---------------------------------------------------------------------------
const router = s.router(apiContract, {
  health: async () => ({
    status: 200,
    body: { status: "ok" as const },
  }),
  v1: {},
});

createExpressEndpoints(apiContract, router, app);

export { app };
