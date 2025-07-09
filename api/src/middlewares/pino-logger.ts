import { pinoLogger as logger } from "hono-pino";
import pino from "pino";
import env from "../env";
import pretty from "pino-pretty";

export function pinoLogger() {
  return logger({
    pino: pino(
      {
        name: "forge-trade-api",
        level: "debug",
      },
      env.NODE_ENV === "production"
        ? undefined
        : pretty({
            colorize: true,
            ignore: "pid,hostname",
          })
    ),
  });
}
