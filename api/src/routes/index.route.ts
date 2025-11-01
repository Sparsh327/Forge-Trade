import { createRouter } from "@/lib/create-app";
import { createRoute, z } from "@hono/zod-openapi";
import { jsonContent } from "stoker/openapi/helpers";
import { createMessageObjectSchema } from "stoker/openapi/schemas";
import * as HttpStatusCodes from "stoker/http-status-codes";
import { RedisManager } from "@/RedisManager"; // adjust path if needed
import { CREATE_ORDER } from "@/types";
import { MessageFromOrderbook } from "@/types/index";

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
// ───────────────────────────────
// POST /redis-test → Redis connection + engine test
// ───────────────────────────────
router.openapi(
  createRoute({
    method: "post",
    tags: ["Redis"],
    path: "/redis-test",
    request: {
      body: jsonContent(
        z.object({
          type: z.literal(CREATE_ORDER),
          data: z.object({
            market: z.string(),
            price: z.string(),
            quantity: z.string(),
            side: z.enum(["buy", "sell"]),
            userId: z.string(),
          }),
        }),
        "Message to send to engine"
      ),
    },

    responses: {
      [HttpStatusCodes.OK]: jsonContent(
        z.object({
          status: z.string(),
          response: z.any(),
        }),
        "Engine response via Redis"
      ),
      [HttpStatusCodes.INTERNAL_SERVER_ERROR]: jsonContent(
        z.object({
          error: z.string(),
        }),
        "Redis or Engine Error"
      ),
    },
  }),
  async (c) => {
    try {
      // Parse incoming request body
      const body = await c.req.json();
      console.log("Received /redis-test request:", body);

      const { market, price, quantity, side, userId } = body.data;
      console.log({ market, price, quantity, side, userId });
      // Get RedisManager singleton instance
      const redis = RedisManager.getInstance();

      // Send message to engine and wait for response
      const response = await redis.sendAndAwait({
        type: CREATE_ORDER,
        data: {
          market,
          price,
          quantity,
          side,
          userId,
        },
      });

      console.log("Redis response:", response);

      // Return engine's response
      return c.json({ status: "success", response }, HttpStatusCodes.OK);
    } catch (error: any) {
      console.error("Redis test error:", error);
      return c.json(
        { error: error.message || "Failed to communicate with engine" },
        HttpStatusCodes.INTERNAL_SERVER_ERROR
      );
    }
  }
);

export default router;
