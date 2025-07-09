import { notFound, onError, serveEmojiFavicon } from "stoker/middlewares";
import { pinoLogger } from "../middlewares/pino-logger";
import { requestId } from "hono/request-id";
import { OpenAPIHono } from "@hono/zod-openapi";
import type { AppBindings } from "./types";
import { defaultHook } from "stoker/openapi";

export function createRouter() {
  return new OpenAPIHono<AppBindings>({
    strict: false,
    defaultHook,
  });
}

export default function createApp() {
  const app = createRouter();
  app
    .use(requestId())
    .use(serveEmojiFavicon("💰"))
    .use(pinoLogger())

    .notFound(notFound)
    .onError(onError);
  return app;
}
