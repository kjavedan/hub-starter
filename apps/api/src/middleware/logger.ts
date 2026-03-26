import pinoHttp from "pino-http";

import { env } from "@hub-starter/config";

const isVerbose = ["debug", "trace"].includes(env.LOG_LEVEL);

/**
 * HTTP request logger middleware.
 *   Default (LOG_LEVEL=info):  clean one-liners  →  GET /menu 200
 *   Verbose (LOG_LEVEL=debug): full request/response details
 */
export const logger = pinoHttp({
  transport:
    env.NODE_ENV === "development"
      ? {
          target: "pino-pretty",
          options: {
            colorize: true,
            ...(isVerbose
              ? {}
              : { ignore: "pid,hostname,req,res,responseTime", messageFormat: "{msg}" }),
          },
        }
      : undefined,
  level: env.NODE_ENV === "test" ? "silent" : env.LOG_LEVEL,
  customSuccessMessage: (req, res) => {
    return `${req.method} ${req.url} ${res.statusCode}`;
  },
  customErrorMessage: (req, res) => {
    return `${req.method} ${req.url} ${res.statusCode}`;
  },
  ...(isVerbose
    ? {}
    : {
        serializers: {
          req: (req) => ({
            method: req.method,
            url: req.url,
          }),
          res: (res) => ({
            statusCode: res.statusCode,
          }),
        },
      }),
});
