import { createRouter } from "@/lib/create-app";
import { createRoute, z } from "@hono/zod-openapi";
import { jsonContent } from "stoker/openapi/helpers";
import { createMessageObjectSchema } from "stoker/openapi/schemas";
import * as HttpStatusCodes from "stoker/http-status-codes";
const router = createRouter();

router.openapi(
  createRoute({
    method: "get",
    tags: ["Index"],
    path: "/",
    responses: {
      [HttpStatusCodes.OK]: jsonContent(
        createMessageObjectSchema("Forge Trade API Reference"),
        "Forge Trade API Reference"
      ),
    },
  }),
  (c) => {
    return c.json(
      {
        message: "Forge Trade API Reference",
      },
      HttpStatusCodes.OK
    );
  }
);

export default router;
