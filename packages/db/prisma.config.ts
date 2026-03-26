import { env } from "@hub-starter/config";

import { defineConfig } from "prisma/config";

export default defineConfig({
  schema: "prisma/schema.prisma",
  datasource: {
    url: env.DIRECT_URL || env.DATABASE_URL,
  },
  migrations: {
    path: "prisma/migrations",
  },
});
