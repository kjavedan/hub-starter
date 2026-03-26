import { z } from "zod";

import { initContract } from "@ts-rest/core";

const c = initContract();

export const apiContract = c.router({
  health: {
    method: "GET",
    path: "/health",
    responses: {
      200: z.object({ status: z.literal("ok") }),
    },
    summary: "Health check",
  },
  v1: {},
});

export * from "./error-schema";
